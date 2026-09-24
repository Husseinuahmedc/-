/**
 * دوال مساعدة للغة العربية والأرقام الشرقية
 */

/**
 * تحويل الأرقام الإنجليزية إلى أرقام عربية مشرقية (٠، ١، ٢، ٣...)
 */
export function toArabicDigits(value: number | string): string {
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(value).replace(/[0-9]/g, (digit) => arabicDigits[parseInt(digit, 10)]);
}

/**
 * الحصول على الترتيب الترتيبي بالعربية للكوب (الأول، الثاني، الثالث...)
 */
export function getCupOrdinalArabic(count: number): string {
  const ordinals: Record<number, string> = {
    1: 'الأول',
    2: 'الثاني',
    3: 'الثالث',
    4: 'الرابع',
    5: 'الخامس',
    6: 'السادس',
    7: 'السابع',
    8: 'الثامن',
    9: 'التاسع',
    10: 'العاشر',
    11: 'الحادي عشر',
    12: 'الثاني عشر',
    13: 'الثالث عشر',
    14: 'الرابع عشر',
    15: 'الخامس عشر',
  };

  return ordinals[count] || `رقم ${toArabicDigits(count)}`;
}

/**
 * أنواع القهوة الدورية عند إضافة أكواب جديدة لإعطاء طابع واقعي
 */
export const COFFEE_TYPES = [
  'كابوتشينو',
  'إسبريسو',
  'قهوة سوداء تقطير',
  'فلات وايت',
  'كورتادو',
  'لاتيه',
  'أمريكانو',
  'قهوة تركية',
  'في 60 مختصة',
];

/**
 * تنسيق الوقت الحالي بنمط عربي مثل "٠٢:١٥ م" أو "٠٢:١٥ مساءً"
 */
export function formatArabicTime(date: Date = new Date(), fullPeriod: boolean = false): string {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const isPM = hours >= 12;
  
  hours = hours % 12;
  if (hours === 0) hours = 12;

  const formattedHours = hours < 10 ? `٠${toArabicDigits(hours)}` : toArabicDigits(hours);
  const formattedMinutes = minutes < 10 ? `٠${toArabicDigits(minutes)}` : toArabicDigits(minutes);
  
  const period = fullPeriod ? (isPM ? 'مساءً' : 'صباحاً') : (isPM ? 'م' : 'ص');

  return `${formattedHours}:${formattedMinutes} ${period}`;
}

/**
 * تنسيق التاريخ باللغة العربية
 */
export function getArabicFormattedDate(): string {
  return 'الخميس، ٢٤ أكتوبر';
}
