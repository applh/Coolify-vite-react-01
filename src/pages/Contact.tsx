import { SEO } from "../components/SEO";
import { motion } from "motion/react";
import { Mail, MessageSquare, MapPin, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export function Contact() {
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
    
    // Basic validation
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
            {status === "success" ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-accent/20 text-accent rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-white/70 mb-8 max-w-sm">
                  Thanks for reaching out. We've received your message and will get back to you shortly.
                </p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="bg-white/10 text-white font-medium py-2.5 px-6 rounded-lg hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                {status === "error" && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                    {errorMessage}
                  </div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-white/80 mb-2">First Name</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      value={formData.firstName}
                      onChange={handleChange}
                      disabled={status === "submitting"}
                      className="w-full bg-base-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow disabled:opacity-50" 
                      placeholder="John" 
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-white/80 mb-2">Last Name</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      value={formData.lastName}
                      onChange={handleChange}
                      disabled={status === "submitting"}
                      className="w-full bg-base-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow disabled:opacity-50" 
                      placeholder="Doe" 
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleChange}
                    disabled={status === "submitting"}
                    className="w-full bg-base-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow disabled:opacity-50" 
                    placeholder="john@example.com" 
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">Message</label>
                  <textarea 
                    id="message" 
                    rows={5} 
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status === "submitting"}
                    className="w-full bg-base-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow resize-none disabled:opacity-50" 
                    placeholder="How can we help you?"
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={status === "submitting"}
                  className="w-full bg-primary text-white font-medium py-3 rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base-900 disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}
