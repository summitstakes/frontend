export interface Article {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  sport: string;
  league: string; // This will now support comma-separated leagues
  featured?: boolean;
  author: string;
  readTime: string;
}

export const articles: Article[] = [
  {
    id: 1,
    title: "NHL Playoff Race: Eastern Conference Breakdown",
    description: "An in-depth analysis of the Eastern Conference playoff race and betting implications for the final stretch.",
    image: "https://images.unsplash.com/photo-1515703407324-5f753afd8be8?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3",
    date: "Mar 15, 2024",
    sport: "Ice Hockey",
    league: "NHL, NCAA", // Added NCAA as additional league
    featured: true,
    author: "Mike Johnson",
    readTime: "8 min read"
  },
  {
    id: 2,
    title: "March Madness: Cinderella Stories to Watch",
    description: "Breaking down potential upset picks and value bets for this year's tournament.",
    image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3",
    date: "Mar 14, 2024",
    sport: "Basketball",
    league: "NCAA",
    author: "Sarah Williams",
    readTime: "6 min read"
  },
  {
    id: 3,
    title: "Premier League Title Race: Betting Analysis",
    description: "Statistical deep dive into the remaining schedules of title contenders.",
    image: "https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3",
    date: "Mar 14, 2024",
    sport: "Soccer",
    league: "EPL",
    author: "James Smith",
    readTime: "10 min read"
  },
  {
    id: 4,
    title: "MLB Season Preview: AL East Breakdown",
    description: "Team-by-team analysis and season-long betting opportunities.",
    image: "https://images.unsplash.com/photo-1471295253337-3ceaaad65897?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3",
    date: "Mar 13, 2024",
    sport: "Baseball",
    league: "MLB",
    author: "David Martinez",
    readTime: "7 min read"
  },
  {
    id: 5,
    title: "NBA MVP Race: Betting Value Analysis",
    description: "Breaking down the odds and finding value in the MVP market.",
    image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3",
    date: "Mar 13, 2024",
    sport: "Basketball",
    league: "NBA",
    author: "Chris Thompson",
    readTime: "9 min read"
  },
  {
    id: 6,
    title: "UFC 300: Main Card Betting Preview",
    description: "Complete breakdown of main card fights with betting analysis.",
    image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3",
    date: "Mar 12, 2024",
    sport: "MMA",
    league: "UFC",
    author: "Alex Rodriguez",
    readTime: "8 min read"
  },
  {
    id: 7,
    title: "Formula 1: Monaco GP Betting Guide",
    description: "Expert analysis of the most prestigious race in F1.",
    image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3",
    date: "Mar 11, 2024",
    sport: "Racing",
    league: "F1",
    author: "Lewis Hamilton",
    readTime: "7 min read"
  },
  {
    id: 8,
    title: "Tennis: French Open Preview",
    description: "Clay court specialists and dark horses to watch.",
    image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3",
    date: "Mar 10, 2024",
    sport: "Tennis",
    league: "ATP",
    author: "Maria Sharapova",
    readTime: "6 min read"
  },
  {
    id: 9,
    title: "NFL Draft: Top QB Prospects Analysis",
    description: "Breaking down the top quarterback prospects and their potential impact.",
    image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3",
    date: "Mar 9, 2024",
    sport: "American Football",
    league: "NFL",
    author: "Tom Brady",
    readTime: "8 min read"
  },
  {
    id: 10,
    title: "Champions League: Quarter-Final Preview",
    description: "Analyzing the matchups and betting opportunities in the UCL quarter-finals.",
    image: "https://images.unsplash.com/photo-1522778526097-ce0a22ceb253?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3",
    date: "Mar 8, 2024",
    sport: "Soccer",
    league: "Champions League",
    author: "Frank Lampard",
    readTime: "10 min read"
  },
  {
    id: 11,
    title: "NBA Playoff Picture: Western Conference",
    description: "Breaking down the playoff race in the West and key betting trends.",
    image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3",
    date: "Mar 7, 2024",
    sport: "Basketball",
    league: "NBA",
    author: "Steve Nash",
    readTime: "9 min read"
  },
  {
    id: 12,
    title: "NHL Trade Deadline: Betting Implications",
    description: "How the trade deadline moves affect betting markets and team futures.",
    image: "https://images.unsplash.com/photo-1515703407324-5f753afd8be8?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3",
    date: "Mar 6, 2024",
    sport: "Ice Hockey",
    league: "NHL",
    author: "Wayne Gretzky",
    readTime: "7 min read"
  }
];