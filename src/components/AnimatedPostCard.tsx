'use client';

import { motion } from 'framer-motion';
import { PostCard } from './PostCard';

interface AnimatedPostCardProps {
  post: any;
  index: number;
}

export function AnimatedPostCard({ post, index }: AnimatedPostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: 'easeOut',
      }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <PostCard post={post} />
    </motion.div>
  );
}
