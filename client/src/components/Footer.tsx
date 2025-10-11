import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-sm border-t border-gray-200 py-3">
      <div className="max-w-xl mx-auto text-sm text-gray-600 text-center">
        <span>Create By : </span>
        <span className="font-semibold text-pink-600">Kittiphat Phengnamkham</span>
      </div>
    </footer>
  );
};

export default Footer;
