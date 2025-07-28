import React from 'react';
import { Check } from 'lucide-react';

export default function PricesV2({dark}) {
  const plans = [
    {
      name: "WEEKLY PLAN",
      price: "PKR 350",
      period: "1 Week",
      features: [
        "Perfect For Casual Gamers who want to join the fun and compete",
        "Includes access to tournaments for one week",
        "Enjoy a guaranteed spot in the tournament and basic prizes"
      ],
      popular: false
    },
    {
      name: "MONTHLY PLAN",
      price: "PKR 999",
      period: "1 Month",
      features: [
        "Perfect for Regular Gamers who want consistent access",
        "Includes access to all tournaments for one month",
        "Enjoy premium tournaments and better prize pools"
      ],
      popular: true
    },
    {
      name: "YEARLY PLAN", 
      price: "PKR 8,999",
      period: "12 Months",
      features: [
        "Perfect For Serious Gamers who want maximum value",
        "Includes access to all tournaments for full year",
        "Enjoy VIP status, exclusive tournaments and biggest prizes"
      ],
      popular: false
    }
  ];

  return (
    <div className={`m-4 sm:m-8 lg:m-16 p-4 sm:p-6 lg:p-8 rounded-md shadow-2xl shadow-gray-950 pb-8 sm:pb-10 backdrop-blur-sm ${
              dark ? "bg-[#854951] bg-opacity-[0.4]" : "bg-[#2321225d]"
            }`}>

      <div className="relative z-10 container mx-auto px-3 sm:px-4 md:px-6 py-8 sm:py-12 md:py-16">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="font-bold mb-3 sm:mb-4 font-montserrat drop-shadow-[2px_2px_3px_rgba(0,0,0,0.6)] bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] bg-clip-text text-transparent text-center text-3xl sm:text-3xl md:text-4xl lg:text-5xl" style={{
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Choose your plan
          </h1>
          <p className="bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] bg-clip-text text-transparent text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-6 sm:mb-8 px-4">
            Get ready for ultimate Gaming Tournament
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-black bg-opacity-60 rounded-lg p-4 sm:p-6 md:p-8 border transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl ${
                plan.popular 
                  ? 'border-[#D19F43] shadow-lg shadow-amber-500/25' 
                  : 'border-[#854951] hover:border-[#D19F43]'
              } ${
                // Center the popular card on medium screens with 2-column layout
                plan.popular && 'md:col-span-2 lg:col-span-1 md:max-w-md md:mx-auto lg:max-w-none'
              }`}
            >
              {/* Plan Badge */}
              <div className="text-center mb-4 sm:mb-6">
                <span className={`inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold tracking-wider ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] text-black' 
                    : 'bg-gray-700 text-amber-300'
                }`}>
                  {plan.name}
                </span>
              </div>

              {/* Price */}
              <div className="text-center mb-6 sm:mb-8">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] bg-clip-text text-transparent mb-1 sm:mb-2">
                  {plan.price}
                </div>
                <div className="text-amber-200 text-xs sm:text-sm tracking-wide">
                  {plan.period}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-2 sm:space-x-3">
                    <div className="flex-shrink-0 mt-0.5 sm:mt-1">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#D19F43] flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-black" />
                      </div>
                    </div>
                    <p className="text-amber-100 text-xs sm:text-sm leading-relaxed">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>

              {/* Purchase Button */}
              <button className={`w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-bold text-black text-sm sm:text-base transition-all duration-300 transform hover:scale-105 ${
                plan.popular
                  ? 'bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] hover:bg-[#D19F43] shadow-lg'
                  : 'bg-[#D19F43] hover:bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d]'
              }`}>
                Purchase Now
              </button>

              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-black px-3 sm:px-4 md:px-6 py-1 sm:py-1.5 md:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                    MOST POPULAR
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom decorative text */}
        <div className="text-center mt-8 sm:mt-12 md:mt-16">
          <p className="text-amber-200 text-sm sm:text-base md:text-lg opacity-80 px-4">
            Join thousands of gamers competing for glory and prizes
          </p>
        </div>
      </div>
    </div>
  );
}