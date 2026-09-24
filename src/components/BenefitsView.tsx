import React from 'react';
import {
  BackChevronIcon,
  ShieldIcon,
  ActivityPulseIcon,
  SmileIcon,
} from './Icons';

interface BenefitsViewProps {
  onBack: () => void;
}

export const BenefitsView: React.FC<BenefitsViewProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col min-h-screen px-5 pt-8 pb-10 w-full select-none justify-between space-y-6">
      {}
      <div className="relative flex items-center justify-between w-full">
        {}
        <button
          onClick={onBack}
          className="round-icon-btn"
          aria-label="الرجوع إلى الصفحة الرئيسية"
        >
          <BackChevronIcon size={20} />
        </button>

        {}
        <h1 className="text-xl font-black text-white text-center flex-1 pr-2">
          فوائد القهوة
        </h1>

        {}
        <div className="w-11 h-11 opacity-0 pointer-events-none" />
      </div>

      {}
      <div className="benefits-highlight-card relative overflow-hidden">
        {}
        <div className="inline-block px-3 py-1 rounded-full bg-white/12 border border-white/10 text-xs font-semibold text-[#eedfd5] mb-3">
          ثقافة ومعرفة
        </div>

        {}
        <h2 className="text-2xl font-black text-white mb-2">
          زين انت تدري
        </h2>

        {}
        <p className="text-xs leading-relaxed text-[#c7b2a4] font-normal">
          رشفتك اليومية ليست مجرد عادة، بل هي رفيق لصحتك ونشاطك عند تناولها باعتدال. إليك أبرز ما تقدمه لك حبة البن:
        </p>
      </div>

      {}
      <div className="flex flex-col space-y-3.5 w-full">
        {}
        <div className="benefit-row-card">
          <div className="flex flex-col text-right flex-1 pr-1">
            <h3 className="text-base font-bold text-white mb-1">
              مضادات أكسدة
            </h3>
            <p className="text-xs leading-relaxed text-[#b5a092]">
              مركّبات طبيعية قوية تساعد في حماية خلايا الجسم وتعزيز المناعة.
            </p>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-[#1e1611] border border-white/8 flex items-center justify-center shrink-0">
            <ShieldIcon size={22} />
          </div>
        </div>

        {/* الفائدة الثانية: طاقة للنشاط */}
        <div className="benefit-row-card">
          <div className="flex flex-col text-right flex-1 pr-1">
            <h3 className="text-base font-bold text-white mb-1">
              طاقة للنشاط
            </h3>
            <p className="text-xs leading-relaxed text-[#b5a092]">
              تمنحك دفعة أداء مثالية ومحفّزة قبل التمارين الرياضية أو الشغل والدراسة.
            </p>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-[#1e1611] border border-white/8 flex items-center justify-center shrink-0">
            <ActivityPulseIcon size={22} />
          </div>
        </div>

        {/* الفائدة الثالثة: الأهم (تحسين المزاج) */}
        <div className="benefit-row-card">
          <div className="flex flex-col text-right flex-1 pr-1">
            <h3 className="text-base font-bold text-white mb-1">
              الأهم
            </h3>
            <p className="text-xs leading-relaxed text-[#b5a092]">
              تحسن من مزاجك وتعاملك وي الناس!
            </p>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-[#1e1611] border border-white/8 flex items-center justify-center shrink-0">
            <SmileIcon size={22} />
          </div>
        </div>
      </div>

      {/* 4. ملاحظة التنبيه بالأسفل عن الاعتدال */}
      <div className="alert-tip-card mt-auto">
        <span className="text-base shrink-0">💡</span>
        <p className="leading-snug">
          <span className="font-bold text-white">تنبيه:</span> الاعتدال هو المفتاح! كوبان إلى ثلاثة يوميًا تنطيك الفائدة القصوى دون إجهاد.
        </p>
      </div>
    </div>
  );
};
