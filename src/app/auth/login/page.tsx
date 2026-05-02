'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Eye, EyeOff, Check, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { findUser, createUser, verifyPassword, saveSession } from '../../lib/auth';

type Step = 'login' | 'register-email' | 'register-telegram';

export default function LoginPage() {
  const router = useRouter();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [step, setStep] = useState<Step>('login');
  const [regUsername, setRegUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [connectedEmail, setConnectedEmail] = useState('');
  const [connectedTelegramId, setConnectedTelegramId] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const passwordValid = regPassword.length >= 8;
  const passwordsMatch = regPassword === confirmPassword;
  const canRegister = regUsername.trim() && nickname.trim() && passwordValid && passwordsMatch;

  const handleLogin = () => {
    setError('');
    if (!username || !password) {
      setError('Username va parolni kiriting');
      return;
    }
    setLoading(true);
    const user = findUser({ email: username });
    if (!user) { setError('Bunday foydalanuvchi topilmadi'); setLoading(false); return; }
    if (!verifyPassword(user, password)) { setError('Noto\'g\'ri parol'); setLoading(false); return; }
    saveSession(user);
    router.push('/');
  };

  const handleGmailConnect = () => {
    setLoading(true); setError('');
    setTimeout(() => {
      const mockEmail = 'user' + Math.floor(Math.random() * 1000) + '@gmail.com';
      const existingUser = findUser({ email: mockEmail });
      if (existingUser) { saveSession(existingUser); router.push('/'); }
      else { setConnectedEmail(mockEmail); setRegUsername(''); setNickname(''); setRegPassword(''); setConfirmPassword(''); setStep('register-email'); }
      setLoading(false);
    }, 1500);
  };

  const handleTelegramConnect = () => {
    setLoading(true); setError('');
    setTimeout(() => {
      const mockTelegramId = 'tg_' + Math.random().toString(36).substring(2, 10);
      const existingUser = findUser({ telegramId: mockTelegramId });
      if (existingUser) { saveSession(existingUser); router.push('/'); }
      else { setConnectedTelegramId(mockTelegramId); setRegUsername(''); setNickname(''); setRegPassword(''); setConfirmPassword(''); setStep('register-telegram'); }
      setLoading(false);
    }, 1500);
  };

  const handleEmailRegister = () => {
    setError('');
    if (!canRegister) { setError('Barcha maydonlarni to\'g\'ri to\'ldiring'); return; }
    setLoading(true);
    const existingUsername = findUser({ email: regUsername });
    if (existingUsername) { setError('Bu username band. Boshqasini tanlang'); setLoading(false); return; }
    const user = createUser({ email: connectedEmail, nickname, password: regPassword });
    if (typeof window !== 'undefined') {
      const users = JSON.parse(localStorage.getItem('kawaiiuz_users') || '[]');
      const idx = users.findIndex((u: any) => u.id === user.id);
      if (idx !== -1) { users[idx].username = regUsername; localStorage.setItem('kawaiiuz_users', JSON.stringify(users)); }
    }
    saveSession({ ...user, nickname, email: connectedEmail } as any);
    router.push('/');
  };

  const handleTelegramRegister = () => {
    setError('');
    if (!canRegister) { setError('Barcha maydonlarni to\'g\'ri to\'ldiring'); return; }
    setLoading(true);
    const existingUsername = findUser({ email: regUsername });
    if (existingUsername) { setError('Bu username band. Boshqasini tanlang'); setLoading(false); return; }
    const user = createUser({ telegramId: connectedTelegramId, nickname, password: regPassword });
    if (typeof window !== 'undefined') {
      const users = JSON.parse(localStorage.getItem('kawaiiuz_users') || '[]');
      const idx = users.findIndex((u: any) => u.id === user.id);
      if (idx !== -1) { users[idx].username = regUsername; localStorage.setItem('kawaiiuz_users', JSON.stringify(users)); }
    }
    saveSession({ ...user, nickname, telegramId: connectedTelegramId } as any);
    router.push('/');
  };

  return (
    <div className="min-h-screen flex">
      
      {/* Левая половина — Маскот на весь экран */}
      <div className="hidden md:block w-[45%] bg-[#1c1628] relative overflow-hidden">
        <Image
          src="/images/mascot.webp"
          alt="KawaiiUZ maskot"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Правая половина — Форма */}
      <div className="w-full md:w-[55%] bg-[#0f0b1a] flex items-center justify-center p-6 md:p-10">
        
        <div className="w-full max-w-[420px]">
          <AnimatePresence mode="wait">
            
            {/* Вход */}
            {step === 'login' && (
              <motion.div
                key="login"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Маскот на мобилке */}
                <div className="md:hidden text-center mb-8">
                  <div className="w-40 h-40 mx-auto mb-4 relative rounded-2xl overflow-hidden">
                    <Image
                      src="/images/mascot.webp"
                      alt="KawaiiUZ maskot"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-1">Kirish</h2>
                  <p className="text-gray-400 text-sm">Hisobingizga kiring</p>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4 flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle size={16} /> {error}
                  </div>
                )}

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-gray-400 text-xs mb-1.5 block font-medium">Username</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username kiriting"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8a60c2] transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs mb-1.5 block font-medium">Parol</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Parolingizni kiriting"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-[#8a60c2] transition-all text-sm"
                      />
                      <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    <div className="text-right mt-1.5">
                      <a href="#" className="text-[#8a60c2] text-xs hover:underline">Parolni unutdingizmi?</a>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleLogin}
                  disabled={loading || !username || !password}
                  className="w-full bg-[#8a60c2] hover:bg-[#7a50b2] disabled:bg-gray-700 disabled:text-gray-500 text-white font-semibold py-3 rounded-lg transition-all mb-6 text-sm"
                >
                  {loading ? 'Yuklanmoqda...' : 'Kirish'}
                </button>

                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 h-px bg-white/8" />
                  <span className="text-gray-500 text-xs">yoki</span>
                  <div className="flex-1 h-px bg-white/8" />
                </div>

                <div className="flex gap-3 mb-6">
                  <button onClick={handleGmailConnect} disabled={loading} className="flex-1 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg py-3 transition-all">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="white">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </button>
                  <button onClick={handleTelegramConnect} disabled={loading} className="flex-1 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg py-3 transition-all">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="white">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.082l.188-3.172 5.773-5.214c.254-.226-.054-.352-.397-.126l-7.132 4.493-3.074-1.006c-.667-.208-.68-.667.138-.988l12.026-4.635c.557-.208 1.042.126.866.989z"/>
                    </svg>
                  </button>
                </div>

                <p className="text-center text-gray-400 text-sm">
                  Hisobingiz yo&apos;qmi?{' '}
                  <button
                    onClick={() => { setError(''); setConnectedEmail(''); setRegUsername(''); setNickname(''); setRegPassword(''); setConfirmPassword(''); setStep('register-email'); }}
                    className="text-[#8a60c2] hover:text-[#9a70d2] font-semibold transition"
                  >
                    Ro&apos;yxatdan o&apos;tish
                  </button>
                </p>
              </motion.div>
            )}

            {/* Регистрация через Gmail */}
            {step === 'register-email' && (
              <motion.div
                key="register-email"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <button onClick={() => setStep('login')} className="text-gray-400 hover:text-white mb-6 flex items-center gap-1.5 transition">
                  <ArrowLeft size={18} /> <span className="text-sm">Orqaga</span>
                </button>

                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-1">Ro&apos;yxatdan o&apos;tish</h2>
                  <p className="text-gray-400 text-sm">Yangi hisob yarating</p>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4 flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle size={16} /> {error}
                  </div>
                )}

                <div className="space-y-4 mb-5">
                  <div>
                    <label className="text-gray-400 text-xs mb-1.5 block font-medium">
                      Username <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={regUsername}
                      onChange={(e) => setRegUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                      placeholder="username_tanlang"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8a60c2] transition-all text-sm"
                    />
                    <p className="text-gray-500 text-[11px] mt-1">Faqat harflar, raqamlar va _ belgisi. Keyin o&apos;zgartirib bo&apos;lmaydi</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs mb-1.5 block font-medium">Nik-neym</label>
                    <input
                      type="text"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      placeholder="Ko&apos;rinadigan ismingiz"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8a60c2] transition-all text-sm"
                    />
                    <p className="text-gray-500 text-[11px] mt-1">Keyinchalik o&apos;zgartirish mumkin</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs mb-1.5 block font-medium">Parol (kamida 8 ta belgi)</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="Parolingizni yarating"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-[#8a60c2] transition-all text-sm"
                      />
                      <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {regPassword.length > 0 && (
                      <div className="flex items-center gap-1.5 mt-1.5">
                        {passwordValid ? <Check size={14} className="text-green-400" /> : <AlertCircle size={14} className="text-red-400" />}
                        <span className={`text-xs ${passwordValid ? 'text-green-400' : 'text-red-400'}`}>Kamida 8 ta belgi</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs mb-1.5 block font-medium">Parolni tasdiqlang</label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Parolni qaytaring"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8a60c2] transition-all text-sm"
                    />
                    {confirmPassword.length > 0 && (
                      <div className="flex items-center gap-1.5 mt-1.5">
                        {passwordsMatch ? <Check size={14} className="text-green-400" /> : <AlertCircle size={14} className="text-red-400" />}
                        <span className={`text-xs ${passwordsMatch ? 'text-green-400' : 'text-red-400'}`}>Parollar mos keladi</span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleEmailRegister}
                  disabled={loading || !canRegister}
                  className="w-full bg-[#8a60c2] hover:bg-[#7a50b2] disabled:bg-gray-700 disabled:text-gray-500 text-white font-semibold py-3 rounded-lg transition-all text-sm"
                >
                  {loading ? 'Yaratilmoqda...' : 'Ro\'yxatdan o\'tish'}
                </button>
              </motion.div>
            )}

            {/* Регистрация через Telegram */}
            {step === 'register-telegram' && (
              <motion.div
                key="register-telegram"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <button onClick={() => setStep('login')} className="text-gray-400 hover:text-white mb-6 flex items-center gap-1.5 transition">
                  <ArrowLeft size={18} /> <span className="text-sm">Orqaga</span>
                </button>

                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-1">Ro&apos;yxatdan o&apos;tish</h2>
                  <p className="text-gray-400 text-sm">Telegram orqali yangi hisob yarating</p>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4 flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle size={16} /> {error}
                  </div>
                )}

                <div className="space-y-4 mb-5">
                  <div>
                    <label className="text-gray-400 text-xs mb-1.5 block font-medium">
                      Username <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={regUsername}
                      onChange={(e) => setRegUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                      placeholder="username_tanlang"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8a60c2] transition-all text-sm"
                    />
                    <p className="text-gray-500 text-[11px] mt-1">Faqat harflar, raqamlar va _ belgisi. Keyin o&apos;zgartirib bo&apos;lmaydi</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs mb-1.5 block font-medium">Nik-neym</label>
                    <input
                      type="text"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      placeholder="Ko&apos;rinadigan ismingiz"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8a60c2] transition-all text-sm"
                    />
                    <p className="text-gray-500 text-[11px] mt-1">Keyinchalik o&apos;zgartirish mumkin</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs mb-1.5 block font-medium">Parol (kamida 8 ta belgi)</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="Parolingizni yarating"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-[#8a60c2] transition-all text-sm"
                      />
                      <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {regPassword.length > 0 && (
                      <div className="flex items-center gap-1.5 mt-1.5">
                        {passwordValid ? <Check size={14} className="text-green-400" /> : <AlertCircle size={14} className="text-red-400" />}
                        <span className={`text-xs ${passwordValid ? 'text-green-400' : 'text-red-400'}`}>Kamida 8 ta belgi</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs mb-1.5 block font-medium">Parolni tasdiqlang</label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Parolni qaytaring"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#8a60c2] transition-all text-sm"
                    />
                    {confirmPassword.length > 0 && (
                      <div className="flex items-center gap-1.5 mt-1.5">
                        {passwordsMatch ? <Check size={14} className="text-green-400" /> : <AlertCircle size={14} className="text-red-400" />}
                        <span className={`text-xs ${passwordsMatch ? 'text-green-400' : 'text-red-400'}`}>Parollar mos keladi</span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleTelegramRegister}
                  disabled={loading || !canRegister}
                  className="w-full bg-[#2AABEE] hover:bg-[#1a9bde] disabled:bg-gray-700 disabled:text-gray-500 text-white font-semibold py-3 rounded-lg transition-all text-sm"
                >
                  {loading ? 'Yaratilmoqda...' : 'Ro\'yxatdan o\'tish'}
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}