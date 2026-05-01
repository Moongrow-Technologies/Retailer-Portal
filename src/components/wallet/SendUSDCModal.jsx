import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X, CheckCircle2, Delete } from 'lucide-react';
import WalletIcon from '@/components/shared/WalletIcon';

const RECENT_ADDRESSES = [
  { address: '0x4f3a...e92d', full: '0x4f3ae92d', label: 'Used 2 days ago' },
  { address: '0x8c2b...f41a', full: '0x8c2bf41a', label: 'Used 1 week ago' },
  { address: '0x1d9e...b03c', full: '0x1d9eb03c', label: 'Used 1 month ago' },
];

const FEE = 1.5;
const AVAILABLE = 284.50;

function StepIndicator({ step }) {
  return (
    <div className="flex gap-1.5 mb-6">
      {[1, 2, 3, 4].map((s) => (
        <div
          key={s}
          className="h-1 flex-1 rounded-full transition-all duration-300"
          style={{ background: s <= step ? '#796EB2' : '#EBEBF0' }}
        />
      ))}
    </div>
  );
}

export default function SendUSDCModal({ open, onClose }) {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('0');

  const handleClose = () => {
    setStep(1);
    setAddress('');
    setAmount('0');
    onClose();
  };

  const handleKey = (key) => {
    if (key === 'del') {
      setAmount((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
    } else if (key === '.') {
      if (!amount.includes('.')) setAmount((prev) => prev + '.');
    } else {
      setAmount((prev) => (prev === '0' ? key : prev + key));
    }
  };

  const numericAmount = parseFloat(amount) || 0;
  const youSend = Math.max(0, numericAmount - FEE);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-[#EBEBF0] [&>button]:hidden">
        <div className="bg-white rounded-2xl p-7">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#0c0b0c]">
              {step === 3 ? 'Confirm send' : 'Send USDC'}
            </h2>
            <button onClick={handleClose} className="text-[#9490AA] hover:text-[#0c0b0c] transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#F0EFF5] mb-5" />

          <StepIndicator step={step} />

          {/* STEP 1 — Select Destination */}
          {step === 1 && (
            <div>
              {/* Address input */}
              <div className="flex items-center gap-2 bg-[#F7F6FB] border border-[#EBEBF0] rounded-xl px-4 py-3 mb-4">
                <input
                  type="text"
                  placeholder="To: wallet address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="flex-1 bg-transparent text-[#0c0b0c] text-[14px] outline-none placeholder:text-[#9490AA]"
                />
                <div className="grid grid-cols-2 gap-0.5 opacity-40">
                  <div className="w-2 h-2 border border-[#796EB2] rounded-sm" />
                  <div className="w-2 h-2 border border-[#796EB2] rounded-sm" />
                  <div className="w-2 h-2 border border-[#796EB2] rounded-sm" />
                  <div className="w-2 h-2 border border-[#796EB2] rounded-sm" />
                </div>
              </div>

              {/* Recently used */}
              <div className="mb-4">
                <div className="flex items-center gap-1.5 text-[12px] text-[#9490AA] mb-2 px-1">
                  <span>🕐</span>
                  <span>Recently used</span>
                </div>
                <div className="space-y-1.5">
                  {RECENT_ADDRESSES.map((a) => (
                    <button
                      key={a.address}
                      onClick={() => setAddress(a.full)}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl border transition-all ${
                        address === a.full
                          ? 'bg-[#F5F3FC] border-[#796EB2]/40'
                          : 'bg-[#FAFAF9] border-[#EBEBF0] hover:bg-[#F5F3FC] hover:border-[#796EB2]/30'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#F0EFF5] flex items-center justify-center flex-shrink-0">
                        <WalletIcon size={16} color="#796EB2" />
                      </div>
                      <div className="text-left">
                        <p className="text-[13px] font-semibold text-[#0c0b0c]">{a.address}</p>
                        <p className="text-[11px] text-[#9490AA]">{a.label}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                disabled={!address}
                onClick={() => setStep(2)}
                className="w-full py-3 rounded-xl text-[15px] font-semibold transition-all"
                style={{
                  background: address ? '#796EB2' : '#F0EFF5',
                  color: address ? 'white' : '#9490AA',
                }}
              >
                Continue
              </button>
            </div>
          )}

          {/* STEP 2 — Enter Amount */}
          {step === 2 && (
            <div>
              {/* Big amount display */}
              <div className="text-center mb-4">
                <div className="flex items-baseline justify-center gap-2 mb-1">
                  <span className="text-5xl font-bold text-[#0c0b0c]">{amount}</span>
                  <span className="text-2xl text-[#9490AA]">USDC</span>
                </div>
                <p className="text-[13px] text-[#796EB2] font-medium">€{AVAILABLE.toFixed(2)} available</p>
              </div>

              {/* Address pill */}
              <div className="flex items-center justify-between bg-[#F7F6FB] border border-[#EBEBF0] rounded-xl px-4 py-2.5 mb-4">
                <div className="flex items-center gap-2">
                  <WalletIcon size={16} color="#796EB2" />
                  <span className="text-[13px] text-[#0c0b0c] font-medium">
                    {address.length > 12 ? address.slice(0, 6) + '...' + address.slice(-4) : address}
                  </span>
                </div>
                <button onClick={() => setStep(1)} className="text-[13px] text-[#796EB2] font-semibold hover:text-[#5b616e] transition-colors">
                  Change
                </button>
              </div>

              {/* Numpad */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {['1','2','3','4','5','6','7','8','9','.','0','del'].map((k) => (
                  <button
                    key={k}
                    onClick={() => handleKey(k)}
                    className="py-4 rounded-xl text-[18px] font-semibold text-[#0c0b0c] bg-[#F7F6FB] hover:bg-[#EBEBF0] active:bg-[#796EB2]/20 transition-all flex items-center justify-center border border-[#EBEBF0]"
                  >
                    {k === 'del' ? <Delete className="w-5 h-5 text-[#9490AA]" /> : k}
                  </button>
                ))}
              </div>

              <button
                disabled={numericAmount <= 0 || numericAmount > AVAILABLE}
                onClick={() => setStep(3)}
                className="w-full py-3 rounded-xl text-[15px] font-semibold transition-all"
                style={{
                  background: numericAmount > 0 && numericAmount <= AVAILABLE ? '#796EB2' : '#F0EFF5',
                  color: numericAmount > 0 && numericAmount <= AVAILABLE ? 'white' : '#9490AA',
                }}
              >
                Continue
              </button>
            </div>
          )}

          {/* STEP 3 — Confirm */}
          {step === 3 && (
            <div>
              {/* Big amount */}
              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-bold text-[#0c0b0c]">{parseFloat(amount).toFixed(2)}</span>
                  <span className="text-2xl text-[#9490AA]">USDC</span>
                </div>
              </div>

              {/* Details */}
              <div className="bg-[#F7F6FB] border border-[#EBEBF0] rounded-2xl p-4 space-y-3 mb-4">
                {[
                  { label: 'Amount', value: `${parseFloat(amount).toFixed(2)} USDC` },
                  { label: 'Fee', value: `${FEE.toFixed(2)} USDC` },
                  { label: 'You send', value: `${youSend.toFixed(2)} USDC`, bold: true },
                  { label: 'To', value: 'Recipient', bold: true },
                  { label: 'Address', value: address.length > 12 ? address.slice(0, 6) + '...' + address.slice(-4) : address, purple: true },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between">
                    <span className="text-[13px] text-[#9490AA]">{row.label}</span>
                    <span className={`text-[13px] ${row.purple ? 'text-[#796EB2] font-semibold' : row.bold ? 'text-[#0c0b0c] font-bold' : 'text-[#0c0b0c]'}`}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Warning */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-5">
                <p className="text-[13px] font-bold text-amber-700 mb-0.5">Double check the address</p>
                <p className="text-[12px] text-amber-600">Sending to the wrong address cannot be reversed.</p>
              </div>

              <button
                onClick={() => setStep(4)}
                className="w-full py-3 rounded-xl text-[15px] font-semibold text-white mb-2 transition-all"
                style={{ background: '#796EB2' }}
              >
                Confirm send
              </button>
              <button
                onClick={() => setStep(2)}
                className="w-full py-3 rounded-xl text-[15px] font-semibold text-[#9490AA] hover:text-[#0c0b0c] transition-colors bg-[#F7F6FB] border border-[#EBEBF0]"
              >
                Back
              </button>
            </div>
          )}

          {/* STEP 4 — Sent */}
          {step === 4 && (
            <div className="text-center py-4">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-[#0c0b0c] mb-2">Sent!</h3>
              <p className="text-[14px] text-[#5b616e] mb-1">
                {parseFloat(amount).toFixed(2)} USDC sent successfully
              </p>
              <p className="text-[13px] text-[#796EB2] font-semibold mb-8">
                {address.length > 12 ? address.slice(0, 6) + '...' + address.slice(-4) : address}
              </p>
              <button
                onClick={handleClose}
                className="w-full py-3 rounded-xl text-[15px] font-semibold text-white transition-all"
                style={{ background: '#796EB2' }}
              >
                Done
              </button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}