// src/components/Footer/Footer.jsx

const Footer = ({ churchName }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="w-full border-t border-outline-variant/15 bg-surface-container-low py-10 md:py-12">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-5 md:grid-cols-2 md:px-8">
        <div>
          <a href="/" className="mb-3 block rounded-lg font-headline text-xl font-bold text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
            {churchName || "HKBP Kernolong"}
          </a>
          <p className="max-w-sm font-body text-sm leading-6 text-on-surface-variant">
            © {currentYear} {churchName || "HKBP Kernolong"}. Melayani dalam iman, harapan, dan kasih.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm leading-6 text-on-surface-variant md:items-end md:text-right">
          <p>Website resmi jemaat {churchName || "HKBP Kernolong"}.</p>
          <p>Informasi ibadah, pelayanan, pengumuman, dan dokumentasi kegiatan gereja.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
