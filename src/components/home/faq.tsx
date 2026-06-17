"use client";

import React, { useState } from "react";

const faqGroups = [
  {
    category: "General Questions",
    items: [
      {
        question: "What is JetSet Cares?",
        answer:
          "JetSet Cares is a trusted care platform built for families traveling, living, working, and raising children across Asia.\n\nWe help families connect with local childcare partners, pet care partners, and selected home support partners in cities where reliable help can be difficult to find. JetSet is childcare first, with trust, safety, warmth, and professionalism at the center of everything we build.\n\nJetSet's core strategy has always been to become the trusted childcare platform in Asia, not just another broad services marketplace.",
      },
      {
        question: "Who is JetSet Cares for?",
        answer:
          "JetSet Cares is for families traveling with children, expat families living abroad, digital nomad parents, hotel stay families, families relocating to a new city, LGBTQ+ families looking for affirming care, families with pets, and parents who need trusted local support in unfamiliar places.",
      },
      {
        question: "Where is JetSet Cares available?",
        answer:
          "JetSet Cares is launching city by city across Asia. Some cities may open first with childcare, while others may be marked as coming soon until enough qualified partners are approved.\n\nOur goal is not to list cities before they are ready. A city is considered truly live when families can open JetSet and feel there are trusted, professional, and responsive partners available.",
      },
      {
        question: "Is JetSet Cares a childcare agency?",
        answer:
          "No. JetSet Cares is a platform that helps families discover and connect with independent partners.\n\nPartners are not employees of JetSet Cares. Families are responsible for reviewing profiles, communicating with partners, asking questions, and deciding who they feel comfortable booking.",
      },
      {
        question:
          "Why should families use JetSet instead of finding someone in a Facebook group?",
        answer:
          "Because JetSet is designed to make the process calmer, clearer, and more professional.\n\nInstead of searching through random posts, families can view partner profiles, badges, service areas, experience, languages, photos, availability, reviews, and verification status in one place.\n\nThe goal is to reduce anxiety for parents in unfamiliar cities, which is the emotional heart of the platform.",
      },
    ],
  },
  {
    category: "Family Questions",
    items: [
      {
        question: "How do families sign up?",
        answer:
          "Families can create an account, choose their city, browse available partners, and message or book directly through the JetSet platform.\n\nFamily accounts should be accepted automatically after sign up unless there is a security, payment, or account concern.",
      },
      {
        question: "Do families need to be approved before using JetSet?",
        answer:
          "No. Families should be able to sign up and access the platform right away.\n\nHowever, JetSet may review or restrict accounts that appear fraudulent, unsafe, abusive, or in violation of our Terms and Conditions.",
      },
      {
        question: "Can I message a partner before booking?",
        answer:
          "Yes. Families should be able to message partners before confirming a booking.\n\nThis is important because parents may want to ask about experience, languages spoken, comfort with specific ages, hotel care, pets, special needs, LGBTQ+ affirming care, or other family needs.",
      },
      {
        question: "Can I book childcare at a hotel?",
        answer:
          "Yes. JetSet is designed for families who may need care in hotels, serviced apartments, homes, condos, or travel settings.\n\nFamilies should clearly tell the partner the care location, hotel name if applicable, number of children, children's ages, start time, end time, and any special instructions.",
      },
      {
        question: "Can I book care for a baby or toddler?",
        answer:
          "Yes, if the partner offers infant or toddler care.\n\nFamilies should carefully review the partner's profile and badges to confirm experience with the child's age group.",
      },
      {
        question: "Can I book special needs care?",
        answer:
          "Yes, if the partner lists special needs experience or a related badge.\n\nFamilies should message the partner first and explain the child's needs clearly before booking.",
      },
      {
        question: "Can LGBTQ+ families use JetSet?",
        answer:
          "Yes. JetSet Cares is built to be welcoming to LGBTQ+ families.\n\nPartners may be able to earn an LGBTQ+ Affirming badge as part of the JetSet badge system. This badge is intended to help families identify partners who understand the importance of respectful, affirming care.",
      },
      {
        question: "Can I book pet care?",
        answer:
          "Yes. Pet Care is part of the initial JetSet launch structure.\n\nPet care may include services such as pet sitting, drop ins, feeding, walking, or basic care depending on the city and partner.",
      },
      {
        question: "Can I book home repair or yard help?",
        answer:
          "Home Repair is planned as a controlled rollout category, including selected services such as plumbers, remodelers, painters, and yard workers.\n\nThis category may not be available in every launch city right away.",
      },
    ],
  },
  {
    category: "Safety and Trust",
    items: [
      {
        question: "Are partners verified?",
        answer:
          "JetSet reviews partners before their profiles become live.\n\nPartners may be asked to provide identification, profile details, work experience, references, location information, and other information needed for review.",
      },
      {
        question: "Does JetSet run background checks?",
        answer:
          "Where available and legally permitted, JetSet may use identity verification, document review, reference checks, badge review, and other trust signals.\n\nBecause laws and verification tools vary by country, families should always use their own judgment, ask questions, and choose the partner they feel comfortable with.",
      },
      {
        question: "Are partners manually reviewed?",
        answer:
          "Yes. Partners should go through manual review before becoming live on the platform.\n\nJetSet's ambassador and partner standards make clear that the goal is not to collect random names, but to find warm, reliable, professional people who families would feel good trusting.",
      },
      {
        question: "What does it mean if a partner is not approved yet?",
        answer:
          "It means their account may exist, but their profile is not live for family bookings yet.\n\nPartners should still be able to log in, complete their profile, upload requested information, and check their status.",
      },
      {
        question: "What should I ask a childcare partner before booking?",
        answer:
          "Helpful questions include:\nWhat ages do you have experience caring for?\nDo you speak my child's language?\nHave you cared for children in hotels or travel settings?\nAre you comfortable with bedtime, meals, diapers, bottles, swimming supervision, or multiple children?\nDo you have first aid or CPR training?\nAre you comfortable with pets in the home?\nHave you worked with LGBTQ+ families, neurodivergent children, or children with special needs?",
      },
      {
        question: "What if I feel uncomfortable with a partner?",
        answer:
          "Do not book them.\n\nFamilies should only book someone they feel safe and comfortable with. If something feels wrong before, during, or after a booking, contact JetSet support.",
      },
      {
        question: "What happens if there is a serious safety concern?",
        answer:
          "Families should contact local emergency services first if anyone is in immediate danger.\n\nAfter that, report the issue to JetSet support so the account can be reviewed.",
      },
    ],
  },
  {
    category: "Partner Questions",
    items: [
      {
        question: "How do I become a JetSet partner?",
        answer:
          "You can apply through the Become a Partner page.\n\nYou will be asked to create a profile, choose your service category, select your country and city, list your experience, upload identification if required, add photos, choose your languages, and complete any required review steps.",
      },
      {
        question: "Can anyone become a partner?",
        answer:
          "No. JetSet reviews partners to maintain platform quality and trust.\n\nPartners should be warm, professional, reliable, responsive, and honest about their experience.",
      },
      {
        question: "Can partners log in before they are approved?",
        answer:
          "Yes. Partners should always be able to log in.\n\nIf a partner is still under review, their account may not be visible to families yet, but they should still be able to complete their onboarding steps.",
      },
      {
        question: "Do partners have to upload identification?",
        answer:
          "Yes, partners may be required to upload identification as part of the review process.\n\nThis helps JetSet maintain trust and platform safety.",
      },
      {
        question: "Can partners choose which city they want to work in?",
        answer:
          "Yes. Partners should be able to list their country of origin, current country, current city, the city where they want to offer services, languages they speak, and whether they are a local or an expat.\n\nThis helps families understand the partner's background and language strengths.",
      },
      {
        question: "Can partners offer more than one service?",
        answer:
          "Yes, if they are qualified.\n\nFor example, someone may offer childcare and pet care, but each service should be listed honestly and reviewed properly.",
      },
      {
        question: "Can JetSet guarantee bookings or income?",
        answer:
          "No. JetSet does not guarantee approval, bookings, income, or repeat clients.\n\nThe ambassador guidance is clear that no one should promise providers approval, guaranteed bookings, or income before JetSet has officially confirmed anything.",
      },
      {
        question: "What makes a strong JetSet partner profile?",
        answer:
          "A strong profile includes clear photos, a warm introduction, relevant experience, languages spoken, service areas, age groups served, availability, certifications or training, badges earned, references if requested, fast response time, and professional communication.",
      },
      {
        question: "What are JetSet badges?",
        answer:
          "Badges help families quickly understand a partner's experience, training, and specialties.\n\nExamples may include infant care, special needs care, hotel babysitting, pet care, language skills, LGBTQ+ Affirming, first aid, or other specialty badges.",
      },
      {
        question: "Can a partner lose access to JetSet?",
        answer:
          "Yes. JetSet may remove, pause, or restrict a partner account for safety concerns, dishonesty, repeated cancellations, poor conduct, fake documents, harassment, off platform booking violations, or other violations of JetSet policies.",
      },
    ],
  },
  {
    category: "Booking and Payment Questions",
    items: [
      {
        question: "How do payments work?",
        answer:
          "Payments should be made through the JetSet platform.\n\nThis keeps the booking record clear and helps protect both families and partners.",
      },
      {
        question: "Can I pay a partner directly in cash?",
        answer:
          "No. Bookings and payments should stay on the JetSet platform.\n\nThis protects the family, the partner, and the integrity of the platform.",
      },
      {
        question: "What payment processor does JetSet use?",
        answer:
          "JetSet is designed to use Stripe and Stripe Connect for online payments and partner payouts.",
      },
      {
        question: "What is the JetSet Cares Starter Membership?",
        answer:
          "The JetSet Cares Starter Membership begins at $24.99 per month.\n\nThis membership is designed for families who want access to trusted childcare and pet care partners, lower booking fees, member benefits, and a smoother experience when finding care in unfamiliar cities.\n\nAnnual Membership: $249.99 per year",
      },
      {
        question: "Why become a member?",
        answer:
          "Members receive lower booking fees and may receive access to premium features, loyalty benefits, badges, or early access perks as the platform grows.",
      },
      {
        question: "Can I use JetSet without a membership?",
        answer:
          "Yes. Families can book without a membership, but non members pay a higher platform fee.",
      },
      {
        question: "Are refunds available?",
        answer:
          "Refunds depend on the booking details, cancellation timing, partner policy, and JetSet's refund rules.\n\nFamilies should review the cancellation policy before booking.",
      },
    ],
  },
  {
    category: "Care Categories",
    items: [
      {
        question: "What childcare services are available?",
        answer:
          "Childcare may include hotel babysitting, date night care, weekend care, infant care, toddler care, school age care, special needs care, LGBTQ+ affirming care, homeschool or learning support, travel family support, and emergency or short notice care when available.",
      },
      {
        question: "What pet care services are available?",
        answer:
          "Pet care may include pet sitting, dog walking, feeding visits, cat care, hotel pet support, basic pet companionship, and short term travel pet care.\n\nAvailability depends on the city and approved partners.",
      },
    ],
  },
];

