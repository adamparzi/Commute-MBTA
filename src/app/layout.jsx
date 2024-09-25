'use client';

import '@styles/globals.css';

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="bg-zinc-800">
        <div className="main"></div>

        <main className="app">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
