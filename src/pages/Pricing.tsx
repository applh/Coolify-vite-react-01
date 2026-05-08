import { SEO } from "../components/SEO";
import { motion } from "motion/react";
import { Check } from "lucide-react";

export function Pricing() {
  const plans = [
    {
      name: "Starter",
      description: "Perfect for personal projects and small blogs.",
      price: "Free",
      features: [
        "Open-source React/Vite Template",
        "Coolify Deployment Guides",
        "Basic NGINX Configuration",
        "Community Support",
      ]
    },
    {
      name: "Pro",
      description: "Everything you need for production workloads.",
      price: "$49/mo",
      popular: true,
      features: [
        "Everything in Starter",
        "Advanced NGINX caching",
        "Docker multi-stage builds",
        "Automated SSL setup guides",
        "Priority Email Support",
        "Security updates"
      ]
    },
    {
      name: "Enterprise",
      description: "Custom infrastructure solutions and consulting.",
      price: "Custom",
      features: [
        "Everything in Pro",
        "Dedicated infrastructure review",
        "Custom CI/CD pipelines",
        "99.9% Uptime SLA",
        "1-on-1 implementation",
        "24/7 Phone Support"
      ]
    }
  ];

  return (
    <>
      <SEO 
        title="Pricing" 
        description="Simple, transparent pricing for teams of all sizes building on Coolify."
      />
      <div className="max-w-7xl mx-auto px-6 py-24 flex-1 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">Pricing Plans</h1>
          <p className="text-xl text-white/80 leading-relaxed">
            Choose the level of support you need to confidently deploy and scale your applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-base-900 border rounded-2xl p-8 flex flex-col ${plan.popular ? 'border-primary ring-1 ring-primary/50' : 'border-white/10'}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-8 transform -translate-y-1/2">
                  <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="mb-6">
                <h2 className="text-2xl font-bold font-display mb-2">{plan.name}</h2>
                <p className="text-white/60 text-sm h-10">{plan.description}</p>
              </div>
              <div className="mb-8">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-white/80 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-lg font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-base-900 ${plan.popular ? 'bg-primary text-white hover:bg-primary/90 focus-visible:ring-primary' : 'bg-white/10 text-white hover:bg-white/20 focus-visible:ring-white/50'}`}>
                {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
