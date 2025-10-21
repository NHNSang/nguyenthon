import { AboutType, ComponentForHomepage, DetailPageType, LastestPosts, PostsData, ProjectCategories, Projects, SingleProject, SingleServiceType } from "@/types/typeForWordpressData";


const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "";

// code mới
export async function FetchAPI(query = "", { variables }: Record<string, any> = {}) {
  // Kiểm tra API_URL trước khi sử dụng
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_WORDPRESS_API_URL is not defined in environment variables");
  }

  const headers: { "Content-Type": string;[key: string]: string } = {
    "Content-Type": "application/json",
  };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  const fetchWithRetry = async (retries = 3): Promise<any> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 50000); // 50s timeout

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify({ query, variables }),
        next: { revalidate: 120 },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status} ${res.statusText}`);
      }

      const json = await res.json();

      if (json.errors) {
        throw new Error("GraphQL error");
      }

      return json.data;
    } catch (error: any) {
      clearTimeout(timeoutId);

      // 👉 Nếu bị timeout hoặc network error thì retry
      if (retries > 0 && (error.name === "AbortError" || error.code === "ETIMEDOUT" || error.message.includes("fetch failed"))) {
        await new Promise((r) => setTimeout(r, 2000)); // chờ 2s trước khi thử lại
        return fetchWithRetry(retries - 1);
      }

      throw error;
    }
  };

  return fetchWithRetry();
}


// *****Lấy tất cả bài viết*****
// 1) giới hạn 20 bài viết
// export async function getAllProjects(): Promise<Projects> {
//   const data = await FetchAPI(`
// query projects {
//   projects (first: 20,) {
//     nodes {
//       id
//       title
//       slug
//       uri
//       excerpt
//       date
//       featuredImage {
//         node {
//           sourceUrl
//         }
//       }
//       projectFields {
//         completedYear
//         floor
//         location
//         projectCategory
//         sizeOfProject
//       }
//     }
//   }
// }`)

//   return data;
// }
// 2)Tự động load tất cả bài viết (50, 100, 1000...)
// export async function getAllProjects(): Promise<Projects> {
//   let allNodes: Projects["projects"]["nodes"] = [];
//   let hasNextPage = true;
//   let after: string | null = null;

//   while (hasNextPage) {
//     const query = `
//       query projects($after: String) {
//         projects(first: 20, after: $after) {
//           pageInfo {
//             hasNextPage
//             endCursor
//           }
//           nodes {
//             id
//             title
//             slug
//             uri
//             excerpt
//             date
//             featuredImage {
//               node {
//                 sourceUrl
//               }
//             }
//             projectFields {
//               completedYear
//               floor
//               location
//               projectCategory
//               sizeOfProject
//             }
//           }
//         }
//       }
//     `;

//     // 🔹 FetchAPI của bạn có thể đã nhận (query, variables)
//     const response = await FetchAPI(query, { variables: { after } });
//     const { nodes, pageInfo } = response.projects;

//     allNodes = [...allNodes, ...nodes];
//     hasNextPage = pageInfo.hasNextPage;
//     after = pageInfo.endCursor;
//   }

//   // 🔸 Giữ nguyên kiểu return cũ
//   const data: Projects = {
//     projects: {
//       nodes: allNodes,
//     },
//   };

//   return data;
// }
// 3)Hàm lấy tất cả Project an toàn, tránh lỗi build trên Vercel
export async function getAllProjects(): Promise<Projects> {
  let allNodes: Projects["projects"]["nodes"] = [];
  let hasNextPage = true;
  let after: string | null = null;
  let loopCount = 0; // 🔹 Giới hạn số vòng lặp để tránh lỗi vô hạn

  try {
    while (hasNextPage && loopCount < 50) { // tránh lặp vô hạn
      const query = `
        query projects($after: String) {
          projects(first: 20, after: $after) {
            pageInfo {
              hasNextPage
              endCursor
            }
            nodes {
              id
              title
              slug
              uri
              excerpt
              date
              featuredImage {
                node {
                  sourceUrl
                }
              }
              projectFields {
                completedYear
                floor
                location
                projectCategory
                sizeOfProject
              }
            }
          }
        }
      `;

      const response = await FetchAPI(query, { variables: { after } });

      // 🔸 Kiểm tra dữ liệu trả về có hợp lệ không
      if (!response || !response.projects) {
        break;
      }

      const { nodes = [], pageInfo = {} } = response.projects;

      allNodes = [...allNodes, ...nodes];
      hasNextPage = !!pageInfo.hasNextPage;
      after = pageInfo.endCursor || null;
      loopCount++;
    }
  } catch (error) {
    // Xử lý lỗi im lặng để tránh crash
  }

  // 🔹 Đảm bảo luôn return đúng kiểu dữ liệu, tránh crash khi build
  return {
    projects: {
      nodes: allNodes || [],
    },
  };
}


