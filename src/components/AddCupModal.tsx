import React, { useEffect } from 'react';
import { CheckIcon } from './Icons';
import { getCupOrdinalArabic } from '../utils/arabic';

interface AddCupModalProps {
  newCupNumber: number;
  onConfirm: () => void;
}

export const AddCupModal: React.FC<AddCupModalProps> = ({
  newCupNumber,
  onConfirm,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onConfirm();
    }, 1500);

    return () => clearTimeout(timer);
  }, [onConfirm]);

  const ordinalText = getCupOrdinalArabic(newCupNumber);

  return (
    <div
      className="modal-overlay"
      onClick={onConfirm}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="modal-content-card w-[320px] bg-[#201813] border border-white/10 rounded-3xl p-7 flex flex-col items-center text-center shadow-2xl space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-16 h-16 rounded-full bg-[#35271f] border border-white/15 flex items-center justify-center shadow-inner mt-2">
          <CheckIcon size={28} />
        </div>

        {}
        <h3 id="modal-title" className="text-xl font-black text-white pt-1">
          تمت إضافة الكوب!
        </h3>

        {}
        <p className="text-sm font-medium text-[#c5b0a3] pb-2">
          هذا كوبك <span className="font-bold text-white">{ordinalText}</span> اليوم
        </p>

        {}
        <button
          onClick={onConfirm}
          className="w-full h-12 rounded-2xl bg-[#36271e] hover:bg-[#433227] active:scale-97 border border-white/10 text-white font-bold text-base transition-all duration-150 cursor-pointer shadow-md"
        >
          تمام
        </button>
      </div>
    </div>
  );
};
