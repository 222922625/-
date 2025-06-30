import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WakatimeFooter from "./components/WakatimeFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "韩瑞的课程成果展示",
  description: "创作者新闻学2班 韩瑞的课程成果展示",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <head>
        <script 
          src="https://ai.youdao.com/saas/qanything/js/agent-iframe-min.js" 
          id="qanything-iframe" 
          data-agent-src="https://ai.youdao.com/saas/qanything/#/bots/A4D8EDAC2CFE4D0E/share" 
          data-default-open="false" 
          data-drag="false" 
          data-open-icon="https://download.ydstatic.com/ead/icon-qanything-iframe-btn.png" 
          data-close-icon="https://download.ydstatic.com/ead/icon-qanything-iframe-btn.png" 
          defer 
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <main className="flex-grow">
          {children}
        </main>
        <WakatimeFooter />
      </body>
    </html>
  );
}
