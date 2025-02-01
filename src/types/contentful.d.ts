// Type definitions for Contentful content
export interface ContentfulImage {
  fields: {
    file: {
      url: string;
    };
  };
}

export interface ContentfulAuthor {
  fields: {
    name: string;
  };
}

export interface ContentfulArticle {
  sys: {
    id: string;
    createdAt: string;
  };
  fields: {
    title: string;
    slug: string;
    description: string;
    content: {
      data: any;
      content: any[];
      nodeType: string;
    };
    image: ContentfulImage;
    author: ContentfulAuthor;
    sport: string[];
    league: string[];
    readTime: string;
    featured: boolean;
    date: string;
  };
}

export interface Article {
  id: string;
  slug: string;  // Added slug field
  title: string;
  description: string;
  image: string;
  date: string;
  sport: string;
  league: string;
  featured: boolean;
  author: string;
  readTime: string;
  content: any;
}