import React, { useState } from 'react';
import { Gift, Heart } from 'lucide-react';
import { Inventory, DonationRecord } from '../types';

interface DonateSectionProps {
  inventory?: Inventory;
  onDonate?: (flowers: number, stars: number, diamonds: number, message: string, donorName: string) => void;
  totalDonated?: Inventory;
  donationRecords?: DonationRecord[];
}

const DonateSectionBase: React.FC<DonateSectionProps> = () => {
  // MB Bank Transfer Modal State
  const [selectedBankTier, setSelectedBankTier] = useState<{
    amountLabel: string;
    itemLabel: string;
    amountNum: number;
    icon: string;
  } | null>(null);
  const [copyToast, setCopyToast] = useState<string | null>(null);

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyToast(`Đã sao chép ${label}: ${text}`);
    setTimeout(() => setCopyToast(null), 3000);
  };

  // 5 support tiers strictly as requested
  const supportTiers = [
    { amountLabel: '10.000 VNĐ', itemLabel: 'Ly cà phê', amountNum: 10000, icon: '☕' },
    { amountLabel: '20.000 VNĐ', itemLabel: 'Panna Cotta', amountNum: 20000, icon: '🍮' },
    { amountLabel: '30.000 VNĐ', itemLabel: 'Trà sữa', amountNum: 30000, icon: '🧋' },
    { amountLabel: '50.000 VNĐ', itemLabel: 'Đổ xăng', amountNum: 50000, icon: '⛽' },
    { amountLabel: '100.000 VNĐ', itemLabel: 'Bò Bít Tết', amountNum: 100000, icon: '🥩' },
  ];

  return (
    <div
      id="donate-section"
      className="bg-[#240a3d]/90 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-purple-500/30 shadow-xl relative overflow-hidden transition-all text-purple-100 space-y-6"
    >
      {/* Decorative ambient flower glow */}
      <div className="absolute -top-10 -right-10 w-64 h-64 bg-pink-600/15 blur-3xl rounded-full pointer-events-none" />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-500/30">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-lg shrink-0">
            <Gift className="w-6 h-6 text-amber-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-serif font-bold text-white">
                Mục Donate Tặng Quỳnh Hoa Studio
              </h2>
              <span className="text-[11px] text-pink-200 bg-pink-900/80 px-2.5 py-0.5 rounded-full border border-pink-400/40">
                Ủng hộ tác giả
              </span>
            </div>
            <p className="text-xs text-purple-200/80 mt-0.5">
              Ủng hộ tinh thần cho Quỳnh Hoa Studio để tác giả sáng tạo thêm nhiều câu chuyện hay!
            </p>
          </div>
        </div>
      </div>

      {/* SECTION: ỦNG HỘ TINH THẦN CHO QUỲNH */}
      <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-purple-900/90 via-pink-950/80 to-purple-900/90 border border-pink-500/40 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-serif font-bold text-amber-200 uppercase tracking-wider flex items-center gap-2">
            <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
            <span>ỦNG HỘ TINH THẦN CHO QUỲNH</span>
          </span>
          <span className="text-[10px] text-pink-300 bg-pink-950/90 px-2.5 py-0.5 rounded border border-pink-400/30">
            Cảm ơn bạn rất nhiều ❤️
          </span>
        </div>

        <p className="text-xs text-purple-200/90 leading-relaxed">
          Sự ủng hộ tinh thần nhỏ bé của bạn là động lực rất lớn giúp Quỳnh sáng tạo thêm nhiều cốt truyện hay và hấp dẫn!
        </p>

        {/* 5 Support Tiers (Balanced grid: 5 columns on desktop, 2-3 on tablet/mobile) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-1">
          {supportTiers.map((tier, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedBankTier(tier)}
              className="p-3 sm:p-3.5 rounded-xl bg-[#1c0533] hover:bg-pink-900/80 border border-pink-500/30 hover:border-pink-300 text-center transition-all cursor-pointer group shadow-sm hover:scale-105 flex flex-col items-center justify-center"
            >
              <div className="text-2xl mb-1.5 group-hover:scale-110 transition-transform">{tier.icon}</div>
              <div className="text-xs sm:text-sm font-bold text-white">{tier.amountLabel}</div>
              <div className="text-[11px] text-pink-300/90 font-medium mt-0.5">{tier.itemLabel}</div>
            </button>
          ))}
        </div>
      </div>

      {/* MB BANK TRANSFER MODAL POPUP */}
      {selectedBankTier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#21093b] rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl border-2 border-pink-500/50 relative text-purple-100 space-y-4">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-2 pb-3 border-b border-purple-500/30">
              <div className="flex items-center gap-3">
                <div className="text-3xl p-2 bg-pink-950 rounded-2xl border border-pink-400/40">
                  {selectedBankTier.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-1.5 font-serif">
                    <span>Ủng Hộ Tinh Thần</span>
                  </h3>
                  <p className="text-xs text-amber-200 font-bold">
                    {selectedBankTier.amountLabel} — {selectedBankTier.itemLabel}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedBankTier(null)}
                className="w-8 h-8 rounded-full bg-purple-900 hover:bg-purple-800 text-purple-200 hover:text-white flex items-center justify-center text-sm font-bold transition-colors cursor-pointer border border-purple-400/30 shrink-0"
              >
                ✕
              </button>
            </div>

            {/* Account Details Card */}
            <div className="p-4 rounded-xl bg-[#140326] border border-purple-500/40 space-y-3 shadow-inner">
              
              {/* Ngân hàng */}
              <div className="flex items-center justify-between pb-2 border-b border-purple-500/20">
                <span className="text-xs text-purple-300/80 font-medium">Ngân hàng:</span>
                <span className="text-xs font-bold text-cyan-300 bg-cyan-950 px-2.5 py-1 rounded border border-cyan-500/40">
                  MB bank (Ngân hàng Quân Đội)
                </span>
              </div>

              {/* Số tài khoản */}
              <div className="flex items-center justify-between pb-2 border-b border-purple-500/20">
                <div>
                  <div className="text-[10px] text-purple-300/70 font-medium">Số tài khoản:</div>
                  <div className="text-base font-mono font-bold text-amber-300 tracking-wider">
                    0359354441
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyText('0359354441', 'STK MB Bank')}
                  className="px-3 py-1.5 rounded-lg bg-purple-800 hover:bg-purple-700 text-purple-100 text-xs font-semibold cursor-pointer border border-purple-400/30 transition-all active:scale-95"
                >
                  Sao chép STK
                </button>
              </div>

              {/* Chủ tài khoản */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-purple-300/70 font-medium">Tên chủ tài khoản:</div>
                  <div className="text-sm font-bold text-white uppercase tracking-wider">
                    LE NGOC QUYNH
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyText('LE NGOC QUYNH', 'Tên chủ tài khoản')}
                  className="px-3 py-1.5 rounded-lg bg-purple-800 hover:bg-purple-700 text-purple-100 text-xs font-semibold cursor-pointer border border-purple-400/30 transition-all active:scale-95"
                >
                  Sao chép Tên
                </button>
              </div>
            </div>

            {/* QR VietQR Code */}
            <div className="text-center p-3 bg-[#130224] rounded-xl border border-purple-500/30 space-y-2">
              <div className="text-xs font-semibold text-pink-200">
                Quét mã QR bằng App MB Bank / Banking bất kỳ:
              </div>
              <div className="flex justify-center">
                <img
                  src={`https://img.vietqr.io/image/MB-0359354441-compact2.png?amount=${selectedBankTier.amountNum}&addInfo=Ung%20ho%20Quynh%20Hoa%20Studio&accountName=LE%20NGOC%20QUYNH`}
                  alt="Mã QR Chuyển Khoản MB Bank"
                  className="w-44 h-44 rounded-xl object-contain border-2 border-pink-400/50 bg-white p-1 shadow-md"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <p className="text-[11px] text-purple-300/80">
                Chân thành cảm ơn tình cảm và sự ủng hộ quý báu dành cho Quỳnh! ❤️
              </p>
            </div>

            {/* Copy Toast Alert */}
            {copyToast && (
              <div className="p-2 rounded-lg bg-emerald-900 border border-emerald-400 text-emerald-200 text-xs font-bold text-center animate-bounce">
                ✓ {copyToast}
              </div>
            )}

            <button
              type="button"
              onClick={() => setSelectedBankTier(null)}
              className="w-full py-2.5 rounded-xl bg-purple-800 hover:bg-purple-700 text-white font-bold text-xs transition-colors cursor-pointer border border-purple-400/40"
            >
              Đóng Cửa Sổ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const DonateSection = React.memo(DonateSectionBase);
