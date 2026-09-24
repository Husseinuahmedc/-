/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * تطبيق "رَشفة" — متتبع استهلاك القهوة والكافيين اليومي
 * تم تصميمه ببنية مكوناتية نظيفة وسهلة التحويل لمشروع Capacitor أو PWA لأندرويد (APK).
 */

import React, { useState, useEffect } from 'react';
import { OnboardingView } from './components/OnboardingView';
import { HomeView } from './components/HomeView';
import { AddCupModal } from './components/AddCupModal';
import { BenefitsView } from './components/BenefitsView';
import { HistoryView, CupRecord } from './components/HistoryView';
import {
  formatArabicTime,
  getCupOrdinalArabic,
  COFFEE_TYPES,
} from './utils/arabic';

// مفاتيح التخزين المحلي (localStorage)
const STORAGE_KEYS = {
  CUPS_TODAY: 'rashfa_cups_today',
  CUPS_LIST: 'rashfa_cups_list',
  LAST_CUP_TIME: 'rashfa_last_cup_time',
  ONBOARDING_DONE: 'rashfa_onboarding_done',
};

// البيانات الافتراضية الأولية المطابقة للصور المرفقة
const DEFAULT_CUPS_LIST: CupRecord[] = [
  {
    id: 'cup-3',
    title: 'الكوب الثالث',
    type: 'كابوتشينو',
    time: '٠٢:١٥ م',
  },
  {
    id: 'cup-2',
    title: 'الكوب الثاني',
    type: 'إسبريسو',
    time: '١٠:٣٠ ص',
  },
  {
    id: 'cup-1',
    title: 'الكوب الأول',
    type: 'قهوة سوداء تقطير',
    time: '٠٨:٠٠ ص',
  },
];

// أنواع الشاشات المتاحة في التطبيق (Single Page Application Router)
export type AppScreen = 'onboarding' | 'home' | 'benefits' | 'history';

export default function App() {
  // حالة الشاشة الحالية مع التحقق مما إذا كان المستخدم قد أنهى الأونبوردنج مسبقاً
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(() => {
    try {
      const isDone = localStorage.getItem(STORAGE_KEYS.ONBOARDING_DONE);
      return isDone === 'true' ? 'home' : 'onboarding';
    } catch {
      return 'onboarding';
    }
  });

  // حالة ظهور نافذة تأكيد إضافة الكوب المنبثقة
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // عدد الأكواب اليومية المخزن في localStorage (القيمة الافتراضية ٣)
  const [cupsToday, setCupsToday] = useState<number>(() => {
    try {
      const savedCups = localStorage.getItem(STORAGE_KEYS.CUPS_TODAY);
      return savedCups !== null ? Number(savedCups) : 3;
    } catch {
      return 3;
    }
  });

  // وقت آخر كوب المخزن في localStorage
  const [lastCupTime, setLastCupTime] = useState<string>(() => {
    try {
      const savedTime = localStorage.getItem(STORAGE_KEYS.LAST_CUP_TIME);
      return savedTime || '٠٢:١٥ مساءً';
    } catch {
      return '٠٢:١٥ مساءً';
    }
  });

  // سجل أكواب اليوم بالتفصيل المخزن في localStorage
  const [cupsTodayList, setCupsTodayList] = useState<CupRecord[]>(() => {
    try {
      const savedList = localStorage.getItem(STORAGE_KEYS.CUPS_LIST);
      return savedList ? JSON.parse(savedList) : DEFAULT_CUPS_LIST;
    } catch {
      return DEFAULT_CUPS_LIST;
    }
  });

  // حفظ عدد الأكواب تلقائياً في localStorage عند أي تغيير
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CUPS_TODAY, String(cupsToday));
    } catch (e) {
      console.error('خطأ أثناء حفظ cupsToday في localStorage:', e);
    }
  }, [cupsToday]);

  // حفظ قائمة الأكواب تلقائياً في localStorage عند إضافة أي كوب
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CUPS_LIST, JSON.stringify(cupsTodayList));
    } catch (e) {
      console.error('خطأ أثناء حفظ cupsTodayList في localStorage:', e);
    }
  }, [cupsTodayList]);

  // حفظ وقت آخر كوب في localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.LAST_CUP_TIME, lastCupTime);
    } catch (e) {
      console.error('خطأ أثناء حفظ lastCupTime في localStorage:', e);
    }
  }, [lastCupTime]);

  /**
   * إنهاء شاشة الترحيب وحفظ الحالة
   */
  const handleStartApp = () => {
    try {
      localStorage.setItem(STORAGE_KEYS.ONBOARDING_DONE, 'true');
    } catch (e) {
      console.error('خطأ أثناء حفظ onboarding state:', e);
    }
    setCurrentScreen('home');
  };

  /**
   * عند الضغط على زر "إضافة كوب جديد +" في الشاشة الرئيسية:
   * تفتح نافذة التأكيد المنبثقة أولاً
   */
  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };

  /**
   * عند تأكيد إضافة الكوب (سواء بضغط "تمام" أو تلقائياً بعد 1.5 ثانية):
   * تزيد الأكواب فعلياً بمقدار 1 ويتم تحديث الوقت والسجل وحفظهم
   */
  const handleConfirmAddCup = () => {
    setShowAddModal(false);

    const nextCupCount = cupsToday + 1;
    setCupsToday(nextCupCount);

    const currentTimeFull = formatArabicTime(new Date(), true);
    const currentTimeShort = formatArabicTime(new Date(), false);
    setLastCupTime(currentTimeFull);

    // اختيار نوع قهوة من القائمة لإعطاء تجربة حية
    const randomCoffeeType =
      COFFEE_TYPES[(nextCupCount - 1) % COFFEE_TYPES.length];

    const newCupItem: CupRecord = {
      id: `cup-${Date.now()}`,
      title: `الكوب ${getCupOrdinalArabic(nextCupCount)}`,
      type: randomCoffeeType,
      time: currentTimeShort,
    };

    // إدراج الكوب في بداية السجل (من الأحدث للأقدم)
    setCupsTodayList((prev) => [newCupItem, ...prev]);
  };

  return (
    <div className="mobile-app-wrapper">
      <main className="mobile-phone-frame relative">
        {/* 1. شاشة الترحيب (Onboarding) */}
        {currentScreen === 'onboarding' && (
          <OnboardingView onStart={handleStartApp} />
        )}

        {/* 2. الشاشة الرئيسية (Home) */}
        {currentScreen === 'home' && (
          <HomeView
            cupsToday={cupsToday}
            goal={5}
            lastCupTime={lastCupTime}
            onAddCupClick={handleOpenAddModal}
            onNavigateToBenefits={() => setCurrentScreen('benefits')}
            onNavigateToHistory={() => setCurrentScreen('history')}
          />
        )}

        {/* 3. نافذة تأكيد إضافة كوب (تظهر كـ Overlay فوق الصفحة الرئيسية) */}
        {showAddModal && (
          <AddCupModal
            newCupNumber={cupsToday + 1}
            onConfirm={handleConfirmAddCup}
          />
        )}

        {/* 4. شاشة الفوائد (Benefits) */}
        {currentScreen === 'benefits' && (
          <BenefitsView onBack={() => setCurrentScreen('home')} />
        )}

        {/* 5. شاشة السجل (History) بتبويباتها الثلاثة */}
        {currentScreen === 'history' && (
          <HistoryView
            cupsTodayList={cupsTodayList}
            cupsCount={cupsToday}
            onBack={() => setCurrentScreen('home')}
          />
        )}
      </main>
    </div>
  );
}
