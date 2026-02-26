import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const ServiceDetails = () => {
  const ageGroups = ["0-11 Months", "1-3 Years", "4-7 Years", "8-11 Years", "12+ Years"];
  const helpItems = ["Child care", "Craft assistance", "Groceries/errands", "Help with pets", "Meal prep", "Organizing/laundry", "Swimming supervision"];

  return (
    <div className="container text-[#1a1a1a] pb-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Left & Center Column */}
        <div className="md:col-span-2 space-y-10">
          {/* Services */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Services</h2>
            <h3 className="text-sm font-semibold mb-3">Age groups</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {ageGroups.map((group, i) => (
                <span key={i} className={`px-4 py-2 rounded-full border text-sm ${i === 0 ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-blue-600 text-blue-600'}`}>
                  {group}
                </span>
              ))}
            </div>
            
            <h3 className="text-sm font-semibold mb-3">Rates</h3>
            <div className="space-y-2 max-w-xs text-sm">
              <div className="flex justify-between"><span>Recurring jobs</span><span className="font-medium">$10</span></div>
              <div className="flex justify-between"><span>1 child</span><span className="font-medium">$10</span></div>
              <div className="flex justify-between"><span>2 children</span><span className="font-medium">$200</span></div>
              <div className="flex justify-between"><span>3 children</span><span className="font-medium">$250</span></div>
            </div>
          </section>

          {/* Qualifications */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Qualifications</h2>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-semibold mb-2">Education</h3>
                <p className="text-sm text-gray-700">Shannon College of Hotel Management</p>
                <p className="text-sm text-gray-500">Associate degree</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2">Professional skills</h3>
                <p className="text-sm text-gray-700 italic">Message Caroline to get details about their experience.</p>
                <p className="text-sm text-gray-500">Associate degree</p>
              </div>
            </div>
          </section>

          {/* Availability */}
          <section>
            <h2 className="text-xl font-bold mb-4">Contact Caroline to check their availability</h2>
            <div className="space-y-3">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="flex gap-20 text-sm">
                  <span className="font-semibold w-8">Sun</span>
                  <span className="text-gray-700">11:00 AM–11:00 PM</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Help Items */}
        <div className="pt-2">
          <h3 className="text-sm font-semibold mb-4">Can help with</h3>
          <ul className="space-y-3">
            {helpItems.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                <CheckCircle2 size={18} className="text-gray-800" strokeWidth={1.5} />
                {item}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

