'use client';

import Marquee from 'react-fast-marquee';
import Image from 'next/image';

interface Service {
  id: string;
  name: string;
  textColor: string;
  imageUrl: string;
  alt: string;
}

const topRowServices: Service[] = [
  { 
    id: '1', 
    name: 'Urgent cleaning help', 
    textColor: '#8B6F47',
    imageUrl: '/marque/urgent.jpg',
    alt: 'Cleaning Service'
  },
  { 
    id: '2', 
    name: 'Full daycares', 
    textColor: '#0066CC',
    imageUrl: '/marque/urgent.jpg',
    alt: 'Daycare Service'
  },
  { 
    id: '3', 
    name: 'Classes & Campsites', 
    textColor: '#333333',
    imageUrl: '/marque/urgent.jpg',
    alt: 'Classes & Camps'
  },
  { 
    id: '4', 
    name: 'Infant & Newborn Care', 
    textColor: '#17A2B8',
    imageUrl: '/marque/urgent.jpg',
    alt: 'Infant Care'
  },
  { 
    id: '5', 
    name: 'Private Tutoring', 
    textColor: '#8B6F47',
    imageUrl: '/marque/urgent.jpg',
    alt: 'Tutoring Service'
  },
  { 
    id: '6', 
    name: 'Pet Care Services', 
    textColor: '#0066CC',
    imageUrl: '/marque/urgent.jpg',
    alt: 'Pet Care'
  },
];

const bottomRowServices: Service[] = [
  { 
    id: '7', 
    name: 'Instructors', 
    textColor: '#17A2B8',
    imageUrl: '/marque/urgent.jpg',
    alt: 'Instructors'
  },
  { 
    id: '8', 
    name: 'Elder Companions', 
    textColor: '#17A2B8',
    imageUrl: '/marque/urgent.jpg',
    alt: 'Elder Care'
  },
  { 
    id: '9', 
    name: 'Care for Adults', 
    textColor: '#0066CC',
    imageUrl: '/marque/urgent.jpg',
    alt: 'Adult Care'
  },
  { 
    id: '10', 
    name: 'Memory Care', 
    textColor: '#17A2B8',
    imageUrl: '/marque/urgent.jpg',
    alt: 'Memory Care'
  },
  { 
    id: '11', 
    name: 'Toddler Caregiver', 
    textColor: '#8B6F47',
    imageUrl: '/marque/urgent.jpg',
    alt: 'Toddler Care'
  },
  { 
    id: '12', 
    name: 'Home Nursing', 
    textColor: '#0066CC',
    imageUrl: '/marque/urgent.jpg',
    alt: 'Home Nursing'
  },
  { 
    id: '13', 
    name: 'Therapy Services', 
    textColor: '#17A2B8',
    imageUrl: '/marque/urgent.jpg',
    alt: 'Therapy'
  },
  { 
    id: '14', 
    name: 'Meal Preparation', 
    textColor: '#8B6F47',
    imageUrl: '/marque/urgent.jpg',
    alt: 'Meal Preparation'
  },
];

function ServiceCard({ name, textColor, imageUrl, alt }: Service) {
  return (
    <div className="flex items-center gap-3 min-w-max px-4 sm:px-6 py-2 sm:py-3 bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 mx-2 sm:mx-3 border border-gray-100">
      <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl overflow-hidden flex-shrink-0">
        <Image
          src={imageUrl}
          alt={alt}
          fill
          sizes="(max-width: 1000px) 40px, (max-width: 1000px) 48px, 56px"
          className="object-cover h-[40px] w-[48px]"
        />
      </div>
      <span 
        style={{ color: textColor }} 
        className="text-xs sm:text-sm md:text-base font-medium whitespace-nowrap"
      >
        {name}
      </span>
    </div>
  );
}

export default function MarqueeSection() {
  return (
    <div className="w-full space-y-3 sm:space-y-4 md:space-y-6 overflow-hidden">
      {/* Top Row - LTR (Left to Right) */}
      <div className="relative">
        <Marquee 
          pauseOnHover={true} 
          speed={40} 
          gradient={true}
          gradientColor="#ffffff"
          gradientWidth={80}
          direction="left" // Changed to left for LTR
        >
          {topRowServices.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </Marquee>
        <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      </div>

      {/* Bottom Row - RTL (Right to Left) */}
      <div className="relative">
        <Marquee 
          pauseOnHover={true} 
          speed={40} 
          gradient={true}
          gradientColor="#ffffff"
          gradientWidth={80}
          direction="right" // Changed to right for RTL
        >
          {bottomRowServices.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </Marquee>
        <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      </div>
    </div>
  );
}