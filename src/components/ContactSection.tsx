import { motion } from "motion/react";
import { Mail, MessageSquare, MapPin, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      setErrorMessage("All fields are required.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      let data;
      const responseText = await response.text();
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        throw new Error(`Server returned invalid response (Status ${response.status}): ${responseText || '<empty body>'}`);
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit the form.");
      }

      setStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: ""
      });
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred.");
    }
  };

  return (
    <section className="border-t border-white/10 bg-base-950/50 backdrop-blur-sm relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,var(--color-primary)_0%,transparent_70%)] blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-6">Need custom development?</h2>
            <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-lg">
              Our team specializes in high-performance web applications and self-hosted infrastructure. 
              Let's talk about your next project.
            </p>
            
            <div className="space-y-6">
               <div className="flex items-center gap-4">
                 <div className="bg-primary/10 p-2 rounded-lg shrink-0">
                   <Mail className="w-5 h-5 text-primary" />
                 </div>
                 <a href="mailto:hello@coolifystarter.com" className="text-white/70 hover:text-primary transition-colors">hello@coolifystarter.com</a>
               </div>
               
               <div className="flex items-center gap-4">
                 <div className="bg-primary/10 p-2 rounded-lg shrink-0">
                   <MessageSquare className="w-5 h-5 text-primary" />
                 </div>
                 <a href="#" className="text-white/70 hover:text-primary transition-colors">Join our Discord Community</a>
               </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-base-900/80 border border-white/10 rounded-2xl p-8 backdrop-blur-md"
          >
            {status === "success" ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-8">
                <div className="w-12 h-12 bg-accent/20 text-accent rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                <p className="text-white/70 mb-6 text-sm">
                  We'll get back to you shortly.
                </p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="bg-white/10 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-white/20 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                {status === "error" && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs">
                    {errorMessage}
                  </div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">First Name</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      value={formData.firstName}
                      onChange={handleChange}
                      disabled={status === "submitting"}
                      className="w-full bg-base-950/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary transition-shadow disabled:opacity-50" 
                      placeholder="John" 
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Last Name</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      value={formData.lastName}
                      onChange={handleChange}
                      disabled={status === "submitting"}
                      className="w-full bg-base-950/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary transition-shadow disabled:opacity-50" 
                      placeholder="Doe" 
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleChange}
                    disabled={status === "submitting"}
                    className="w-full bg-base-950/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary transition-shadow disabled:opacity-50" 
                    placeholder="john@example.com" 
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Message</label>
                  <textarea 
                    id="message" 
                    rows={3} 
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status === "submitting"}
                    className="w-full bg-base-950/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary transition-shadow resize-none disabled:opacity-50" 
                    placeholder="Tell us about your project..."
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={status === "submitting"}
                  className="w-full bg-primary text-white text-sm font-medium py-3 rounded-lg hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-70 flex items-center justify-center gap-2 mt-2"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Get in Touch"
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
