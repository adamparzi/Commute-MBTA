// Wraps all page.js files. 

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Commute MBTA",
  description: "Determine the best time to leave for public transit in Boston at a glance.",
};

export default function RootLayout({ children }) {
  const header = (
      <header>
        <h1>Commute MBTA</h1>
      </header>
  )

  const footer = (
    <footer>
      footer
    </footer>
  )

  return (

    <html lang="en">
      <body className={ 'w-full max-w-[10000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col' + inter.className}>
        {header}
        {children}
        {footer}
      </body>
    </html>
  );

  
}
