import React from "react";
import { NavLink } from "react-router-dom";
const Footer = () => {
  return (
    <section className="w-full mt-20 text-white">
  <div className="footerInner pt-15 pb-5 bg-gray-950 flex flex-col md:flex-row md:justify-between px-5 md:px-10 gap-10 md:gap-0">
    <div className="w-full md:w-1/4">
      <h1 className="text-[30px] font-bold">Nyandesk</h1>
      <p className="pt-5">
        Your AI-powered partner for smarter career growth. Optimize resumes,
        prepare for interviews, and plan your future with confidence.
      </p>
    </div>
    <div className="flex flex-col gap-1.5">
      <h3 className="text-[18px] font-bold mb-5">Quick Links</h3>
      <p>
        <NavLink to="/">Home</NavLink>
      </p>
      <p>
        <NavLink to="/">How It Works</NavLink>
      </p>
      <p>
        <NavLink to="/">Pricing</NavLink>
      </p>
      <p>
        <NavLink to="/">About</NavLink>
      </p>
      <p>
        <NavLink to="/">Contact</NavLink>
      </p>
    </div>
    <div className="flex flex-col gap-1.5">
      <h3 className="text-[18px] font-bold mb-5">Legal</h3>
      <p>
        <NavLink to="">Privacy Policy</NavLink>
      </p>
      <p>
        <NavLink to="">Terms of Service</NavLink>
      </p>
      <p>
        <NavLink to="">Cookie Policy</NavLink>
      </p>
    </div>
    <div className="flex flex-col gap-1.5">
      <h3 className="text-[18px] font-bold mb-5">Contact</h3>
      <p>Email: pranitworkspace@gmail.com</p>
      <p>Phone: +91 0000000000</p>
      <p>Address: Pune, Maharashtra, India</p>
    </div>
  </div>
  <div className="copyright w-full text-center py-5 bg-black">
    <p>© 2025 All Rights Reserved | Designed & Developed with 🤍 by Pranit Daphale</p>
  </div>
</section>

  );
};

export default Footer;
