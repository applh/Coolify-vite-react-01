import { SEO } from "../components/SEO";
import { motion } from "motion/react";
import { ArrowRight, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";
import { posts } from "../data/blog";

export function Blog() {
  return (
    <>
      <SEO 
        title="Blog" 
        description="Articles, tutorials, and case studies about self-hosting modern web applications."
      />
      <div className="max-w-6xl mx-auto px-6 py-24 flex-1 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6">Blog</h1>
          <p className="text-xl text-white/80 leading-relaxed max-w-2xl">
            Thoughts, tutorials, and technical deep dives on building and deploying modern web applications to self-hosted infrastructure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
             <motion.article
               key={post.slug}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: index * 0.1 }}
               className="group flex flex-col bg-base-900/50 border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all"
             >
               <Link to={`/blog/${post.slug}`} className="aspect-video overflow-hidden">
                 <img 
                   src={post.image} 
                   alt={post.title}
                   referrerPolicy="no-referrer"
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                 />
               </Link>
               
               <div className="p-8 flex flex-col flex-1">
                 <div className="flex items-center gap-3 text-xs text-white/50 mb-4">
                   <span className="text-primary font-bold uppercase tracking-wider">{post.category}</span>
                   <span>&bull;</span>
                   <time>{post.date}</time>
                 </div>
                 
                 <Link to={`/blog/${post.slug}`} className="block mb-4">
                   <h2 className="text-xl md:text-2xl font-display font-bold group-hover:text-primary transition-colors leading-tight">
                     {post.title}
                   </h2>
                 </Link>
                 
                 <p className="text-white/60 text-sm leading-relaxed mb-6 line-clamp-3">
                   {post.excerpt}
                 </p>
                 
                 <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                   <div className="flex items-center gap-2 text-xs text-white/70">
                     <User className="w-3 h-3 text-primary" /> {post.author}
                   </div>
                   <Link 
                     to={`/blog/${post.slug}`} 
                     className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-glow transition-colors uppercase tracking-widest"
                   >
                     Read <ArrowRight className="w-3 h-3" />
                   </Link>
                 </div>
               </div>
             </motion.article>
          ))}
        </div>
      </div>
    </>
  );
}
