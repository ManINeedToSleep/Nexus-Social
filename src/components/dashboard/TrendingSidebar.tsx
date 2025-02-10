'use client';

import { motion } from 'framer-motion';

export default function TrendingSidebar() {
  const trendingTopics = [
    { tag: '#NextJS', posts: 2345 },
    { tag: '#WebDev', posts: 1234 },
    { tag: '#React', posts: 987 },
    { tag: '#TypeScript', posts: 876 },
  ];

  return (
    <div className="bg-black/30 backdrop-blur-md rounded-2xl border border-border p-6 sticky top-24">
      <h2 className="text-xl font-bold mb-4">Trending Topics</h2>
      
      <div className="space-y-4">
        {trendingTopics.map((topic) => (
          <motion.div
            key={topic.tag}
            className="p-3 rounded-lg hover:bg-primary/10 cursor-pointer transition-colors"
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <p className="font-medium">{topic.tag}</p>
            <p className="text-sm text-muted-foreground">
              {topic.posts.toLocaleString()} posts
            </p>
          </motion.div>
        ))}
      </div>

      {/* Suggested Users */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Suggested Users</h2>
        <div className="space-y-4">
          {/* Placeholder for suggested users */}
          <p className="text-muted-foreground text-sm">
            Coming soon...
          </p>
        </div>
      </div>
    </div>
  );
} 