// Lấy chi tiết 1 bài viết
// 1
// export async function getSingleProject(uri: string): Promise<SingleProject> {
//   // Decode URI if encoded and clean up formatting
//   let cleanUri = uri;
//   try {
//     // Handle encoded URI formats
//     if (cleanUri.includes('%2F')) {
//       cleanUri = decodeURIComponent(cleanUri);
//     }

//     // Ensure the URI has proper format for WordPress API
//     if (!cleanUri.startsWith('/')) {
//       cleanUri = '/' + cleanUri;
//     }
//     if (!cleanUri.endsWith('/')) {
//       cleanUri = cleanUri + '/';
//     }

//     console.log('Formatted URI for API request:', cleanUri);
//   } catch (error) {
//     console.error('Error processing URI:', error);
//   }

//   const data = await FetchAPI(`
//   query singleProject($id: ID = "new-espace-citoyen-des-confluents-transforms-former-industrial-site-into-sustainable-urban-renewal-model", $idType: ProjectIdType = URI) {
//   project(id: $id, idType: $idType) {
//   id  
//   title
//     excerpt
//     date
//     content
//     slug
//     uri
//     featuredImage {
//       node {
//         sourceUrl
//         altText
//       }
//     }
//     author {
//       node {
//         name
//         avatar {
//           url
//         }
//       }
//     }
//     projectFields {
//       completedYear
//       floor
//       location
//       projectCategory
//       sizeOfProject
//       bedroom
//       budget
//     }
//   }
// }
//     `, {
//     variables: {
//       id: cleanUri
//     }
//   })

//   return data;
// }
// 2
export async function getSingleProject(uri: string): Promise<SingleProject> {
  let cleanUri = uri;

  try {
    if (cleanUri.includes("%2F")) cleanUri = decodeURIComponent(cleanUri);
    if (!cleanUri.startsWith("/")) cleanUri = "/" + cleanUri;
    if (!cleanUri.endsWith("/")) cleanUri += "/";
  } catch (error) {
    // Xử lý lỗi decode URI
  }

  const query = `
    query singleProject($id: ID!, $idType: ProjectIdType!) {
      project(id: $id, idType: $idType) {
        id
        title
        excerpt
        date
        content
        slug
        uri
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        author {
          node {
            name
            avatar {
              url
            }
          }
        }
        projectFields {
          completedYear
          floor
          location
          projectCategory
          sizeOfProject
          bedroom
          budget
        }
      }
    }
  `;

  try {
    const data = await FetchAPI(query, {
      variables: {
        id: cleanUri,
        idType: "URI",
      },
    });

    if (!data?.project) {
      throw new Error(`Post not found for URI: ${cleanUri}`);
    }

    return data;
  } catch (error) {
    return {
      project: null,
    } as unknown as SingleProject;
  }
}



export async function getProjectCategories(): Promise<ProjectCategories> {
  const data = await FetchAPI(`
    query projectCategories {
  projectCategories {
    nodes {
      name
      slug
      }
    }
  }
    `)

  return data;
}

export async function getAllPosts(first: number, after: string): Promise<PostsData> {
  const data = await FetchAPI(`
    query AllPosts($after: String = "", $first: Int = 1) {
  posts(first: $first, after: $after) {
    edges {
      node {
        title
        excerpt
        slug
        date
        uri
        featuredImage {
          node {
            sourceUrl
            altText
            title
          }
        }
        author {
          node {
            name
            firstName
            lastName
            avatar {
              url
            }
            description
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        tags {
          nodes {
            name
            slug
          }
        }
        content
      }
    }
    pageInfo {
      offsetPagination {
        total
        hasMore
        hasPrevious
      }
      startCursor
      endCursor
    }
  }
}
  `
    , {
      // cache: 'only-if-cached',
      next: { revalidate: 10 }, // Tải lại dữ liệu sau 60 giây
      variables: {
        first,
        after,
      }
    },
  );
  return data;
};
export async function getPostsForBlogHub(amountOfPostPerPage: number, currentPage: number): Promise<PostsData> {
  // const offset = parseInt(String(currentPage))*amountOfPostPerPage - amountOfPostPerPage
  //  amountOfPostPerPage = 3
  //  currentPage =1
  const offset = amountOfPostPerPage * (parseFloat(String(currentPage)) - 1)
  const data = await FetchAPI(`
   query PostsForBlogHub {
  posts(where: {offsetPagination: {offset: ${offset}, size: ${amountOfPostPerPage + 1}}}) {
    edges {
      node {
        title
        excerpt
        slug
        date
        uri
        featuredImage {
          node {
            sourceUrl
            altText
            title
          }
        }
        author {
          node {
            name
            firstName
            lastName
            avatar {
              url
            }
            description
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        tags {
          nodes {
            name
            slug
          }
        }
        content
      }
    }
    pageInfo {
      offsetPagination {
        total
        hasMore
        hasPrevious
      }
      startCursor
      endCursor
    }
  }
}`)

  return data;
}



