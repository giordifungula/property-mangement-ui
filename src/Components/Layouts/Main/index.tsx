import React from 'react';
import Footer from 'Components/Layouts/Footer';
import { AnimatePresence } from 'framer-motion';
import Header from '../Header';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <AnimatePresence>
      <div className="bg-secondary-light dark:bg-primary-dark transition duration-100">
        <Header />
        <main>
          <div>{children}</div>
        </main>
        <Footer />
      </div>
    </AnimatePresence>
  );
};

export default Layout;
