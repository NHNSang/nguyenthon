import { AboutType, ComponentForHomepage, DetailPageType, hero, LastestPosts, PostsData, ProjectCategories, Projects, SingleProject, SingleServiceType } from "@/types/typeForWordpressData";
import { cache } from "react";


const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "";

async function FetchAPI(query = "", { variables }: Record<string, any> = {}) {
  const headers: { "Content-Type": string, [key: string]: string } = { "Content-Type": "application/json" };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 50000); // 30 giây
  /**
   * Vì không truyền trực tiếp timeout value vào fetch, nên cần tạo một AbortController để có thể hủy yêu cầu fetch. 
   * AbortController: Tạo một AbortController để có thể hủy yêu cầu fetch.
      Timeout: Sử dụng setTimeout để hủy yêu cầu sau 10 giây.
      Signal: Truyền signal từ AbortController vào hàm fetch.
      Error Handling: Bắt lỗi nếu yêu cầu bị hủy do hết thời gian chờ hoặc gặp lỗi khác.
   */

  const res = await fetch(
    API_URL,
    {
      headers,
      method: "POST",
      body: JSON.stringify({
        query,
        variables
      }),
      next: { revalidate: 120 },
      //thêm thời gian chờ load dữ liệu để tạo các trang tĩnh, tránh trường hợp fail vì fetch dữ liệu về vượt quá thời gian chờ, điều này dẫn đến lỗi và không delop được. Thường gặp khi deploy vercel.
      signal: controller.signal
    }
  );
  clearTimeout(timeoutId);
  const json = await res.json();
  if (json.error) {
    console.error(json.error);
    throw new Error('Failed to fetch API')
  }
  return json.data;
}



export async function getAllProjects(): Promise<Projects> {
  const data = await FetchAPI(`
query projects {
  projects {
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
}`)

  return data;
}




export async function getSingleProject(uri: string): Promise<SingleProject> {
  // Decode URI if encoded and clean up formatting
  let cleanUri = uri;
  try {
    // Handle encoded URI formats
    if (cleanUri.includes('%2F')) {
      cleanUri = decodeURIComponent(cleanUri);
    }
    
    // Ensure the URI has proper format for WordPress API
    if (!cleanUri.startsWith('/')) {
      cleanUri = '/' + cleanUri;
    }
    if (!cleanUri.endsWith('/')) {
      cleanUri = cleanUri + '/';
    }
    
    console.log('Formatted URI for API request:', cleanUri);
  } catch (error) {
    console.error('Error processing URI:', error);
  }

  const data = await FetchAPI(`
  query singleProject($id: ID = "new-espace-citoyen-des-confluents-transforms-former-industrial-site-into-sustainable-urban-renewal-model", $idType: ProjectIdType = URI) {
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
    `, {
    variables: {
      id: cleanUri
    }
  })

  return data;
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
export async function getPostsForBlogHub(amountOfPostPerPage:number, currentPage:number): Promise<PostsData> {
  // const offset = parseInt(String(currentPage))*amountOfPostPerPage - amountOfPostPerPage
  //  amountOfPostPerPage = 3
  //  currentPage =1
  const offset = amountOfPostPerPage*(parseFloat(String(currentPage)) - 1)
  const data = await FetchAPI(`
   query PostsForBlogHub {
  posts(where: {offsetPagination: {offset: ${offset}, size: ${amountOfPostPerPage + 1 }}}) {
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



export async function getSinglePost(slug: string):Promise<SinglePostData> {
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



