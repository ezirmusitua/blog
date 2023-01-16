import Footer, { FooterHeight } from "components/Layout/Footer";
import "highlight.js/styles/github.css";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";

interface iProps {
  children: React.ReactNode;
}

function RootLayout({ children }: iProps) {
  return (
    <html lang="zh-CN" className="typo">
      <body className="bg-[#e3e3e3]">
        <div style={{ minHeight: `calc(100vh - ${FooterHeight}px)` }}>
          {children}
        </div>
        <Footer></Footer>
      </body>
    </html>
  );
}

export default RootLayout;
