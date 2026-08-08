import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  Send,
  MapPin,
  Copy,
  Check,
  Sparkles,
  MessageSquare,
  User,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import confetti from 'canvas-confetti';
import SpotlightCard from './SpotlightCard';
import { supabase } from '../lib/supabaseClient';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState({ loading: false, success: false, error: '' });
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('lokeshvarmakshatriya@gmail.com');
    setCopiedEmail(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#00f0ff', '#3b82f6', '#a855f7'],
    });
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ loading: false, success: false, error: 'Please fill in all required fields.' });
      return;
    }

    setStatus({ loading: true, success: false, error: '' });

    try {
      // 1. Supabase Database Insertion Layer into contact_submissions table
      const createdAt = new Date().toISOString();
      const submissionData = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject || 'Portfolio Inquiry',
        message: formData.message,
        created_at: createdAt,
      };

      const { data, error } = await supabase
        .from('contact_submissions')
        .insert([submissionData]);

      if (error) {
        throw error;
      }

      // 2. Invoke Supabase Edge Function send-contact-email for Resend email dispatch
      try {
        const { data: fnData, error: fnError } = await supabase.functions.invoke('send-contact-email', {
          body: submissionData,
        });
        if (fnError) {
          console.warn('Edge Function returned error:', fnError);
        } else {
          console.log('Edge Function dispatch succeeded:', fnData);
        }
      } catch (edgeErr) {
        console.warn('Edge Function call warning:', edgeErr);
      }

      // 3. Successful Submission UI State & Confetti
      setStatus({ loading: false, success: true, error: '' });
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Trigger celebratory confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f0ff', '#3b82f6', '#a855f7'],
      });

      setTimeout(() => {
        setStatus({ loading: false, success: false, error: '' });
      }, 5000);
    } catch (err) {
      console.error('Supabase submission error:', err);
      const isNetworkError =
        err?.message?.includes('Failed to fetch') ||
        err?.message?.includes('TypeError') ||
        err?.message?.includes('NetworkError') ||
        err?.message?.includes('connection');

      const userErrorMessage = isNetworkError
        ? 'Network connection interrupted. Please check your internet connection or try submitting again.'
        : err.message || 'Failed to submit form. Please try again.';

      setStatus({
        loading: false,
        success: false,
        error: userErrorMessage,
      });
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
          GET IN TOUCH
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mt-4">
          Let's Build Something <span className="gradient-text-cyan-blue">Extraordinary</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3">
          Have an idea for a full-stack web application, a React Native mobile app, or looking to add a passionate developer to your team? Let's talk!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Direct Contact Details & Quick Copy */}
        <div className="lg:col-span-5 space-y-6">
          
          <SpotlightCard className="p-6">
            <h3 className="font-display text-lg font-bold text-white mb-2">
              Contact Information
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Feel free to reach out directly via email, GitHub, or LinkedIn. I usually respond within 24 hours.
            </p>

            <div className="space-y-4">
              
              {/* Phone Card with Clickable tel: link */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between group">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] font-mono text-slate-400 block">PHONE / WHATSAPP</span>
                    <a
                      href="tel:+917036189451"
                      className="text-xs font-semibold text-white hover:text-emerald-400 transition-colors truncate block"
                    >
                      +91 7036189451
                    </a>
                  </div>
                </div>

                <a
                  href="tel:+917036189451"
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-emerald-600 hover:text-white text-emerald-400 text-xs font-mono transition-colors shrink-0"
                >
                  Call Now
                </a>
              </div>

              {/* Email Card with Copy Trigger & Clickable mailto: link */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between group">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] font-mono text-slate-400 block">DIRECT EMAIL</span>
                    <a
                      href="mailto:lokeshvarmakshatriya@gmail.com"
                      className="text-xs font-semibold text-white hover:text-cyan-400 transition-colors truncate block"
                    >
                      lokeshvarmakshatriya@gmail.com
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors shrink-0"
                  title="Copy Email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location Badge */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block">LOCATION</span>
                  <span className="text-xs font-semibold text-white">
                    Peravaram, Andhra Pradesh, India 🇮🇳
                  </span>
                </div>
              </div>

            </div>
          </SpotlightCard>

          {/* Social Links Matrix */}
          <SpotlightCard className="p-6">
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4">
              CONNECT ON SOCIAL PLATFORMS
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://github.com/lokesh-varma28"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-800/80 flex items-center gap-3 text-xs font-medium text-slate-200 hover:text-white transition-all group"
              >
                <FaGithub className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                <span>GitHub Profile</span>
              </a>

              <a
                href="https://www.linkedin.com/in/natra-lokesh-493bb63a2"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 hover:bg-slate-800/80 flex items-center gap-3 text-xs font-medium text-slate-200 hover:text-white transition-all group"
              >
                <FaLinkedin className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                <span>LinkedIn</span>
              </a>
            </div>
          </SpotlightCard>

        </div>

        {/* Right Column: Glassmorphism Contact Form */}
        <div className="lg:col-span-7">
          <SpotlightCard className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {status.error && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{status.error}</span>
                </div>
              )}

              {status.success && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                  <div>
                    <strong className="font-semibold block text-white text-sm">Message Sent Successfully!</strong>
                    <span>Thank you for reaching out, Natra Lokesh will get back to you shortly.</span>
                  </div>
                </motion.div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Name Input */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    YOUR NAME <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Johnson"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    YOUR EMAIL <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@company.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                      required
                    />
                  </div>
                </div>

              </div>

              {/* Subject Input */}
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  SUBJECT
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. React Native Project Inquiry"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                />
              </div>

              {/* Message Textarea */}
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  YOUR MESSAGE <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project details or job role..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none"
                    required
                  ></textarea>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status.loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-display font-semibold text-xs shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status.loading ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

            </form>
          </SpotlightCard>
        </div>

      </div>
    </section>
  );
}
