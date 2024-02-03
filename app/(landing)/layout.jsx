'use client';

import { Navbar } from './_components/navbar';

const LandingLayout = ({ children }) => {
  return (
    <div className="h-full">
      <Navbar />
      <main className="h-full pt-40">{children}</main>
    </div>
  );
};

export default LandingLayout;
