import { SEO } from "../components/SEO";
import { motion } from "motion/react";

export function About() {
  return (
    <>
      <SEO 
        title="About Us" 
        description="Learn more about our mission and the team behind CoolifyStarter."
      />
      <div className="max-w-4xl mx-auto px-6 py-24 flex-1 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">About Us</h1>
          <p className="text-xl text-white/80 mb-12 leading-relaxed">
            We're on a mission to democratize hosting. By building tools that seamlessly integrate with self-hosted PaaS solutions like Coolify, we give developers back control over their infrastructure.
          </p>
          
          <div className="space-y-12">
            <section>
              <h2 className="font-display text-2xl font-semibold mb-4 text-primary">Our Story</h2>
              <div className="prose prose-invert text-white/70 max-w-none">
                <p>
                  Founded in 2024, our team realized that modern web tooling had become overly dependent on proprietary hosting platforms. While these platforms offer great developer experience, they often lead to vendor lock-in and high costs at scale.
                </p>
                <p className="mt-4">
                  CoolifyStarter was born from the desire to take the exceptional developer experience of tools like Vite and React, and pair them with the freedom of open-source hosting platforms like Coolify.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="font-display text-2xl font-semibold mb-4 text-primary">Core Values</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                 <li className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                    <h3 className="font-semibold text-lg mb-2">Open Source First</h3>
                    <p className="text-sm text-white/70 leading-relaxed">We believe in building tools that everyone can audit, modify, and improve.</p>
                 </li>
                 <li className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                    <h3 className="font-semibold text-lg mb-2">Developer Experience</h3>
                    <p className="text-sm text-white/70 leading-relaxed">Self-hosting shouldn't mean sacrificing the modern developer workflows we've grown to love.</p>
                 </li>
                 <li className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                    <h3 className="font-semibold text-lg mb-2">Performance by Default</h3>
                    <p className="text-sm text-white/70 leading-relaxed">Every starter and template we release is optimized for speed and accessibility from day one.</p>
                 </li>
                 <li className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                    <h3 className="font-semibold text-lg mb-2">Security Conscious</h3>
                    <p className="text-sm text-white/70 leading-relaxed">We implement secure headers, CSPs, and best practices out of the box so you don't have to.</p>
                 </li>
              </ul>
            </section>
          </div>
        </motion.div>
      </div>
    </>
  );
}
