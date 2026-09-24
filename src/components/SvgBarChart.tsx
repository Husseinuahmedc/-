/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * مكون الرسم البياني بالأعمدة باستخدام SVG خفيف الوزن وديناميكي بالكامل
 * لا يعتمد على أي مكتبات خارجية، ويدعم اتجاه RTL والحساب الديناميكي بدقة.
 */

import React from 'react';

export interface SvgBarItem {
  label: string;
  value: number;
  highlighted?: boolean;
}

interface SvgBarChartProps {
  items: SvgBarItem[];
  mode?: 'days' | 'weeks';
}

export const SvgBarChart: React.FC<SvgBarChartProps> = ({
  items,
  mode = 'days',
}) => {
  const chartWidth = 320;
  const chartHeight = 135;
  const baseY = 102;
  const maxTrackHeight = 72;
  const topTextY = 20;
  const bottomTextY = 122;

  const count = items.length;
  const slotWidth = chartWidth / count;
  const barWidth = mode === 'days' ? 22 : 32;

  // إيجاد القيمة القصوى لحساب الارتفاع النسبي بدقة
  const rawMax = Math.max(...items.map((i) => i.value));
  const maxVal = mode === 'days' ? Math.max(6, rawMax) : Math.max(5, rawMax);

  return (
    <svg
      viewBox={`0 0 ${chartWidth} ${chartHeight}`}
      className="w-full h-36 overflow-visible select-none"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* تأثير التوهج المشرق للعمود النشط (تيراكوتا) */}
        <filter id="terracottaGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="3.5"
            floodColor="#8a4836"
            floodOpacity="0.75"
          />
        </filter>
      </defs>

      {items.map((item, index) => {
        // حساب الإحداثيات بحيث يتم الترتيب من اليمين إلى اليسار (RTL)
        // العنصر الأول في المصفوفة يكون في أقصى اليمين
        const cx = chartWidth - (index + 0.5) * slotWidth;
        const barX = cx - barWidth / 2;

        // حساب ارتفاع العمود الممتلئ
        const ratio = Math.max(0.12, Math.min(1, item.value / maxVal));
        const filledHeight = ratio * maxTrackHeight;
        const filledY = baseY - filledHeight;
        const trackY = baseY - maxTrackHeight;

        return (
          <g key={index} className="transition-all duration-300">
            {/* 1. القيمة أعلى العمود */}
            <text
              x={cx}
              y={topTextY}
              textAnchor="middle"
              fill="#ffffff"
              fontSize="12"
              fontWeight="700"
              fontFamily="'Readex Pro', 'Tajawal', sans-serif"
            >
              {item.value}
            </text>

            {/* 2. مسار العمود الخلفي (Track) */}
            <rect
              x={barX}
              y={trackY}
              width={barWidth}
              height={maxTrackHeight}
              rx="6"
              fill="#1b130e"
            />

            {/* 3. العمود الممتلئ (Filled Bar) مع التلوين والتوهج */}
            <rect
              x={barX}
              y={filledY}
              width={barWidth}
              height={filledHeight}
              rx="6"
              fill={item.highlighted ? '#8a4836' : '#433328'}
              filter={item.highlighted ? 'url(#terracottaGlow)' : undefined}
              className="transition-all duration-500 ease-out"
            />

            {/* 4. التسمية أسفل العمود (اليوم أو الأسبوع) */}
            <text
              x={cx}
              y={bottomTextY}
              textAnchor="middle"
              fill={item.highlighted ? '#ffffff' : '#a89587'}
              fontSize={mode === 'days' ? '12' : '11'}
              fontWeight={item.highlighted ? '700' : '500'}
              fontFamily="'Readex Pro', 'Tajawal', sans-serif"
            >
              {item.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
