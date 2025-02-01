import { createClient } from 'contentful';
import type { Article } from '../types/contentful';

// Create Contentful client with fallback values
const contentfulClient = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID || 'fallback-space-id',
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN || 'fallback-access-token',
  environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master'
});

// Helper function to format article data
function formatArticle(item: any): Article {
  const fields = item.fields;
  return {
    id: item.sys.id,
    slug: fields.slug || item.sys.id, // Use slug if available, fallback to ID
    title: fields.title || '',
    description: fields.description || '',
    image: fields.image?.fields?.file?.url 
      ? `https:${fields.image.fields.file.url}`
      : 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426&ixlib=rb-4.0.3',
    date: fields.date || new Date(item.sys.createdAt).toLocaleDateString('default', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }),
    sport: Array.isArray(fields.sport) ? fields.sport[0] : fields.sport || 'General',
    league: Array.isArray(fields.league) ? fields.league[0] : fields.league || 'All Leagues',
    featured: fields.featured || false,
    author: fields.author?.fields?.name || 'Summit Stakes',
    readTime: fields.readTime || '5 min read',
    content: fields.content
  };
}

// Helper function to fetch articles with error handling
export async function getArticles(): Promise<Article[]> {
  try {
    // Check if Contentful credentials are properly configured
    if (!import.meta.env.VITE_CONTENTFUL_SPACE_ID || !import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN) {
      console.warn('Contentful credentials not found. Using mock data.');
      return getMockArticles();
    }

    const response = await contentfulClient.getEntries({
      content_type: 'proInsight',
      include: 2,
      order: '-sys.createdAt' // Sort by newest first
    });

    return response.items.map(formatArticle);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return getMockArticles();
  }
}

// Helper function to fetch a single article by slug with error handling
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (!slug) return null;

  try {
    // Check if Contentful credentials are properly configured
    if (!import.meta.env.VITE_CONTENTFUL_SPACE_ID || !import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN) {
      console.warn('Contentful credentials not found. Using mock data.');
      return getMockArticles().find(article => article.slug === slug) || null;
    }

    const response = await contentfulClient.getEntries({
      content_type: 'proInsight',
      'fields.slug': slug,
      include: 2,
      limit: 1
    });

    if (response.items.length === 0) {
      return null;
    }

    return formatArticle(response.items[0]);
  } catch (error) {
    console.error('Error fetching article:', error);
    return getMockArticles().find(article => article.slug === slug) || null;
  }
}

// Helper function to fetch a single article by ID with error handling
export async function getArticle(id: string): Promise<Article | null> {
  if (!id) return null;

  try {
    // Check if Contentful credentials are properly configured
    if (!import.meta.env.VITE_CONTENTFUL_SPACE_ID || !import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN) {
      console.warn('Contentful credentials not found. Using mock data.');
      return getMockArticles().find(article => article.id === id) || null;
    }

    const response = await contentfulClient.getEntry(id, {
      include: 2
    });

    return formatArticle(response);
  } catch (error) {
    console.error('Error fetching article:', error);
    return getMockArticles().find(article => article.id === id) || null;
  }
}

// Mock data for development/fallback
function getMockArticles(): Article[] {
  return [
    {
      id: '1',
      slug: 'nhl-playoffs-preview',
      title: 'NHL Playoffs Preview: Key Matchups to Watch',
      description: 'Breaking down the most important matchups in the upcoming NHL playoff series.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426&ixlib=rb-4.0.3',
      date: 'Jan 15, 2024',
      sport: 'Ice Hockey',
      league: 'NHL',
      featured: true,
      author: 'John Smith',
      readTime: '5 min read',
      content: {
        nodeType: 'document',
        content: [
          {
            nodeType: 'paragraph',
            content: [
              {
                nodeType: 'text',
                value: 'As we approach the NHL playoffs, several key matchups are shaping up to be particularly intriguing.'
              }
            ]
          },
          {
            nodeType: 'heading-2',
            content: [
              {
                nodeType: 'text',
                value: 'Eastern Conference Showdown'
              }
            ]
          },
          {
            nodeType: 'paragraph',
            content: [
              {
                nodeType: 'text',
                value: 'The Eastern Conference features some of the most competitive matchups we have seen in years.'
              }
            ]
          }
        ]
      }
    },
    {
      id: '2',
      slug: 'nba-betting-trends',
      title: 'NBA Betting Trends: What the Data Reveals',
      description: 'Analyzing the latest NBA betting trends and what they mean for bettors.',
      image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=2669&ixlib=rb-4.0.3',
      date: 'Jan 14, 2024',
      sport: 'Basketball',
      league: 'NBA',
      featured: false,
      author: 'Sarah Johnson',
      readTime: '4 min read',
      content: {
        nodeType: 'document',
        content: [
          {
            nodeType: 'paragraph',
            content: [
              {
                nodeType: 'text',
                value: 'Recent NBA betting trends have shown some interesting patterns that smart bettors should be aware of.'
              }
            ]
          }
        ]
      }
    }
  ];
}