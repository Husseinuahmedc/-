import React, { useState } from 'react';
import {
  BackChevronIcon,
  SimpleCupIcon,
  CalendarIcon,
} from './Icons';
import { toArabicDigits } from '../utils/arabic';
import { SvgBarChart, SvgBarItem } from './SvgBarChart';

export type HistoryTab = 'day' | 'week' | 'month';

export interface CupRecord {
  id: string;
  title: string;
  type: string;
  time: string;
}

interface HistoryViewProps {
  onBack: () => void;
  cupsTodayList: CupRecord[];
  cupsCount: number;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  onBack,
  cupsTodayList,
  cupsCount,
}) => {
  const [activeTab, setActiveTab] = useState<HistoryTab>('day');

  
  const currentTodayCups = cupsTodayList.length || cupsCount;

  const totalWeeklyCups = 1 + currentTodayCups + 2 + 5 + 3 + 4 + 2;
  const calculatedDailyAvg = (totalWeeklyCups / 7).toFixed(1);

  const weekSvgItems: SvgBarItem[] = [
    { label: 'ج', value: 1, highlighted: false },
    { label: 'خ', value: currentTodayCups, highlighted: true },
    { label: 'ر', value: 2, highlighted: false },
    { label: 'ث', value: 5, highlighted: false },
    { label: 'ن', value: 3, highlighted: false },
    { label: 'ح', value: 4, highlighted: false },
    { label: 'س', value: 2, highlighted: false },
  ];
 
  const week5Avg = Number(
    Math.max(1.0, 3.8 + (currentTodayCups - 3) * 0.15).toFixed(1)
  );

  const monthSvgItems: SvgBarItem[] = [
    { label: 'أسبوع 5', value: week5Avg, highlighted: true },
    { label: 'أسبوع 4', value: 4.2, highlighted: false },
    { label: 'أسبوع 3', value: 3.4, highlighted: false },
    { label: 'أسبوع 2', value: 2.8, highlighted: false },
    { label: 'أسبوع 1', value: 2.1, highlighted: false },
  ];

  return (
    <div className="flex flex-col min-h-screen px-5 pt-8 pb-10 w-full select-none justify-between space-y-5">
      {}
      <div className="relative flex items-center justify-between w-full">
        {/* زر العودة الدائري في اليمين */}
        <button
          onClick={onBack}
          className="round-icon-btn"
          aria-label="الرجوع إلى الصفحة الرئيسية"
        >
          <BackChevronIcon size={20} />
        </button>

        {/* عنوان الصفحة في المنتصف */}
        <h1 className="text-xl font-black text-white text-center flex-1 pr-2">
          السجل
        </h1>

        {/* موازن بصري للمحاذاة */}
        <div className="w-11 h-11 opacity-0 pointer-events-none" />
      </div>

      {/* 2. شريط التبويبات الثلاثة (اليوم / الأسبوع / الشهر) */}
      <div className="w-full bg-[#1f1712] p-1 rounded-2xl flex items-center justify-between border border-white/6">
        <button
          onClick={() => setActiveTab('day')}
          className={`flex-1 py-2.5 text-center text-sm font-bold rounded-xl transition-all duration-200 cursor-pointer ${
            activeTab === 'day'
              ? 'bg-[#3e2d22] text-white shadow-sm'
              : 'text-[#9f8a7d] hover:text-white'
          }`}
        >
          اليوم
        </button>
        <button
          onClick={() => setActiveTab('week')}
          className={`flex-1 py-2.5 text-center text-sm font-bold rounded-xl transition-all duration-200 cursor-pointer ${
            activeTab === 'week'
              ? 'bg-[#3e2d22] text-white shadow-sm'
              : 'text-[#9f8a7d] hover:text-white'
          }`}
        >
          الأسبوع
        </button>
        <button
          onClick={() => setActiveTab('month')}
          className={`flex-1 py-2.5 text-center text-sm font-bold rounded-xl transition-all duration-200 cursor-pointer ${
            activeTab === 'month'
              ? 'bg-[#3e2d22] text-white shadow-sm'
              : 'text-[#9f8a7d] hover:text-white'
          }`}
        >
          الشهر
        </button>
      </div>

      {/* 3. حاوية الرسم البياني للأعمدة المبنية بواسطة SVG الخفيف والديناميكي */}
      <div className="bg-[#241c16] border border-white/8 rounded-3xl p-5 shadow-lg w-full flex flex-col space-y-3">
        {/* رأس الرسم البياني مع المعدل اليومي المحسوب ديناميكياً */}
        <div className="flex items-center justify-between text-xs w-full">
          <span className="font-bold text-white">
            {activeTab === 'month' ? 'متوسط الأسبوع' : 'نشاط هذا الأسبوع'}
          </span>
          <span className="text-[#beaa9d] font-medium">
            المعدل اليومي: {toArabicDigits(calculatedDailyAvg)} أكواب
          </span>
        </div>

        {/* عرض الرسم البياني SVG الديناميكي */}
        <div className="w-full py-1">
          <SvgBarChart
            items={activeTab === 'month' ? monthSvgItems : weekSvgItems}
            mode={activeTab === 'month' ? 'weeks' : 'days'}
          />
        </div>
      </div>

      {/* 4. قائمة السجلات التحتية حسب التبويب النشط */}
      <div className="flex flex-col space-y-3 w-full flex-1">
        {/* تبويب اليوم: سجل اليوم (الخميس) ديناميكي بالكامل */}
        {activeTab === 'day' && (
          <>
            <h2 className="text-sm font-bold text-white text-right">
              سجل اليوم (الخميس)
            </h2>

            <div className="flex flex-col space-y-2.5">
              {cupsTodayList.length > 0 ? (
                cupsTodayList.map((cup) => (
                  <div key={cup.id} className="history-item-card">
                    {/* يمين: الأيقونة مع العنوان والنوع */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#1e1611] border border-white/6 flex items-center justify-center shrink-0 text-white">
                        <SimpleCupIcon size={19} color="#ffffff" />
                      </div>

                      <div className="flex flex-col text-right">
                        <span className="text-sm font-bold text-white">
                          {cup.title}
                        </span>
                        <span className="text-xs text-[#a89486]">
                          {cup.type}
                        </span>
                      </div>
                    </div>

                    {/* يسار: وقت الشرب */}
                    <span className="text-xs font-medium text-[#bcaaa0]">
                      {cup.time}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-xs text-[#a89486]">
                  لم تشرب أي كوب بعد اليوم. اضغط على إضافة كوب جديد للبدء!
                </div>
              )}
            </div>
          </>
        )}

        {/* تبويب الأسبوع: سجل الأسبوع */}
        {activeTab === 'week' && (
          <>
            <h2 className="text-sm font-bold text-white text-right">
              سجل الأسبوع
            </h2>

            <div className="flex flex-col space-y-2.5">
              {[
                { day: 'الخميس', cups: currentTodayCups },
                { day: 'الأربعاء', cups: 2 },
                { day: 'الثلاثاء', cups: 5 },
                { day: 'الاثنين', cups: 3 },
                { day: 'الأحد', cups: 4 },
                { day: 'السبت', cups: 2 },
              ].map((item, idx) => (
                <div key={idx} className="history-item-card">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#1e1611] border border-white/6 flex items-center justify-center shrink-0 text-white">
                      <SimpleCupIcon size={19} color="#ffffff" />
                    </div>

                    <span className="text-sm font-bold text-white">
                      {item.day} - {toArabicDigits(item.cups)} أكواب
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* تبويب الشهر: ملخص الأسابيع */}
        {activeTab === 'month' && (
          <>
            <h2 className="text-sm font-bold text-white text-right">
              ملخص الأسابيع
            </h2>

            <div className="flex flex-col space-y-2.5">
              {monthSvgItems.map((item, idx) => (
                <div key={idx} className="history-item-card">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#1e1611] border border-white/6 flex items-center justify-center shrink-0">
                      <CalendarIcon size={18} />
                    </div>

                    <span className="text-xs sm:text-sm font-bold text-white">
                      {item.label} - متوسط {item.value} كوب باليوم
                    </span>
                  </div>

                  <span className="text-xs text-[#a89587] font-medium">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* 5. تنبيه الحد اليومي الموصى به للكافيين بالأسفل */}
      <div className="alert-tip-card mt-auto">
        <span className="text-base shrink-0">💡</span>
        <p className="leading-snug">
          <span className="font-bold text-white">تنبيه:</span> الحد اليومي الموصى به للكافيين هو ٤٠٠ ملغ (حوالي ٥ أكواب رشفة متوسطة).
        </p>
      </div>
    </div>
  );
};
