import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface StaticPageProps {
  title: string;
  children: React.ReactNode;
}

function StaticPage({ title, children }: StaticPageProps) {
  return (
    <div className="min-h-screen bg-[#0f0e0e]">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-16">
        <h1
          className="font-display text-4xl sm:text-5xl font-black text-[#f0ece4] mb-8"
          style={{ fontFamily: "Fraunces, serif" }}
        >
          {title}
        </h1>
        <div className="prose prose-invert max-w-none text-[#8a8070] leading-relaxed space-y-4">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export function TermsPage() {
  return (
    <StaticPage title="Terms & Conditions">
      <p className="text-[#f0ece4] text-lg">Last updated: {new Date().getFullYear()}</p>
      <p>By accessing TopMoviesHub, you agree to be bound by these Terms & Conditions. Please read them carefully before using our platform.</p>
      <h2 className="text-[#f0ece4] text-xl font-bold mt-8 mb-3" style={{ fontFamily: "Fraunces, serif" }}>1. Use of Service</h2>
      <p>TopMoviesHub provides links to third-party content for informational purposes only. We do not host, upload, or transmit any copyrighted material on our servers.</p>
      <h2 className="text-[#f0ece4] text-xl font-bold mt-8 mb-3" style={{ fontFamily: "Fraunces, serif" }}>2. Intellectual Property</h2>
      <p>All movie titles, posters, and related imagery are the property of their respective owners. TopMoviesHub does not claim ownership of any third-party content.</p>
      <h2 className="text-[#f0ece4] text-xl font-bold mt-8 mb-3" style={{ fontFamily: "Fraunces, serif" }}>3. Disclaimer</h2>
      <p>The content on this site is provided "as is" without warranty. We are not responsible for the content of external linked sites.</p>
      <h2 className="text-[#f0ece4] text-xl font-bold mt-8 mb-3" style={{ fontFamily: "Fraunces, serif" }}>4. Changes to Terms</h2>
      <p>We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of the modified terms.</p>
    </StaticPage>
  );
}

export function PrivacyPage() {
  return (
    <StaticPage title="Privacy Policy">
      <p className="text-[#f0ece4] text-lg">Last updated: {new Date().getFullYear()}</p>
      <p>Your privacy is important to us. This policy describes how TopMoviesHub collects and uses information.</p>
      <h2 className="text-[#f0ece4] text-xl font-bold mt-8 mb-3" style={{ fontFamily: "Fraunces, serif" }}>Information We Collect</h2>
      <p>TopMoviesHub is a client-side only application. We do not collect, store, or transmit any personal data to external servers. All preferences are stored locally in your browser's localStorage.</p>
      <h2 className="text-[#f0ece4] text-xl font-bold mt-8 mb-3" style={{ fontFamily: "Fraunces, serif" }}>Cookies</h2>
      <p>We do not use tracking cookies. Session data is stored in localStorage and remains on your device.</p>
      <h2 className="text-[#f0ece4] text-xl font-bold mt-8 mb-3" style={{ fontFamily: "Fraunces, serif" }}>Third-Party Links</h2>
      <p>Our platform links to external download services. We are not responsible for the privacy practices of those sites.</p>
    </StaticPage>
  );
}

export function DMCAPage() {
  return (
    <StaticPage title="DMCA Policy">
      <p>TopMoviesHub respects the intellectual property rights of others and expects its users to do the same.</p>
      <h2 className="text-[#f0ece4] text-xl font-bold mt-8 mb-3" style={{ fontFamily: "Fraunces, serif" }}>Notice of Infringement</h2>
      <p>If you believe that your copyrighted work has been linked to in a way that constitutes copyright infringement, please provide us with the following information:</p>
      <ul className="list-disc list-inside space-y-2 text-[#8a8070]">
        <li>A description of the copyrighted work that you claim has been infringed</li>
        <li>A description of where the material is located on our site</li>
        <li>Your contact information including email address</li>
        <li>A statement that you have a good faith belief that the use is not authorized</li>
        <li>Your electronic or physical signature</li>
      </ul>
      <h2 className="text-[#f0ece4] text-xl font-bold mt-8 mb-3" style={{ fontFamily: "Fraunces, serif" }}>How to Contact Us</h2>
      <p>Send DMCA notices to: <span className="text-[#e8a020]">dmca@topmovieshub.com</span></p>
      <p>We will respond to valid DMCA notices within 48 hours.</p>
    </StaticPage>
  );
}

export function ContactPage() {
  return (
    <StaticPage title="Contact Us">
      <p>Have questions, suggestions, or need to report an issue? We'd love to hear from you.</p>
      <div className="mt-8 bg-[#1a1917] border border-[#2e2b27] rounded-xl p-6 space-y-5">
        <div>
          <label className="block text-[#8a8070] text-xs uppercase tracking-widest font-mono-grotesk mb-2">Name</label>
          <input type="text" className="w-full px-4 py-3 bg-[#0f0e0e] border border-[#2e2b27] rounded-lg text-[#f0ece4] text-sm placeholder:text-[#8a8070] focus:outline-none focus:border-[#e8a020]" placeholder="Your name" />
        </div>
        <div>
          <label className="block text-[#8a8070] text-xs uppercase tracking-widest font-mono-grotesk mb-2">Email</label>
          <input type="email" className="w-full px-4 py-3 bg-[#0f0e0e] border border-[#2e2b27] rounded-lg text-[#f0ece4] text-sm placeholder:text-[#8a8070] focus:outline-none focus:border-[#e8a020]" placeholder="your@email.com" />
        </div>
        <div>
          <label className="block text-[#8a8070] text-xs uppercase tracking-widest font-mono-grotesk mb-2">Subject</label>
          <select className="w-full px-4 py-3 bg-[#0f0e0e] border border-[#2e2b27] rounded-lg text-[#f0ece4] text-sm focus:outline-none focus:border-[#e8a020]">
            <option>General Inquiry</option>
            <option>DMCA / Copyright</option>
            <option>Report a Bug</option>
            <option>Content Request</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="block text-[#8a8070] text-xs uppercase tracking-widest font-mono-grotesk mb-2">Message</label>
          <textarea rows={5} className="w-full px-4 py-3 bg-[#0f0e0e] border border-[#2e2b27] rounded-lg text-[#f0ece4] text-sm placeholder:text-[#8a8070] focus:outline-none focus:border-[#e8a020] resize-none" placeholder="Your message..." />
        </div>
        <button className="px-8 py-3 bg-[#e8a020] text-[#0f0e0e] font-bold text-sm rounded-sm hover:bg-[#f0b030] transition-colors">
          Send Message
        </button>
      </div>
      <div className="mt-8">
        <h2 className="text-[#f0ece4] text-xl font-bold mb-4" style={{ fontFamily: "Fraunces, serif" }}>Other Ways to Reach Us</h2>
        <p>Email: <span className="text-[#e8a020]">contact@topmovieshub.com</span></p>
        <p>For DMCA requests: <span className="text-[#e8a020]">dmca@topmovieshub.com</span></p>
      </div>
    </StaticPage>
  );
}
