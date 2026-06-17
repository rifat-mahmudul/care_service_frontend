import React from "react";
import { Facebook, Linkedin, Twitter, Instagram } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const usefulLinks = [
    { name: "Explore Freelancers", href: "#" },
    { name: "About Us", href: "#" },
    { name: "Blogs", href: "#" },
  ];

  const otherLinks = [
    { name: "Contact Us", href: "#" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms Of Service", href: "#" },
  ];

  const socialIcons = [
    { Icon: Facebook, href: "#" },
    { Icon: Linkedin, href: "#" },
    { Icon: Twitter, href: "#" },
    { Icon: Instagram, href: "#" },
  ];

  return (
    <footer className="bg-[#3ee0cf] text-slate-900 pt-16 pb-8 font-sans">
      <div className="container">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Logo & Tagline */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              {/* Replace with your actual logo image */}
              {/* <Link href={`/`}>
                <div className="w-52 h-52">
                  <Image
                    src="/jetset-logo.webp"
                    alt="Jet Set Care Logo"
                    width={1000}
                    height={1000}
                    className="w-full h-full object-contain"
                  />
                </div>
              </Link> */}
            </div>
            <div className="space-y-2">
              <p className="text-slate-800 text-sm md:text-base">
                Built on trust, care, and connection
              </p>
              <p className="text-slate-800 text-sm md:text-base">
                <span className="font-semibold">Email:</span>{" "}
                admin@jetsetcares.org
              </p>
            </div>
          </div>

          {/* Column 2: Useful Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-slate-900">
              Useful Links
            </h4>
            <ul className="space-y-4">
              {usefulLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-800 hover:text-slate-900 text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Other Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-slate-900">
              Other Links
            </h4>
            <ul className="space-y-4">
              {otherLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-800 hover:text-slate-900 text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Follow Us */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-slate-900">Follow Us</h4>
            <div className="flex gap-4">
              {socialIcons.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="w-10 h-10 rounded-full border border-slate-400 flex items-center justify-center hover:bg-white/20 transition-all text-slate-800"
                >
                  <item.Icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-400 pt-8 text-center">
          <p className="text-slate-800 text-sm">
            @ 2025 Jetset cares. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
