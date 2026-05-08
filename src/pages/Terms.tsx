import { SEO } from "../components/SEO";

export function Terms() {
  return (
    <>
      <SEO 
        title="Terms of Service" 
        description="Legal terms and conditions for using CoolifyStarter."
      />
      <div className="max-w-3xl mx-auto px-6 py-24 flex-1 w-full prose prose-invert prose-primary max-w-none">
        <h1 className="font-display text-4xl font-bold tracking-tight mb-8">Terms of Service</h1>
        <p className="text-sm text-white/60 mb-8">Last updated: May 8, 2026</p>
        
        <h2>1. Terms</h2>
        <p>By accessing the website at <a href="https://yourdomain.com">https://yourdomain.com</a>, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
        
        <h2>2. Use License</h2>
        <p>Permission is granted to temporarily download one copy of the materials (information or software) on CoolifyStarter's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>
        <p>This license shall automatically terminate if you violate any of these restrictions and may be terminated by CoolifyStarter at any time.</p>

        <h2>3. Disclaimer</h2>
        <p>The materials on CoolifyStarter's website are provided on an 'as is' basis. CoolifyStarter makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

        <h2>4. Limitations</h2>
        <p>In no event shall CoolifyStarter or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on CoolifyStarter's website.</p>
        
        <h2>5. Governing Law</h2>
        <p>These terms and conditions are governed by and construed in accordance with the laws of your jurisdiction and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
      </div>
    </>
  );
}
