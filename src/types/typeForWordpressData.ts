
export type PostsDataProps =
        {
            posts: {
                edges: {
                    node: {
                        slug: string;
                        title: string;
                        excerpt: string;
                        content: string;
                        featuredImage: {
                            node: {
                                sourceUrl: string;
                                altText: string;
                                title: string;
                            }
                        };
                        date: string;
                        uri:string;
                        author: {
                            node: {
                                name: string;
                                firstName: string;
                                lastName: string;
                                description: string | null;
                                avatar: {
                                    url: string
                                }
                            }
                        };
                        categories: {
                            nodes: {
                                name: string;
                                slug: string;
                            }[]
                        };
                        tags: {
                            nodes: {
                                name: string;
                                slug: string;
                            }[]
                        }
                    }
                }[]
                pageInfo:{
                    offsetPagination:{
                        total:number;
                        hasMore:boolean;
                        hasPrevious:boolean;
                    }
                }
            }
        }
    
// trích xuất edges từ
export type PostsProps = PostsDataProps['posts'];
export type EdgesProps = PostsDataProps['posts']['edges'];
export type NodeProps = PostsDataProps['posts']['edges'][number]['node']
export type FeaturedImageProps = PostsDataProps['posts']['edges'][number]['node']['featuredImage'];
export type AuthorProps = PostsDataProps['posts']['edges'][number]['node']['author'];
export type CategoriesProps = PostsDataProps['posts']['edges'][number]['node']['categories'];
export type TagsProps = PostsDataProps['posts']['edges'][number]['node']['tags'];



// type of services

export type Services = {
    edges: {
        node: {
            slug:string;
            title:string;
            excerpt:string;
            featuredImage:{
                node: {
                    sourceUrl:string;
                }
            };
            serviceFields:{
                descriptionOfService:string;
                serviceName:string
            };

        }
    }[]
}
export type ServicesNodeArr = Services['edges'][number]['node'][]

export type SingleServiceType = {
    service: {
      title:string;
      excerpt:string;
      content:string;
      serviceFields:{
        serviceName:string;
        descriptionOfService:string;
      }
      slug:string;
      featuredImage:{
        node: {
          altText:string;
          sourceUrl:string;
        }
      }
      seo:{
        metaKeywords:string;
        mateDesc:string;
        canonical:string;
        title:string;
      }
  
    }
  }

export type PostMoreStoriesProps = {
    author: AuthorProps;
    date: string;
    featuredImage: FeaturedImageProps;
    slug: string;
    title: string;
    categories: {
        nodes: {
            name: string;
        }[];
    };
}[]

export type AllCategoriesProps = {
    nodes: {
        name: string;
        slug: string;
        posts: {
            nodes: PostMoreStoriesProps
        }
    }[]
};


//   component hero type
  export type hero = {
    heros: {
      nodes: {
        heros: {
            hero: {
                heroTitle:string;
                heroSubtitle:string;
                heroBodyText:string;
                ctaButton:string;
                banner_img: {
                  node:{
                    altText:string;
                    sourceUrl:string;
                  }
                }
            }
          
        }
      }[]
    }
  };

  export type AboutType = {
    abouts: {
        nodes: {
            aboutComponent: {
                bodytext:string;
                title:string;
                subtitle:string;
                image:{
                    node: {
                        altText:string;
                        sourceUrl:string;
                    }
                };
                button: {
                    labelbtn:string;
                    hrefbtn:string;
                }
               
            }
        }[]
    }
  };

  export type DetailPageType = {
    page: {
      content :string;
      slug:string;
      title:String;
      featuredImage:{
        node:{
          altText: string;
          sourceUrl:string;
        }
      }
    }
};



export type HeroComponent = {
  btnLabel: string;
  btnSlug: string;
  titleOfHero: string;
  companyName:string;
  imgSource: {
    node: {
      altText: string;
      sourceUrl: string;
    }
  }
}


export type Value = {
  label: string;
  description: string;
}
export type valuesComponent = {
  introduction: {
    heading:string;
    subtitle :string;
   }
   values:{
    value1:Value;
    value2:Value;
    value3:Value;
    value4:Value;
    value5:Value;
    value6:Value;
   }
}

export type MediaComponent = {
  title:string;
  subtitle:string;
  label:string;
  description:string;
  btnLabel:string;
  youtubeUrl:string
}
export type ComponentForHomepage = {
    nextjsPage: {
      components: {
        heroComponent:HeroComponent; 
        valuesComponent: valuesComponent;
        mediaComponent:MediaComponent;
      }
    }
  }


export type Hero = ComponentForHomepage['nextjsPage']['components']['heroComponent'];


export type LastestPosts = {
  posts: {
    edges: {
      node: {
        title: string;
        slug: string;
        excerpt: string;
        date: string;
        uri: string;
        featuredImage: {
          node: {
            sourceUrl: string;
            altText: string;
            title: string;
          };
        };
      };
    }[];
  }
};

export type  Project = {
  id:string;
  uri:string;
  title: string;
  slug: string;
  excerpt:string;
  date: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
  projectFields: {
    completedYear: string; // Stored as string in JSON (e.g., "2015")
    floor: number;
    location: string;
    projectCategory: string[]; // Array of strings
    sizeOfProject: number;
  };
}

export type Projects = {
  projects: {
    nodes: Project[];
  };
}
export type ProjectCategories = {
  projectCategories:{
    nodes: {
      name:string;
      slug:string;
    }[];
  }
}


export type SingleProject = 
{
  project: {
    title: string,
    excerpt: string,
    date: string,
    content: string,    
    slug:string,
    uri:string;
    featuredImage: {
      node: {
        sourceUrl: string;  
        altText: string;  
      }
    }
    author: {
      node: {
        name:string;
        avatar:{
          url:string;
        }
      }
    }
    projectFields: {
      completedYear: string;
      floor: number;
      location: string;
      projectCategory: string[];
      sizeOfProject: number;
      bedroom: number;
      budget: string[];
    }
  
  }
};

export type PostsData = 
{
  posts: {
    edges: Post[];
    pageInfo: PageInfo;
  };
};
export type PageInfo ={
  offsetPagination: {
    total: number;
    hasMore: boolean;
    hasPrevious: boolean;
  };
  startCursor: string;
  endCursor: string;
};
export type Post = {
   node: {
      title: string;
      excerpt: string;
      slug: string;
      date: string;
      uri: string;
      customPost:{
        readtime:number
      }
      featuredImage: {
        node: {
          sourceUrl: string;
          altText: string;
          title: string;
        };
      } | null;
      author: {
        node: {
          name: string;
          firstName: string | null;
          lastName: string | null;
          avatar: {
            url: string;
          };
          description: string | null;
        };
      };
      categories: {
        nodes: {
          name: string;
          slug: string;
        }[];
      };
      tags: {
        nodes: {
          name: string;
          slug: string;
        }[];
      };
      content: string;
    };
  }
