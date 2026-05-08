import { SEO } from "../components/SEO";
import { motion } from "motion/react";
import { Server, Shield, Zap, Globe, Cpu, RefreshCw } from "lucide-react";

export function Services() {
  const services = [
    {
      icon: <Server className="w-6 h-6 text-primary" />,
      title: "Infrastructure Setup",
      description: "We help you set up and configure your own VPS instances, optimizing them for production workloads."
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-primary" />,
      title: "CI/CD Pipelines",
      description: "Automated deployment pipelines tailored for Coolify, ensuring your code goes live smoothly and safely."
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Security Auditing",
      description: "Comprehensive audits of your self-hosted infrastructure, implementing firewalls, WAFs, and best practices."
    },
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      title: "Performance Optimization",
      description: "Deep dive into your Vite and React applications to maximize lighthouse scores and minimize bundle sizes."
    },
    {
      icon: <Globe className="w-6 h-6 text-primary" />,
      title: "Global CDN Integration",
      description: "Connect your self-hosted applications to global Edge networks for latency-free delivery worldwide."
    },
    {
      icon: <Cpu className="w-6 h-6 text-primary" />,
      title: "Custom Integrations",
      description: "Need something specific? We build custom plugins and integrations for your self-hosting workflow."
    }
  ];

  return (
    <>
      <SEO 
        title="Services" 
        description="Professional services for setting up, securing, and optimizing your self-hosted infrastructure."
      />
      <div className="max-w-7xl mx-auto px-6 py-24 flex-1 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">Our Services</h1>
          <p className="text-xl text-white/80 leading-relaxed">
            Whether you're migrating from a managed PaaS or starting fresh, our expert team provides the services you need to succeed with self-hosting.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
             <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-base-900 border border-white/10 p-8 rounded-2xl hover:border-primary/50 transition-colors"
             >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h2 className="font-display text-xl font-semibold mb-3">{service.title}</h2>
                <p className="text-white/70 leading-relaxed">{service.description}</p>
             </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
