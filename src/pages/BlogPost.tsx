import { useParams, Link, useNavigate } from "react-router-dom";
import { posts } from "../data/blog";
import { SEO } from "../components/SEO";
import { motion } from "motion/react";
import { ArrowLeft, Clock, User, Calendar, Tag } from "lucide-react";
import { useEffect } from "react";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = posts.find((p) => p.slug === slug);

  useEffect(() => {
    if (!post && slug) {
      navigate("/blog");
    }
    window.scrollTo(0, 0);
  }, [post, slug, navigate]);

  if (!post) return null;

  const otherPosts = posts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <SEO 
        title={post.title} 
        description={post.excerpt} 
      />
      
      <article className="min-h-screen pt-20">
        {/* Hero Section */}
        <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-base-950 via-base-950/40 to-transparent" />
          
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-4xl mx-auto px-6 pb-12 w-full">
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6 }}
               >
                 <Link 
                   to="/blog" 
                   className="inline-flex items-center gap-2 text-primary hover:text-primary-glow transition-colors mb-6 font-medium"
                 >
                   <ArrowLeft className="w-4 h-4" /> Back to Blog
                 </Link>
                 
                 <div className="flex flex-wrap items-center gap-4 text-sm text-white/60 mb-4">
                   <span className="bg-primary/20 text-primary px-2.5 py-0.5 rounded-full font-medium">
                     {post.category}
                   </span>
                   <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.readingTime}</span>
                   <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {post.date}</span>
                 </div>

                 <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight leading-tight mb-6">
                   {post.title}
                 </h1>

                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-base-800 flex items-center justify-center border border-white/10 overflow-hidden">
                      <img 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author}`} 
                        alt={post.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{post.author}</p>
                      <p className="text-white/50 text-xs">Technical Architect</p>
                    </div>
                 </div>
               </motion.div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="prose prose-invert prose-lg max-w-none 
              prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight
              prose-a:text-primary hover:prose-a:text-primary-glow
              prose-pre:bg-base-900 prose-pre:border prose-pre:border-white/10
              prose-img:rounded-2xl prose-img:border prose-img:border-white/10"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Related Posts */}
        <div className="bg-base-900/30 border-t border-white/10 py-24">
          <div className="max-w-5xl mx-auto px-6">
            <h3 className="text-2xl font-display font-bold mb-12">More from the blog</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {otherPosts.map((otherPost) => (
                <Link 
                  key={otherPost.slug} 
                  to={`/blog/${otherPost.slug}`}
                  className="group block bg-base-900/50 border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all"
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={otherPost.image} 
                      alt={otherPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-primary font-medium mb-3">
                      <Tag className="w-3 h-3" /> {otherPost.category}
                    </div>
                    <h4 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{otherPost.title}</h4>
                    <p className="text-white/60 text-sm line-clamp-2">{otherPost.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
