import React, { useEffect, useState } from "react";
import { toast } from "sonner";


const formatPrice = (price, vat) => {
  return (price * (1 + vat / 100)).toFixed(2);
};

export default function ChooseSkipPage() {
  const [skips, setSkips] = useState([]);
  const [selectedSkipId, setSelectedSkipId] = useState(null);

  useEffect(() => {
    fetch(
      "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
    )
      .then((res) => res.json())
      .then((data) => setSkips(data));
  }, []);

  const selectedSkip = skips.find((skip) => skip.id === selectedSkipId);

  const handleContinue = () => {
    toast.success(`You selected the ${selectedSkip.size} Yard Skip!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-10">Choose Your Skip Size</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {skips.map((skip) => (
          <div
            key={skip.id}
            onClick={() =>
              setSelectedSkipId((prevId) => (prevId === skip.id ? null : skip.id))
            }
            className={`group relative rounded-lg border-2 p-4 md:p-6 transition-all cursor-pointer ${
              selectedSkipId === skip.id
                ? "border-[#0037C1] bg-[#0037C1]/10 text-white"
                : "border-gray-200 bg-white text-black"
            }`}
          >
            {selectedSkipId === skip.id && (
              <div className="absolute top-3 right-3 md:top-4 md:right-4 text-[#0037C1]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide-check w-5 h-5 md:w-6 md:h-6"
                >
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
              </div>
            )}

            <div>
              <h2 className="text-xl font-semibold mb-2">{skip.size} Yard Skip</h2>
              <p className="text-lg mb-1">
                £{formatPrice(skip.price_before_vat, skip.vat)}
              </p>
              <p className="text-sm mb-3">{skip.hire_period_days} days hire</p>

              <div className="flex flex-wrap gap-2 mb-4">
                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    skip.allowed_on_road
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {skip.allowed_on_road ? "Allowed on road" : "Not allowed on road"}
                </span>
                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    skip.allows_heavy_waste
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {skip.allows_heavy_waste
                    ? "Heavy waste allowed"
                    : "Light waste only"}
                </span>
              </div>
            </div>

            <button
              className={`mt-4 py-2 rounded-md w-full ${
                selectedSkipId === skip.id ? "bg-[#0037C1] text-white" : "bg-black text-white"
              }`}
            >
              {selectedSkipId === skip.id ? "Selected" : "Choose this skip"}
            </button>
          </div>
        ))}
      </div>

      {selectedSkip && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#1C1C1C] border-t border-[#2A2A2A] p-4 animate-slideUp z-50">
          <div className="max-w-7xl mx-auto">
            <div className="mb-3 text-xs text-gray-400 text-center leading-snug">
              Imagery and information shown throughout this website may not reflect the exact shape or size specification, colours may vary, options and/or accessories may be featured at additional cost.
            </div>
            {/* Mobile */}
            <div className="lg:hidden">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">{selectedSkip.size} Yard Skip</h3>
                <div>
                  <span className="text-xl font-bold text-[#0037C1]">
                    £{formatPrice(selectedSkip.price_before_vat, selectedSkip.vat)}
                  </span>
                  <span className="text-sm text-gray-400 ml-2">
                    {selectedSkip.hire_period_days} days
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSelectedSkipId(null)}
                  className="btn-secondary w-full"
                >
                  Back
                </button>
                <button onClick={handleContinue} className="btn-primary w-full">
                  Continue
                </button>
              </div>
            </div>
            {/* Desktop */}
            <div className="hidden lg:flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-sm text-gray-400">
                    {selectedSkip.size} Yard Skip
                  </p>
                </div>
                <div>
                  <span className="text-2xl font-bold text-[#0037C1]">
                    £{formatPrice(selectedSkip.price_before_vat, selectedSkip.vat)}
                  </span>
                  <span className="text-sm text-gray-400 ml-2">
                    {selectedSkip.hire_period_days} day hire
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSelectedSkipId(null)}
                  className="btn-secondary"
                >
                  Back
                </button>
                <button onClick={handleContinue} className="btn-primary flex items-center gap-2">
                  Continue
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide-arrow-right w-4 h-4"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