const Faq = () => {
  const [openKey, setOpenKey] = useState("General Questions-0");

  const toggleFaq = (key: string) => {
    setOpenKey(openKey === key ? "" : key);
  };

  return (
    <section className="bg-[#E9F5FF] py-16 font-sans">
      <div className="container max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-[#002B5B]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-10">
          {faqGroups.map((group) => (
            <div key={group.category}>
              <h3 className="mb-4 text-2xl font-semibold text-[#002B5B]">
                {group.category}
              </h3>

              <div className="space-y-4">
                {group.items.map((faq, index) => {
                  const key = `${group.category}-${index}`;
                  const isOpen = openKey === key;

                  return (
                    <div
                      key={key}
                      className="overflow-hidden border border-[#72B7FB] bg-white transition-all duration-300"
                    >
                      <button
                        onClick={() => toggleFaq(key)}
                        className="flex w-full items-center justify-between gap-4 p-4 text-left transition-colors hover:bg-slate-50"
                      >
                        <span className="text-base font-medium leading-6 text-[#002B5B] md:text-lg">
                          {faq.question}
                        </span>

                        <div className="ml-2 flex-shrink-0">
                          {isOpen ? (
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#007BFF]">
                              <div className="h-0.5 w-3 bg-white" />
                            </div>
                          ) : (
                            <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-[#007BFF]">
                              <div className="h-0.5 w-3 bg-white" />
                              <div className="absolute h-3 w-0.5 bg-white" />
                            </div>
                          )}
                        </div>
                      </button>

                      <div
                        className={`transition-all duration-300 ease-in-out ${
                          isOpen
                            ? "max-h-[700px] opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="whitespace-pre-line border-t border-[#72B7FB]/30 px-4 pb-4 pt-3 text-sm leading-relaxed text-[#666666]">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
