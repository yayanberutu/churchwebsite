// src/components/Footer/Footer.jsx

const Footer = ({ churchName }) => {
  return (
    <footer className="bg-surface-container-low w-full py-16 border-t border-outline-variant/15">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <a href="/" className="text-xl font-bold text-primary font-headline mb-4 block">
            {churchName || "HKBP Kernolong"}
          </a>
          <p className="font-body text-sm leading-relaxed text-on-surface-variant max-w-xs">
            © 2024 {churchName || "HKBP Kernolong"}. The Reverent Echo: Bridging Tradition and Clarity.
          </p>
        </div>
        <div className="flex flex-col md:items-end gap-4">
          <div className="flex gap-6 flex-wrap md:justify-end">
            <a href="#" className="text-on-surface-variant font-body text-sm hover:text-primary underline decoration-primary/30 transition-all">Privacy Policy</a>
            <a href="#" className="text-on-surface-variant font-body text-sm hover:text-primary underline decoration-primary/30 transition-all">Church Locations</a>
            <a href="#" className="text-on-surface-variant font-body text-sm hover:text-primary underline decoration-primary/30 transition-all">Ministries</a>
            <a href="#" className="text-on-surface-variant font-body text-sm hover:text-primary underline decoration-primary/30 transition-all">Archive</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
