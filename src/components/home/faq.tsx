/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqData = [
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
      answer: "Placeholder answer text.",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
      answer: "Placeholder answer text.",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
      answer: "Placeholder answer text.",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
      answer: "Placeholder answer text.",
    },
  ];

  const toggleFaq = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#E9F5FF] py-16 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-[#002B5B] text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[#4A4A4A] text-sm max-w-2xl mx-auto leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="border border-[#72B7FB] bg-white overflow-hidden transition-all duration-300"
            >
              {/* Question Header */}
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center p-4 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="text-[#002B5B] font-medium text-lg">
                  {faq.question}
                </span>

                {/* Icon Circle */}
                <div className="flex-shrink-0 ml-4">
                  {openIndex === index ? (
                    // Minus Icon
                    <div className="w-6 h-6 rounded-full bg-[#007BFF] flex items-center justify-center">
                      <div className="w-3 h-0.5 bg-white"></div>
                    </div>
                  ) : (
                    // Plus Icon
                    <div className="w-6 h-6 rounded-full bg-[#007BFF] flex items-center justify-center relative">
                      <div className="w-3 h-0.5 bg-white"></div>
                      <div className="w-0.5 h-3 bg-white absolute"></div>
                    </div>
                  )}
                </div>
              </button>

              {/* Answer Body */}
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-4 pt-0 text-[#666666] text-sm leading-relaxed border-t border-[#72B7FB]/30">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
