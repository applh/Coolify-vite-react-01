import { motion } from "motion/react";
import { Server, Rocket, GitBranch, Terminal, CheckCircle2, Box } from "lucide-react";
import { useState } from "react";
import { SEO } from "../components/SEO";

export function Home() {
  const [activeTab, setActiveTab] = useState("docker");

  return (
    <>
      <SEO 
        title="Home" 
        description="Ship faster on your own servers with this Coolify starter application."
      />
      <div className="max-w-7xl mx-auto px-6 pb-24 flex-1 w-full">
        {/* Hero Section */}
        <div className="max-w-3xl mb-24 mt-16 md:mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/40 bg-primary/20 text-white/90 text-xs font-mono mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Ready for Coolify v4
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-8"
          >
            Ship faster on <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">your own</span> servers.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/80 leading-relaxed font-light max-w-2xl mb-10"
          >
            A production-ready full-stack starter. Built with React 19, powered by an integrated Express.js backend, and featuring a secure Admin area for managing your application.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mb-16"
          >
            <button className="px-6 py-3 rounded-full bg-white text-black font-semibold tracking-tight hover:scale-105 active:scale-95 transition-transform duration-200 shadow-[0_0_20px_rgba(255,255,255,0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base-950">
              Deploy to Coolify
            </button>
            <a href="/admin" className="px-6 py-3 rounded-full border border-primary/40 bg-primary/10 text-white hover:bg-primary/20 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base-950">
              Admin Dashboard
            </a>
          </motion.div>

          {/* Hero Image / Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative rounded-2xl border border-white/10 overflow-hidden bg-base-900 group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-base-950/80 via-transparent to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1600" 
              alt="Futuristic Network Infrastructure"
              referrerPolicy="no-referrer"
              className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-1000 opacity-60"
            />
            <div className="absolute bottom-8 left-8 z-20">
              <div className="bg-primary/20 backdrop-blur-md border border-primary/30 px-4 py-2 rounded-lg flex items-center gap-2">
                <Box className="w-4 h-4 text-primary" />
                <span className="text-white text-sm font-medium tracking-tight">Production Ready Bundle</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32" id="architecture">
          <FeatureCard 
            icon={<Terminal className="w-5 h-5 text-accent" aria-hidden="true" />}
            title="Express.js Backend"
            desc="Integrated Node.js backend for handling forms, authentication, and dynamic data with high performance."
            delay={0.4}
          />
          <FeatureCard 
            icon={<CheckCircle2 className="w-5 h-5 text-[#3b82f6]" aria-hidden="true" />}
            title="Admin Dashboard"
            desc="Secure management interface for viewing submissions and controlling application state."
            delay={0.5}
          />
          <FeatureCard 
            icon={<Server className="w-5 h-5 text-[#f59e0b]" aria-hidden="true" />}
            title="Nixpacks Ready"
            desc="Optimized for Coolify's Nixpacks, ensuring your full-stack app builds and deploys correctly every time."
            delay={0.6}
          />
        </div>

        {/* Configuration Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">Zero configuration deployment.</h2>
            <p className="text-white/80 mb-8 leading-relaxed">
              Coolify handles everything via Nixpacks by default, but we've included optional Docker configurations if you need fine-grained control over your Nginx setup for edge caching and compression.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold mb-1">Push to GitHub</h3>
                  <p className="text-sm text-white/70">Keep your source code safe in your repository.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold mb-1">Create Coolify Project</h3>
                  <p className="text-sm text-white/70">Add a new public repository resource.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold mb-1">Deploy</h3>
                  <p className="text-sm text-white/70">Coolify builds and serves the static assets immediately.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl border border-white/10 bg-base-900 overflow-hidden shadow-2xl"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-base-950/50">
              <div className="flex gap-1.5" aria-hidden="true">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="ml-4 flex gap-4 text-xs font-mono text-white/70">
                <button 
                  onClick={() => setActiveTab("docker")}
                  className={`hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded px-1 ${activeTab === 'docker' ? 'text-primary' : ''}`}
                >
                  Dockerfile
                </button>
                <button 
                  onClick={() => setActiveTab("nginx")}
                  className={`hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded px-1 ${activeTab === 'nginx' ? 'text-primary' : ''}`}
                >
                  nginx.conf
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-x-auto text-sm font-mono text-white/90">
              {activeTab === 'docker' ? (
                <pre className="!bg-transparent !p-0 m-0">
                  <code>
<span className="text-pink-400">FROM</span> node:20-alpine <span className="text-pink-400">AS</span> builder{'\n'}
<span className="text-pink-400">WORKDIR</span> /app{'\n'}
{'\n'}
<span className="text-white/40"># Install dependencies</span>{'\n'}
<span className="text-pink-400">COPY</span> package*.json ./{'\n'}
<span className="text-pink-400">RUN</span> npm ci{'\n'}
{'\n'}
<span className="text-white/40"># Build application</span>{'\n'}
<span className="text-pink-400">COPY</span> . .{'\n'}
<span className="text-pink-400">RUN</span> npm run build{'\n'}
{'\n'}
<span className="text-pink-400">FROM</span> nginx:alpine{'\n'}
<span className="text-pink-400">COPY</span> --from=builder /app/dist /usr/share/nginx/html{'\n'}
<span className="text-pink-400">COPY</span> nginx.conf /etc/nginx/conf.d/default.conf{'\n'}
<span className="text-pink-400">EXPOSE</span> 80{'\n'}
<span className="text-pink-400">CMD</span> ["nginx", "-g", "daemon off;"]
                  </code>
                </pre>
              ) : (
                <pre className="!bg-transparent !p-0 m-0">
                  <code>
<span className="text-[#3b82f6]">server</span> {'{'}{'\n'}
{'  '}<span className="text-primary-300">listen</span> 80;{'\n'}
{'  '}<span className="text-primary-300">server_name</span> localhost;{'\n'}
{'  '}<span className="text-primary-300">root</span> /usr/share/nginx/html;{'\n'}
{'  '}<span className="text-primary-300">index</span> index.html;{'\n'}
{'\n'}
{'  '}<span className="text-[#3b82f6]">location</span> / {'{'}{'\n'}
{'    '}<span className="text-primary-300">try_files</span> $uri $uri/ /index.html;{'\n'}
{'  '}{'}'}{'\n'}
{'\n'}
{'  '}<span className="text-white/40"># Cache static assets</span>{'\n'}
{'  '}<span className="text-[#3b82f6]">location</span> ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {'{'}{'\n'}
{'    '}<span className="text-primary-300">expires</span> 1y;{'\n'}
{'    '}<span className="text-primary-300">add_header</span> Cache-Control "public, no-transform";{'\n'}
{'  '}{'}'}{'\n'}
{'}'}
                  </code>
                </pre>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

function FeatureCard({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300 group"
    >
      <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h2 className="font-display font-semibold text-xl mb-2">{title}</h2>
      <p className="text-white/70 leading-relaxed text-sm">{desc}</p>
    </motion.div>
  );
}
