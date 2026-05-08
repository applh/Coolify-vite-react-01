import { SEO } from "../components/SEO";
import { motion } from "motion/react";
import { Mail, MessageSquare, MapPin } from "lucide-react";

export function Contact() {
  return (
    <>
      <SEO 
        title="Contact Us" 
        description="Get in touch with the CoolifyStarter team. We're here to help."
      />
      <div className="max-w-7xl mx-auto px-6 py-24 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">Contact Us</h1>
            <p className="text-xl text-white/80 mb-12 leading-relaxed">
              Have questions about self-hosting or our templates? We'd love to hear from you. Fill out the form or reach out directly.
            </p>
            
            <div className="space-y-8">
               <div className="flex items-start gap-4">
                 <div className="bg-primary/10 p-3 rounded-xl shrink-0">
                   <Mail className="w-6 h-6 text-primary" />
                 </div>
                 <div>
                   <h3 className="font-semibold text-lg mb-1">Email</h3>
                   <p className="text-white/70">For general inquiries and support.</p>
                   <a href="mailto:hello@coolifystarter.com" className="text-primary hover:underline mt-2 inline-block">hello@coolifystarter.com</a>
                 </div>
               </div>
               
               <div className="flex items-start gap-4">
                 <div className="bg-primary/10 p-3 rounded-xl shrink-0">
                   <MessageSquare className="w-6 h-6 text-primary" />
                 </div>
                 <div>
                   <h3 className="font-semibold text-lg mb-1">Community</h3>
                   <p className="text-white/70">Join our Discord server to connect with other developers.</p>
                   <a href="#" className="text-primary hover:underline mt-2 inline-block">Join Discord</a>
                 </div>
               </div>

               <div className="flex items-start gap-4">
                 <div className="bg-primary/10 p-3 rounded-xl shrink-0">
                   <MapPin className="w-6 h-6 text-primary" />
                 </div>
                 <div>
                   <h3 className="font-semibold text-lg mb-1">Office</h3>
                   <p className="text-white/70 leading-relaxed">
                     123 Open Source Ave<br />
                     San Francisco, CA 94107<br />
                     United States
                   </p>
                 </div>
               </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-base-900 border border-white/10 rounded-2xl p-8"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-white/80 mb-2">First Name</label>
                  <input type="text" id="firstName" className="w-full bg-base-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow" placeholder="John" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-white/80 mb-2">Last Name</label>
                  <input type="text" id="lastName" className="w-full bg-base-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow" placeholder="Doe" />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">Email</label>
                <input type="email" id="email" className="w-full bg-base-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow" placeholder="john@example.com" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">Message</label>
                <textarea id="message" rows={5} className="w-full bg-base-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow resize-none" placeholder="How can we help you?"></textarea>
              </div>

              <button type="submit" className="w-full bg-primary text-white font-medium py-3 rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base-900">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
}
