import { SEO } from "../components/SEO";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Blog() {
  const posts = [
    {
      id: 1,
      title: "How to deploy React to Coolify using Docker",
      excerpt: "A step-by-step guide to writing the perfect multi-stage Dockerfile for React and Vite applications, optimized for Coolify deployments.",
      date: "May 8, 2026",
      category: "Engineering"
    },
    {
      id: 2,
      title: "The Ultimate NGINX Configuration for SPAs",
      excerpt: "Stop dealing with 404s on page refresh. Learn how to configure NGINX to properly serve React Router applications and cache static assets.",
      date: "April 24, 2026",
      category: "Architecture"
    },
    {
      id: 3,
      title: "Why we chose self-hosting over PaaS in 2026",
      excerpt: "A deep dive into our decision-making process when moving our entire infrastructure from managed platforms to our own servers with Coolify.",
      date: "April 10, 2026",
      category: "Case Study"
    }
  ];

  return (
    <>
      <SEO 
        title="Blog" 
        description="Articles, tutorials, and case studies about self-hosting modern web applications."
      />
      <div className="max-w-5xl mx-auto px-6 py-24 flex-1 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">Blog</h1>
          <p className="text-xl text-white/80 leading-relaxed max-w-2xl">
            Thoughts, tutorials, and technical deep dives on building and deploying modern web applications to self-hosted infrastructure.
          </p>
        </motion.div>

        <div className="space-y-12">
          {posts.map((post, index) => (
             <motion.article
               key={post.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: index * 0.1 }}
               className="group border-b border-white/10 pb-12 last:border-0"
             >
               <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
                 <span className="text-primary font-medium">{post.category}</span>
                 <span>&bull;</span>
                 <time>{post.date}</time>
               </div>
               <Link to={`/blog`} className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md">
                 <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 group-hover:text-primary transition-colors">
                   {post.title}
                 </h2>
               </Link>
               <p className="text-white/70 leading-relaxed max-w-3xl mb-6">
                 {post.excerpt}
               </p>
               <Link to={`/blog`} className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary-glow transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md p-1 -ml-1">
                 Read article <ArrowRight className="w-4 h-4" />
               </Link>
             </motion.article>
          ))}
        </div>
      </div>
    </>
  );
}
