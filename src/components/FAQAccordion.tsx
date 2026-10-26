import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS, FAQItem } from '../data/clinicData';

export const FAQAccordion: React.FC<{
  items?: FAQItem[];
  showCategoryFilter?: boolean;
}> = ({ items = FAQ_ITEMS, showCategoryFilter = false }) => {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Appointments & Timings',
    'Orthodontics & Braces',
    'Location & Fees',
    'General Care',
  ];

  const displayedItems =
    showCategoryFilter && selectedCategory !== 'All'
      ? items.filter((item) => item.category === selectedCategory)
      : items;

  return (
    <div>
      {showCategoryFilter && (
        <div
          role="group"
          aria-label="Filter FAQs by category"
          className="flex flex-wrap items-center gap-1.5 mb-6"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#16324F] text-white'
                  : 'bg-white border border-[#E4EAF0] text-[#667582] hover:text-[#172B3A]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="divide-y divide-[#E4EAF0] border border-[#E4EAF0] rounded-xl bg-white overflow-hidden">
        {displayedItems.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div key={faq.id} className="p-5 md:p-6">
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full flex items-start justify-between gap-4 text-left cursor-pointer group"
                >
                  <div>
                    <span className="text-xs text-[#167D83] font-medium block mb-1">
                      {faq.category}
                    </span>
                    <span className="text-sm md:text-base font-bold text-[#16324F] group-hover:text-[#167D83] transition-colors">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#667582] shrink-0 mt-1 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#167D83]' : ''
                    }`}
                  />
                </button>
              </h3>
              {isOpen && (
                <div className="mt-3 text-sm text-[#667582] leading-relaxed pr-6">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
