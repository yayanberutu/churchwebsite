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
        <div className="flex flex-col md:items-end gap-2 text-sm text-on-surface-variant">
          <p>Jl. Kramat IV, Jakarta Pusat</p>
          <p>Melayani dalam iman, harapan, dan kasih.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
