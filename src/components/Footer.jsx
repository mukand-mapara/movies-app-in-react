import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-400 pt-12 pb-6 mt-10">
      <div className="container mx-auto px-6">
        {/* Top Grid Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div>
            <h3 className="text-white font-semibold mb-3">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Features</a></li>
              <li><a href="#" className="hover:text-white">Works</a></li>
              <li><a href="#" className="hover:text-white">Career</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Help</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Customer Support</a></li>
              <li><a href="#" className="hover:text-white">Delivery Details</a></li>
              <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Free eBooks</a></li>
              <li><a href="#" className="hover:text-white">Development Tutorial</a></li>
              <li><a href="#" className="hover:text-white">How to - Blog</a></li>
              <li><a href="#" className="hover:text-white">YouTube Playlist</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Extra Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Customer Support</a></li>
              <li><a href="#" className="hover:text-white">Delivery Details</a></li>
              <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <hr className="border-neutral-700 my-6" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-lg text-center md:text-left mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} <span className="text-white font-semibold">Movieo</span>. All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-2xl">
            <a href="https://github.com/mukand-mapara" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/mukand-kirshana/" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaLinkedin /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
