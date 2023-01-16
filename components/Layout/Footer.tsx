import config from "config";

export const FooterHeight = 96;

function Footer() {
  return (
    <footer
      className="w-full flex justify-center items-center"
      style={{ height: FooterHeight }}
    >
      <div className="flex flex-col items-center">
        <a href="/" className="mb-1 text-xs leading-[48px] hover:underline border-b-0 cursor-pointer">
          {config.site_title}
        </a>
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noreferrer"
          className="text-xs leading-[48px] hover:underline border-b-0 cursor-pointer"
        >
          {config.site_beian}
        </a>
      </div>
    </footer>
  );
}

export default Footer;
