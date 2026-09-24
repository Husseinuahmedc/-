import React from 'react';
import {
  CoffeeCupIcon,
  SettingsGearIcon,
  ClockIcon,
  ZapIcon,
} from './Icons';
import { toArabicDigits } from '../utils/arabic';

interface HomeViewProps {
  cupsToday: number;
  goal?: number;
  lastCupTime: string;
  onAddCupClick: () => void;
  onNavigateToBenefits: () => void;
  onNavigateToHistory: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  cupsToday,
  goal = 5,
  lastCupTime,
  onAddCupClick,
  onNavigateToBenefits,
  onNavigateToHistory,
}) => {
  // حساب الكافيين التقديري: 80 ملغ لكل كوب رشفة
  const caffeineAmount = cupsToday * 80;

  return (
    <div className="flex flex-col min-h-screen px-5 pt-8 pb-10 w-full select-none justify-between space-y-6">
      {/* 1. ترويسة الصفحة (Header) — مطابقة للصورة coffee-home.png */}
      <div className="flex items-center justify-between w-full">
        {/* نصوص الترحيب والتاريخ جهة اليمين */}
        <div className="flex flex-col text-right">
          <h1 className="text-2xl font-black text-white tracking-wide">
            صباح الخير
          </h1>
          <p className="text-xs text-[#beaa9d] mt-1 font-medium">
            الخميس، ٢٤ أكتوبر
          </p>
        </div>

        {/* زر الترس / الإعدادات / السجل جهة اليسار */}
        <button
          onClick={onNavigateToHistory}
          className="round-icon-btn"
          aria-label="عرض السجل والإعدادات"
          title="عرض السجل"
        >
          <SettingsGearIcon size={21} />
        </button>
      </div>

      {/* 2. دائرة العداد المركزية الكبيرة — مطابقة coffee-home.png */}
      <div className="flex justify-center my-2">
        <div
          className="counter-circle cursor-pointer"
          onClick={onNavigateToHistory}
          title="اضغط لعرض السجل بالتفصيل"
        >
          {/* الرقم العربي الكبير لعدد الأكواب */}
          <span
            className="text-7xl font-extrabold text-white leading-none mb-1 select-none"
            style={{ fontFamily: "'Readex Pro', 'Tajawal', sans-serif" }}
          >
            {toArabicDigits(cupsToday)}
          </span>

          {/* نص أكواب اليوم */}
          <span className="text-base font-bold text-[#f5ece5] mt-1">
            أكواب اليوم
          </span>

          {/* بادج الهدف اليومي: ٥ أكواب */}
          <div className="mt-3 px-4 py-1 rounded-full bg-white/10 border border-white/10 text-xs text-[#d6c3b6] font-medium tracking-wide">
            الهدف اليومي: {toArabicDigits(goal)} أكواب
          </div>
        </div>
      </div>

      {/* 3. تتبع التقدم اليومي مع ٥ مربعات فنجان */}
      <div className="flex flex-col items-center space-y-3">
        <span className="text-xs font-semibold text-[#beaa9d] tracking-wide">
          تتبع التقدم اليومي
        </span>

        {/* صف الفناجين الـ 5 */}
        <div className="flex items-center justify-center gap-2.5 w-full">
          {Array.from({ length: 5 }).map((_, index) => {
            const isFilled = index < cupsToday;
            return (
              <div
                key={index}
                className={`w-13 h-13 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  isFilled
                    ? 'bg-[#3e2d22] border border-white/20 shadow-md text-white'
                    : 'bg-white/4 border border-white/8 text-[#6d574a]'
                }`}
              >
                <CoffeeCupIcon
                  size={24}
                  color={isFilled ? '#ffffff' : '#6d574a'}
                  fill={isFilled ? 'rgba(255, 255, 255, 0.15)' : 'none'}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. بطاقتين إحصائيتين (الكافيين التقديري / وقت آخر كوب) */}
      <div className="grid grid-cols-2 gap-3.5 w-full">
        {/* البطاقة الأولى (في اليمين في RTL): وقت آخر كوب */}
        <div className="stat-card">
          <div className="flex items-center gap-2 text-right">
            <ClockIcon size={18} color="#beaa9d" />
            <span className="text-xs font-medium text-[#beaa9d]">
              وقت آخر كوب
            </span>
          </div>
          <div className="text-right">
            <span className="text-xl font-extrabold text-white tracking-tight">
              {lastCupTime}
            </span>
          </div>
        </div>

        {/* البطاقة الثانية (في اليسار في RTL): الكافيين التقديري */}
        <div className="stat-card">
          <div className="flex items-center gap-2 text-right">
            <ZapIcon size={18} color="#beaa9d" />
            <span className="text-xs font-medium text-[#beaa9d]">
              الكافيين التقديري
            </span>
          </div>
          <div className="text-right">
            <span className="text-xl font-extrabold text-white tracking-tight">
              {toArabicDigits(caffeineAmount)} ملغ
            </span>
          </div>
        </div>
      </div>

      {/* 5. زر إضافة كوب جديد */}
      <div className="w-full pt-1">
        <button
          onClick={onAddCupClick}
          className="btn-primary-add"
          aria-label="إضافة كوب جديد"
        >
          <span>إضافة كوب جديد</span>
          <span className="text-2xl font-light leading-none">+</span>
        </button>
      </div>

      {/* 6. بانر الفوائد بالأسفل — ينقل لشاشة الفوائد */}
      <div
        onClick={onNavigateToBenefits}
        className="bottom-banner-card"
        role="button"
        tabIndex={0}
        aria-label="الانتقال لشاشة فوائد القهوة"
      >
        <span className="text-xs font-medium text-[#baa699]">
          انت تعرف؟
        </span>
        <h3 className="text-2xl font-black text-white tracking-wide mt-0.5">
          هاي الفوائد
        </h3>
      </div>
    </div>
  );
};
