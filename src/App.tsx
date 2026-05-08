/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Server, Rocket, GitBranch, Github, Terminal, CheckCircle2, Box } from "lucide-react";
import { useState, useEffect } from "react";

export default function App() {
  const [activeTab, setActiveTab] = useState("docker");
  
  return (
    <div className="min-h-screen bg-base-950 text-white overflow-hidden selection:bg-primary/30">
      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none bg-grid-white/[0.02] bg-[size:40px_40px] mask-fade-out" />
      
      {/* Radial Gradient */}
      <div className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/10 blur-[100px] pointer-events-none" />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-base-950/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-display font-bold text-lg tracking-tight">
            <Box className="w-6 h-6 text-primary" />
            <span>Coolify<span className="text-white/50">Starter</span></span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors duration-200">
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <button className="px-4 py-1.5 rounded-full text-sm font-medium bg-white text-black hover:bg-white/90 transition-colors">
              Deploy
            </button>
          </div>
        </div>
      </nav>

      <main className="relative pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="max-w-3xl mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary-300 text-xs font-mono mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Ready for Coolify v4
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-8"
            >
              Ship faster on <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">your own</span> servers.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-white/60 leading-relaxed font-light max-w-2xl mb-10"
            >
              A clean, high-performance React application pre-configured for seamless deployment on Coolify. Pull from GitHub and go live in seconds without vendor lock-in.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <button className="px-6 py-3 rounded-full bg-white text-black font-semibold tracking-tight hover:scale-105 active:scale-95 transition-transform duration-200 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                Deploy to Coolify
              </button>
              <a href="#architecture" className="px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors duration-200">
                View Architecture
              </a>
            </motion.div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32" id="architecture">
            <FeatureCard 
              icon={<Server className="w-5 h-5 text-accent" />}
              title="Self-Hosted First"
              desc="Built explicitly for Coolify's Nixpacks and Docker environments. No Vercel or Netlify required."
              delay={0.4}
            />
            <FeatureCard 
              icon={<Rocket className="w-5 h-5 text-[#3b82f6]" />}
              title="Vite + React 19"
              desc="Lightning fast development server and optimized production builds with modern React standards."
              delay={0.5}
            />
            <FeatureCard 
              icon={<GitBranch className="w-5 h-5 text-[#f59e0b]" />}
              title="GitOps Ready"
              desc="Just connect your public GitHub repository to Coolify. Auto-deployments work out of the box."
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
              <h2 className="font-display text-4xl font-bold tracking-tight mb-4">Zero configuration deployment.</h2>
              <p className="text-white/60 mb-8 leading-relaxed">
                Coolify handles everything via Nixpacks by default, but we've included optional Docker configurations if you need fine-grained control over your Nginx setup for edge caching and compression.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Push to GitHub</h3>
                    <p className="text-sm text-white/50">Keep your source code safe in your repository.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Create Coolify Project</h3>
                    <p className="text-sm text-white/50">Add a new public repository resource.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Deploy</h3>
                    <p className="text-sm text-white/50">Coolify builds and serves the statics assets immediately.</p>
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
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="ml-4 flex gap-4 text-xs font-mono text-white/40">
                  <button 
                    onClick={() => setActiveTab("docker")}
                    className={`hover:text-white/80 transition-colors ${activeTab === 'docker' ? 'text-primary' : ''}`}
                  >
                    Dockerfile
                  </button>
                  <button 
                    onClick={() => setActiveTab("nginx")}
                    className={`hover:text-white/80 transition-colors ${activeTab === 'nginx' ? 'text-primary' : ''}`}
                  >
                    nginx.conf
                  </button>
                </div>
              </div>
              
              <div className="p-6 overflow-x-auto text-sm font-mono text-white/80">
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
      </main>

      <footer className="border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
          <div className="flex items-center gap-2">
            <Box className="w-4 h-4" />
            <span>Built for Coolify</span>
          </div>
          <p>© {new Date().getFullYear()} Minimal Starter. Mit License.</p>
        </div>
      </footer>
    </div>
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
      <h3 className="font-display font-semibold text-xl mb-2">{title}</h3>
      <p className="text-white/50 leading-relaxed text-sm">{desc}</p>
    </motion.div>
  );
}

