

import Image from 'next/image'

export const Header = () => {
  return (
    <header className="flex items-center justify-between p-5 bg-gradient-to-r from-green-400 to-emerald-100  transition-all duration-300 shadow-inner rounded-t-xl">
      <div className="logo">
        <Image src="/logo/logo.png" width={36} height={16} alt="Company Logo" />
      </div>
      <nav className="nav flex items-center">
        <ul className="flex flex-col md:flex-row gap-5 space-x-6 md:space-x-0 md:space-y-0">
          <li className="nav-item">
            <a href="/home" className="nav-link text-green-800 font-bold hover:text-pink-600 transition-colors duration-300">Home</a>
          </li>
          <li className="nav-item">
            <a href="/about" className="nav-link text-green-800 font-bold hover:text-pink-600 transition-colors duration-300">About</a>
          </li>
          <li className="nav-item">
            <a href="/login" className="nav-link text-green-800 font-bold hover:text-pink-600 transition-colors duration-300">Services</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-green-800 font-bold hover:text-pink-600 transition-colors duration-300">Contact</a>
          </li>
        </ul>
      </nav>
      <div className="cta">
        <a href="/signup" className="button-3d bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-5 rounded-lg shadow-md transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg font-bold">Get Started</a>
      </div>
    </header>
  );
};
