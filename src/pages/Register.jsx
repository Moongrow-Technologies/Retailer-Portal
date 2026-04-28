import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    setLoading(true);
    try {
      await base44.auth.register({ email, password });
      navigate('/onboarding');
    } catch (err) {
      setError(err?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F0F5] flex flex-col items-center justify-center px-4 font-outfit">
      {/* Logo */}
      <div className="mb-8">
        <img
          src="https://media.base44.com/images/public/69dfbd88b437bcb793c2b5ca/f5253c7da_MoongrowLogo.png"
          alt="Moongrow"
          className="h-7 w-auto object-contain"
        />
      </div>

      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl border border-[#EBEBF0] shadow-sm p-8">
          <div className="mb-6">
            <h1 className="text-xl font-bold text-[#0E0D1E]">Create your account</h1>
            <p className="text-sm text-[#7A7893] mt-1">Set up your Moongrow retailer portal.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-xs font-semibold text-[#4A4761] uppercase tracking-wide">Email address</Label>
              <Input
                type="email"
                placeholder="you@yourstore.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="mt-1.5 border-[#EBEBF0] focus-visible:ring-[#796EB2]/30 focus-visible:border-[#796EB2]"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold text-[#4A4761] uppercase tracking-wide">Password</Label>
              <div className="relative mt-1.5">
                <Input
                  type={showPw ? 'text' : 'password'}
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="pr-10 border-[#EBEBF0] focus-visible:ring-[#796EB2]/30 focus-visible:border-[#796EB2]"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C0BDCE] hover:text-[#796EB2] transition-colors"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <Label className="text-xs font-semibold text-[#4A4761] uppercase tracking-wide">Confirm password</Label>
              <Input
                type={showPw ? 'text' : 'password'}
                placeholder="Repeat your password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
                className="mt-1.5 border-[#EBEBF0] focus-visible:ring-[#796EB2]/30 focus-visible:border-[#796EB2]"
              />
            </div>

            {error && (
              <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#796EB2] hover:bg-[#6A5FA3] text-white gap-2 mt-1"
              size="lg"
            >
              {loading ? 'Creating account…' : <><span>Create account</span><ArrowRight className="w-4 h-4" /></>}
            </Button>
          </form>

          <p className="text-center text-xs text-[#9490AA] mt-5">
            Already have an account?{' '}
            <button
              onClick={() => base44.auth.redirectToLogin()}
              className="text-[#796EB2] font-semibold hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>

        <p className="text-center text-xs text-[#9490AA] mt-4">
          By signing up you agree to our{' '}
          <a href="#" className="text-[#796EB2] hover:underline">Terms</a>
          {' '}and{' '}
          <a href="#" className="text-[#796EB2] hover:underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}