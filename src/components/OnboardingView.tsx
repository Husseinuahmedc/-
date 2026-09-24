import React from 'react';
import onboardingCupImg from '../assets/images/coffee_cup_onboarding_1790217032752.jpg';

interface OnboardingViewProps {
  onStart: () => void;
}

export const OnboardingView: React.FC<OnboardingViewProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen px-6 py-10 w-full select-none">
      {/* الجزء العلوي: فنجان القهوة الدائري المطابق للصورة تماماً */}
      <div className="w-full flex justify-center pt-8">
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full p-1.5 border-4 border-[#c5ab97]/30 shadow-2xl overflow-hidden flex items-center justify-center">
          <img
            src={onboardingCupImg}
            alt="فنجان قهوة رشفة"
            className="w-full h-full object-cover rounded-full"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* الجزء الأوسط: اسم التطبيق والنصوص الترحيبية ونقاط الصفحات */}
      <div className="flex flex-col items-center text-center my-auto space-y-4 pt-6 pb-4">
        {/* اسم التطبيق رشفة بحجم بارز وخط عربي فاخر */}
        <h1
          className="text-5xl font-black tracking-tight text-white drop-shadow-md"
          style={{ fontFamily: "'Tajawal', 'Readex Pro', sans-serif" }}
        >
          رَشفة
        </h1>

        {/* الجملة الرئيسية */}
        <h2 className="text-xl font-bold text-[#f5ebe2]">
          قهوتك، بطريقتك
        </h2>

        {/* الجملة الفرعية */}
        <p className="text-sm font-normal text-[#c7b0a2]">
          احسب كم كوب شربت اليوم!
        </p>

        {/* مؤشرات الصفحات (Dots) - مطابقة للصورة المرفقة */}
        <div className="flex items-center justify-center gap-2 pt-6">
          <span className="w-2 h-2 rounded-full bg-[#e8d5c8] opacity-90"></span>
          <span className="w-2 h-2 rounded-full bg-[#e8d5c8] opacity-90"></span>
          <span className="w-7 h-2 rounded-full bg-[#3c2a1f]"></span>
        </div>
      </div>

      {/* الجزء السفلي: زر ابدأ الآن ينقل للشاشة الرئيسية */}
      <div className="w-full pb-4">
        <button
          onClick={onStart}
          className="btn-onboarding-start"
          aria-label="ابدأ الآن"
        >
          ابدأ الآن
        </button>
      </div>
    </div>
  );
};
