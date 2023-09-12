import config from "config";
import Image from "next/image";
import Link from "next/link";

export const FooterHeight = 96;

function Footer() {
  return (
    <footer
      className="w-full flex justify-center items-center"
      style={{ height: FooterHeight }}
    >
      <div className="flex flex-col items-center">
        <div className="mb-1 flex items-center">
          <Link
            href="/"
            className="mb-0 pr-2 cursor-pointer border-b-0 text-xs leading-[20px] hover:underline"
          >
            {config.site_title}
          </Link>
          <Link href="/rss.xml" className="border-b-0">
            <Image
              alt="订阅 https://ezirmusitua.site 的 RSS 链接"
              src="/icons/icon_rss.png"
              width={14}
              height={14}
            ></Image>
          </Link>
        </div>
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