export async function getLastestPosts(first: number): Promise<LastestPosts> {
  const data = await FetchAPI(`
    query lastestPosts {
    posts(first:${first}) {
      edges {
          node {
            title
            excerpt
            slug
            date
            uri
            featuredImage {
              node {
                sourceUrl
                altText
                title
              }
            }
          }
        }
      }
  }
    `)
  return data;
}


export type SinglePostData = {
  post: {
    content: string;
    title: string;
    date: string;
    slug: string;
    featuredImage: {
      node: {
        sourceUrl: string;
      };
    };
    author: {
      node: {
        name: string;
        avatar: {
          url: string;
        };
      };
    };
    categories: {
      nodes: {
        name: string;
        link: string;
      }[];
    };
    excerpt: string;
    tags: {
      nodes: {
        name: string;
        link?: string; // Optional since it's empty in your example
      }[];
    };
  };
};
export type SinglePost = SinglePostData['post'];



export async function getSinglePost(slug: string): Promise<SinglePostData> {
  const data = await FetchAPI(`
  query SinglePost($id: ID = "", $idType: PostIdType = SLUG) {
    post(id: $id, idType: $idType) {
      content
      title
      date
      slug
      featuredImage{
      node{
        sourceUrl
      }
      }
      author {
        node {
          name
          avatar {
            url
          }
        }
      }
      categories {
        nodes {
          name
          link
        }
      }
      excerpt
      tags {
        nodes {
          name
          link
        }
      }
    }
  }
    `, {
    variables: {
      id: slug
    }
  })
  return data;
}


type ServiceData = {
  services: {
    edges: {
      node: {
        slug: string;
        title: string;
        excerpt: string;
        featuredImage: {
          node: {
            sourceUrl: string;
          }
        };
        serviceFields: {
          descriptionOfService: string;
          serviceName: string
        };

      }
    }[]
  }
}

export async function getServices() {
  const data: ServiceData = await FetchAPI(`
    query Services {
      services {
        edges {
          node {
            featuredImage {
              node {
                sourceUrl
              }
            }
            slug
            title
            excerpt
            serviceFields {
              descriptionOfService
              serviceName
            }
          }
        }
      }
    }
    `)
  return data?.services;
}

export async function getSingleService(slug: string): Promise<SingleServiceType> {
  const data = await FetchAPI(`
 query singleService($id: ID = "", $idType: ServiceIdType = URI) {
  service(id: $id, idType: $idType) {
    title
    excerpt
    content
    serviceFields {
      serviceName
      descriptionOfService
    }
    slug
    featuredImage {
      node {
        altText
        sourceUrl
      }
    }
    seo {
      metaKeywords
      metaDesc
      canonical
      title
    }
  }
}
    `,
    {
      variables: {
        id: slug
      }
    });

  return data
}

export async function getHero() {
  const data = await FetchAPI(`
query hero {
  heros {
    nodes {
      heros {
        hero {
          heroTitle
          heroSubtitle
          heroBodyText
          ctaButton
          banner_img {
            node {
              altText
              sourceUrl
            }
          }
        }
      }
    }
  }
}
    `)

  return data;
}

// get image for logo
export async function getLogo() {
  const data = await FetchAPI(`
    query Contentblocks {
  page(id: "cG9zdDoxMTYx", idType: ID) {
    editorBlocks {
      ... on CoreImage {
        anchor
        apiVersion
        attributes {
          alt
          url
        }
      }
    }
  }
}
    `)

  return data;
};

export async function getAbout(): Promise<AboutType> {
  const data = await FetchAPI(`
    query about {
  abouts {
    nodes {
      aboutComponent {
        bodytext
        title
        subtitle
        image {
          node {
            altText
            sourceUrl
          }
        }
        button {
          hrefbtn
          labelbtn
        }
      }
    }
  }
}
    `)

  return data;

}

export async function getDetailPage(id: string): Promise<DetailPageType> {
  const data = await FetchAPI(`
  query detailPage($id: ID = "", $idType: PageIdType = ID) {
  page(id: $id, idType: $idType) {
    content
    slug
    title
    featuredImage {
      node {
        altText
        sourceUrl
      }
    }
  }
}
   `
    ,
    {
      variables: {
        id: id
      }
    }
  )
  return data;
}

export async function getComponents(): Promise<ComponentForHomepage> {
  const data = await FetchAPI(`
  query homepage {
  nextjsPage(id: "cG9zdDoxNzky") {
    components {
      heroComponent {
        btnLabel
        btnSlug
        titleOfHero
        companyName
        imgSource {
          node {
            altText
            sourceUrl
          }
        }
      }
      valuesComponent {
        introduction {
          heading
          subtitle
        }
        values {
          value1 {
            label
            description
          }
          value2 {
            label
            description
          }
          value3 {
            label
            description
          }
          value4 {
            label
            description
          }
          value5 {
            label
            description
          }
          value6 {
            label
            description
          }
        }
      }
        mediaComponent {
        title
        subtitle
        label
        description
        btnLabel
        youtubeUrl
      }
    }
  }
}
    `)

  return data;
}



