import config from "config";

export const FooterHeight = 96;

function Footer() {
  return (
    <footer
      className="w-full flex justify-center items-center"
      style={{ height: FooterHeight }}
    >
      <div className="flex flex-col items-center">
        <a
          href="/"
          className="mb-1 border-b-0 cursor-pointer text-xs leading-[20px] hover:underline "
        >
          {config.site_title}
        </a>
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noreferrer"
          className="border-b-0 cursor-pointer text-xs pt-[12px] pb-[24px] hover:underline "
        >
          {config.site_beian}
        </a>
      </div>
    </footer>
  );
}

export default Footer;
