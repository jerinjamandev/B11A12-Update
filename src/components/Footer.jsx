import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";
import logo from '../assets/image/logo.png';
const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-10 pt-10 pb-4">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
         <img src={logo} width={150} height={250} alt="" />
          <p className="text-sm">
            A place to connect, share, and grow with the developer community. Dive into discussions and stay updated.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="link link-hover">Home</Link></li>
            <li><Link to="/membership" className="link link-hover">Membership</Link></li>
            <li><Link to="/login" className="link link-hover">Join Us</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold mb-3">Resources</h3>
          <ul className="space-y-2">
            <li><a href="#" className="link link-hover">Documentation</a></li>
            <li><a href="#" className="link link-hover">Community Guidelines</a></li>
            <li><a href="#" className="link link-hover">Support</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-xl hover:text-blue-600"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-xl hover:text-sky-500"><FaTwitter /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-xl hover:text-blue-700"><FaLinkedinIn /></a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-xl hover:text-gray-800"><FaGithub /></a>
          </div>
        </div>

      </div>

      <div className="text-center mt-10 border-t pt-4 text-sm text-gray-500">
        © {new Date().getFullYear()} TalkNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
