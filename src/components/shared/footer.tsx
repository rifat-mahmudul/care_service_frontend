import React from "react";
// import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "FAQ", href: "/faq" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms and Conditions", href: "/terms-and-conditions" },
  ];

  const socialIcons = [
    {
      Icon: Facebook,
      href: "https://www.facebook.com/jetsetcares",
      label: "Facebook",
    },
    {
      Icon: Instagram,
      href: "https://www.instagram.com/jetsetcare?igsh=MXh4ZjBlMGI4NzNpMg==",
      label: "Instagram",
    },
    {
      Icon: Youtube,
      href: "https://youtube.com/@jetsetcares?si=69ookj5sCBgsAWRa",
      label: "Twitter",
    },
  ];

  return (
    <footer className="overflow-hidden bg-[#3ee0cf] pt-16 text-slate-900">
      <div className="container">
        <div className="mb-10 rounded-[32px] border border-white/40 bg-white/25 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm md:p-8">
          <div className="grid gap-10 lg:grid-cols-[1.35fr_0.8fr_1.15fr]">
            <div className="space-y-5">
              {/* <Link href="/" className="inline-flex items-center">
                <Image
                  src="/jetset-logo.webp"
                  alt="JetSet Cares logo"
                  width={1000}
                  height={1000}
                  className="h-[90px] w-[90px] object-cover"
                />
              </Link> */}

              <div className="space-y-3">
                <p className="max-w-sm text-lg font-semibold leading-8 text-slate-900">
                  Built on trust, care, and connection for families navigating
                  life across borders.
                </p>
                <p className="max-w-md text-sm leading-6 text-slate-700">
                  JetSet Cares helps families feel more confident when they need
                  dependable local support, whether they are traveling, living
                  abroad, or settling into a new city.
                </p>
              </div>
            </div>

            <div>
              <h4 className="mb-5 text-lg font-bold text-slate-900">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-slate-800 transition-colors hover:text-slate-950"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5">
              <h4 className="text-lg font-bold text-slate-900">Contact</h4>

              <div className="space-y-4">
                <div className="flex items-start gap-3 rounded-2xl bg-white/35 p-4">
                  <Mail className="mt-0.5 h-5 w-5 text-slate-900" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                      Email
                    </p>
                    <a
                      href="mailto:admin@jetsetcares.org"
                      className="mt-1 block text-sm font-medium text-slate-900 transition-colors hover:text-slate-700"
                    >
                      admin@jetsetcares.org
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-white/35 p-4">
                  <Phone className="mt-0.5 h-5 w-5 text-slate-900" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                      Office Phone
                    </p>
                    <a
                      href="tel:+442046345573"
                      className="mt-1 block text-sm font-medium text-slate-900 transition-colors hover:text-slate-700"
                    >
                      +442046345573
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-white/35 p-4">
                  <MapPin className="mt-0.5 h-5 w-5 text-slate-900" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                      Social
                    </p>
                    <a
                      href="https://www.facebook.com/jetsetcares"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 block text-sm font-medium text-slate-900 transition-colors hover:text-slate-700"
                    >
                      facebook.com/jetsetcares
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <p className="mb-3 text-sm font-semibold text-slate-900">
                  Follow Us
                </p>
                <div className="flex flex-wrap gap-3">
                  {socialIcons.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target={
                        item.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        item.href.startsWith("http") ? "noreferrer" : undefined
                      }
                      aria-label={item.label}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-400/70 bg-white/45 text-slate-800 transition-all hover:-translate-y-0.5 hover:bg-white/70"
                    >
                      <item.Icon size={18} strokeWidth={1.8} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-500/35 py-6 text-center">
          <p className="text-sm text-slate-800">
            @ 2025 Jetset cares. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
