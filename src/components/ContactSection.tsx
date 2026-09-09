import React, { useState } from 'react';
import { 
  Mail, 
  Send,
  Check, 
  Copy, 
  Github, 
  Linkedin, 
  ExternalLink 
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.contactEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="py-24 md:py-36 bg-[#121110] border-b border-[#24211E] relative transition-colors duration-500 ease-in-out">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 border-b border-[#262220] gap-6 mb-16">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-[#C8442C]" />
              <span className="font-mono-code text-xs text-[#B8976C] uppercase tracking-widest">
                Get in Touch
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-[#EDE8E1] tracking-tight">
              Contact
            </h2>
            <p className="font-serif-luxury text-xl text-[#A8A096] italic leading-relaxed font-light">
              For inquiries, collaboration proposals, or data research discussions.
            </p>
          </div>

          <div className="font-mono-code text-xs text-[#8E867E]">
            <span>{PERSONAL_INFO.name}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Direct Address Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 bg-[#181615] border border-[#2B2724] hover:border-[#B8976C]/60 transition-colors rounded-sm space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-mono-code text-xs text-[#C8442C] uppercase tracking-wider">
                  Direct Inquiries
                </span>
                <span className="w-2 h-2 rounded-full bg-[#C8442C] animate-pulse" />
              </div>

              <div className="font-mono-code text-base text-[#EDE8E1] font-medium break-all">
                <a
                  href={`mailto:${PERSONAL_INFO.contactEmail}`}
                  className="hover:text-[#B8976C] transition-colors"
                >
                  {PERSONAL_INFO.contactEmail}
                </a>
              </div>

              <button
                onClick={handleCopyEmail}
                className="w-full inline-flex items-center justify-center space-x-2 text-xs font-mono-code bg-[#121110] hover:bg-[#1E1C1A] text-[#EDE8E1] border border-[#302B27] hover:border-[#B8976C] py-3 rounded-sm transition-all"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#C8442C]" />
                    <span className="text-[#C8442C]">Email Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#B8976C]" />
                    <span>Copy Email Address</span>
                  </>
                )}
              </button>
            </div>

            {/* Profile Links Card */}
            <div className="p-6 bg-[#181615] border border-[#2B2724] rounded-sm space-y-4 text-xs font-mono-code">
              <span className="text-[#8E867E] block uppercase tracking-wider">
                Network & Profile Links
              </span>
              
              <div className="space-y-3">
                <a
                  href="https://github.com/didemmrsln"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between text-[#C5BEB5] hover:text-[#EDE8E1] p-2.5 bg-[#121110] hover:bg-[#1E1C1A] border border-[#262220] hover:border-[#B8976C] rounded-sm transition-colors group"
                >
                  <div className="flex items-center space-x-2">
                    <Github className="w-4 h-4 text-[#B8976C] group-hover:text-[#C8442C] transition-colors" />
                    <span>github.com/didemmrsln</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#7A726A] group-hover:text-[#EDE8E1] transition-colors" />
                </a>

                <a
                  href="https://www.linkedin.com/in/didem-arslan-yenihayat-24303688"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between text-[#C5BEB5] hover:text-[#EDE8E1] p-2.5 bg-[#121110] hover:bg-[#1E1C1A] border border-[#262220] hover:border-[#B8976C] rounded-sm transition-colors group"
                >
                  <div className="flex items-center space-x-2">
                    <Linkedin className="w-4 h-4 text-[#B8976C] group-hover:text-[#C8442C] transition-colors" />
                    <span>linkedin.com/in/didem-arslan-yenihayat</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#7A726A] group-hover:text-[#EDE8E1] transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Direct Email Action Card */}
          <div className="lg:col-span-7">
            <div className="p-8 md:p-10 bg-[#181615] border border-[#2B2724] rounded-sm h-full flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-[#C8442C]" />
                  <span className="font-mono-code text-xs text-[#B8976C] uppercase tracking-wider">
                    Start a Conversation
                  </span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl text-[#EDE8E1]">
                  Open for Research, Data Projects & Academic Collaborations
                </h3>
                <p className="text-sm text-[#9E968D] font-sans leading-relaxed pt-2">
                  Whether you have questions regarding the statistical methodologies, dataset pipelines, or are interested in discussing full-time opportunities and research collaborations, feel free to send an email.
                </p>
              </div>

              <div className="pt-4 border-t border-[#262220] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <a
                  href={`mailto:${PERSONAL_INFO.contactEmail}?subject=Portfolio%20Inquiry`}
                  className="inline-flex items-center justify-center space-x-2 py-3.5 px-8 bg-[#C8442C] hover:bg-[#D94E35] text-white font-mono-code text-xs uppercase tracking-widest rounded-sm transition-all duration-300 shadow-md shadow-[#C8442C]/15"
                >
                  <span>Send a Message</span>
                  <Send className="w-3.5 h-3.5" />
                </a>

                <span className="font-mono-code text-xs text-[#7A726A] text-center sm:text-right">
                  Opens your default email client
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
