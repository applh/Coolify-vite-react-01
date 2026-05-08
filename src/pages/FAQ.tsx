import { SEO } from "../components/SEO";
import { motion } from "motion/react";

export function FAQ() {
  const faqs = [
    {
      question: "What is CoolifyStarter?",
      answer: "CoolifyStarter is an optimized, production-ready React and Vite template designed specifically to be deployed on Coolify without the hassle of configuring complex build steps manually."
    },
    {
      question: "Do I need to know Docker to use this?",
      answer: "No. While we provide a highly optimized Dockerfile, Coolify uses Nixpacks by default which can automatically build and deploy this repository just by analyzing the package.json."
    },
    {
      question: "Can I use this for commercial projects?",
      answer: "Absolutely. The starter is released under the MIT license, meaning you can use it for both personal and commercial projects without any restrictions."
    },
    {
      question: "How is it optimized for performance?",
      answer: "We use Vite for lightning-fast builds, Tailwind CSS for minimal CSS bundle sizes, configure proper caching headers in NGINX, and enforce manual chunking to keep JavaScript payloads small."
    },
    {
      question: "Does it support Server-Side Rendering (SSR)?",
      answer: "Out of the box, this is a Single Page Application (SPA). However, you can easily implement SSR by configuring Vite and an Express backend, and providing an appropriate start command in the Coolify settings."
    }
  ];

  return (
    <>
      <SEO 
        title="FAQ" 
        description="Frequently asked questions about deploying React applications on Coolify."
      />
      <div className="max-w-4xl mx-auto px-6 py-24 flex-1 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-white/80 leading-relaxed">
            Everything you need to know about the starter and how it integrates with Coolify.
          </p>
        </motion.div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
             <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-base-900 border border-white/10 rounded-xl p-6"
             >
                <h3 className="text-lg font-semibold mb-3 text-white">{faq.question}</h3>
                <p className="text-white/70 leading-relaxed">{faq.answer}</p>
             </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
