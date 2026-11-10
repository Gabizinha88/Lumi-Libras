import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { UserAccount, registerUser, loginUser, saveAccount } from '../../utils/auth';
import { signInWithGoogleReal, registerWithFirebaseEmail, loginWithFirebaseEmail } from '../../services/firebase';

interface AuthModalProps {
  isOpen: boolean;
  initialTab?: 'login' | 'register';
  onClose: () => void;
  onSuccess: (user: UserAccount) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialTab = 'login',
  onClose,
  onSuccess
}) => {
  const [tab, setTab] = useState<'login' | 'register'>(initialTab);

  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const fbUser = await loginWithFirebaseEmail(loginEmail, loginPassword);
      saveAccount(fbUser);
      setSuccessNotice(`Bem-vindo de volta, ${fbUser.name}!`);
      setTimeout(() => {
        onSuccess(fbUser);
        onClose();
      }, 400);
      return;
    } catch {
      // Fallback para login de contas locais salvas
      const res = loginUser(loginEmail, loginPassword);
      if (!res.success || !res.user) {
        setErrorMessage(res.error || 'Conta não encontrada ou senha incorreta.');
        return;
      }

      setSuccessNotice(`Bem-vindo de volta, ${res.user.name}!`);
      setTimeout(() => {
        onSuccess(res.user!);
        onClose();
      }, 400);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      // Tenta cadastrar diretamente no Firebase Auth
      const fbUser = await registerWithFirebaseEmail(registerName, registerEmail, registerPassword);
      saveAccount(fbUser);
      setSuccessNotice(`Conta criada no Firebase! Bem-vindo, ${fbUser.name}!`);
      setTimeout(() => {
        onSuccess(fbUser);
        onClose();
      }, 450);
      return;
    } catch (fbErr: unknown) {
      const msg = fbErr instanceof Error ? fbErr.message : String(fbErr);
      if (msg.includes('email-already-in-use')) {
        setErrorMessage('Este e-mail já está cadastrado no Firebase. Faça login!');
        return;
      }

      // Fallback para cadastro local (caso o provedor Email no Console ainda esteja desligado)
      const res = registerUser(registerName, registerEmail, registerPassword, 'geral');
      if (!res.success || !res.user) {
        setErrorMessage(res.error || 'Erro ao cadastrar.');
        return;
      }

      setSuccessNotice(`Conta criada! Bem-vindo, ${res.user.name}!`);
      setTimeout(() => {
        onSuccess(res.user!);
        onClose();
      }, 450);
    }
  };

  const handleGoogleAuth = async () => {
    setErrorMessage(null);
    setIsLoadingGoogle(true);
    try {
      const googleUser = await signInWithGoogleReal();
      saveAccount(googleUser);
      setSuccessNotice(`Conectado com Google: ${googleUser.name}!`);
      setTimeout(() => {
        onSuccess(googleUser);
        onClose();
      }, 400);
    } catch (err: unknown) {
      console.error('Falha no login Google:', err);
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('popup-closed-by-user') || msg.includes('cancelled')) {
        setErrorMessage('A janela de login do Google foi fechada.');
      } else {
        setErrorMessage('Erro ao conectar com o Google. Tente novamente.');
      }
    } finally {
      setIsLoadingGoogle(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white dark:bg-[#111C35] rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800 relative max-h-[92vh] overflow-y-auto text-left transform transition-all duration-200 animate-in fade-in zoom-in-95">
        {/* Close Button */}
        <button
          aria-label="Fechar janela"
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Brand Logo Header */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-xl overflow-hidden shrink-0 shadow-2xs">
            <img
              src="/assets/logo_stitch.png"
              onError={(e) => {
                // Fallback to URL if local file is missing
                (e.currentTarget as HTMLImageElement).src =
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuBW9N146_koeeKHAoTrsuhr2gb5lxr_2jLTF2q96K-l87-NHXh_QkFuHjLP7gDu2n8-cARGADgseE6myD9_Mz2TLiaZS1y7PwEA40289iy9k9CstyIHqZUBF5V2-aywlWkT3_IMC7Ppi_UzoXqgM4zyzdNSkj1VPruFClDXV-wZVVmNov4TfpxBVyeodhVkD-e_KJ_o6b0NWUQurU0I6FkpMJDammbpYGMpTwUzOreLYZtdZ6kS7blSM4PC957vbkod-zY';
              }}
              alt="Logo Lumi Libras"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-2xl font-black tracking-tight text-[#2952E3] font-outfit">
            lumi<span className="text-[#FFC800]">libras</span>
          </span>
        </div>

        {/* Tactile Tab Switcher */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-6">
          <button
            type="button"
            onClick={() => {
              setTab('login');
              setErrorMessage(null);
            }}
            className={`py-2.5 rounded-xl font-black text-xs sm:text-sm tracking-wide uppercase transition-all cursor-pointer ${
              tab === 'login'
                ? 'bg-white dark:bg-[#1A2644] text-[#2952E3] dark:text-sky-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => {
              setTab('register');
              setErrorMessage(null);
            }}
            className={`py-2.5 rounded-xl font-black text-xs sm:text-sm tracking-wide uppercase transition-all cursor-pointer ${
              tab === 'register'
                ? 'bg-white dark:bg-[#1A2644] text-[#2952E3] dark:text-sky-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            Cadastrar-se
          </button>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success Notification */}
        {successNotice && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successNotice}</span>
          </div>
        )}

        {/* ===================== TAB 1: LOGIN ===================== */}
        {tab === 'login' && (
          <div>
            <div className="text-center mb-5">
              <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight font-outfit">
                Bem-vindo de volta! 👋
              </h2>
              <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">
                Continue sua jornada de aprendizado
              </p>
            </div>

            <form className="space-y-3.5" onSubmit={handleLoginSubmit}>
              <div>
                <label className="block text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  E-mail ou Usuário
                </label>
                <input
                  type="text"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-700 dark:text-slate-100 placeholder-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-[#2952E3] focus:ring-0 transition-colors"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                    Senha
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      if (!loginEmail) {
                        setLoginEmail('aluno@lumilibras.com');
                        setLoginPassword('123456');
                      }
                    }}
                    className="text-[11px] font-black text-[#2952E3] hover:underline uppercase cursor-pointer"
                  >
                    Auto-preencher demo
                  </button>
                </div>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Sua senha secreta"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-700 dark:text-slate-100 placeholder-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-[#2952E3] focus:ring-0 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="btn-3d btn-primary-3d w-full py-3.5 rounded-2xl text-white font-black text-sm uppercase tracking-wider block mt-3 shadow-md hover:shadow-lg cursor-pointer"
              >
                Entrar na Conta
              </button>
            </form>

            {/* Separator */}
            <div className="relative my-5 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
              </div>
              <span className="relative bg-white dark:bg-[#111C35] px-3 text-xs font-black text-slate-400 uppercase tracking-widest">
                ou
              </span>
            </div>

            {/* Google Login Button */}
            <div>
              <button
                type="button"
                disabled={isLoadingGoogle}
                onClick={handleGoogleAuth}
                className="btn-social-3d w-full py-2.5 px-4 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center gap-3 transition-colors cursor-pointer disabled:opacity-60"
              >
                {isLoadingGoogle ? (
                  <Loader2 className="w-4 h-4 animate-spin text-[#2952E3]" />
                ) : (
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      fill="#EA4335"
                    />
                  </svg>
                )}
                <span className="text-xs font-black text-slate-700 dark:text-slate-200 uppercase tracking-wide">
                  {isLoadingGoogle ? 'Conectando ao Google...' : 'Continuar com Google'}
                </span>
              </button>
            </div>

            {/* Switch to Register */}
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Não tem conta?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setTab('register');
                    setErrorMessage(null);
                  }}
                  className="font-black text-[#2952E3] dark:text-sky-400 uppercase hover:underline ml-1 cursor-pointer"
                >
                  Cadastre-se grátis
                </button>
              </p>
            </div>
          </div>
        )}

        {/* ===================== TAB 2: REGISTER ===================== */}
        {tab === 'register' && (
          <div>
            <div className="text-center mb-5">
              <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight font-outfit">
                Crie sua conta grátis 🚀
              </h2>
              <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">
                Comece do zero e aprenda Libras brincando
              </p>
            </div>

            <form className="space-y-3.5" onSubmit={handleRegisterSubmit}>
              <div>
                <label className="block text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Seu Nome
                </label>
                <input
                  type="text"
                  required
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  placeholder="Como quer ser chamado?"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-700 dark:text-slate-100 placeholder-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-[#2952E3] focus:ring-0 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  E-mail
                </label>
                <input
                  type="email"
                  required
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-700 dark:text-slate-100 placeholder-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-[#2952E3] focus:ring-0 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Criar Senha
                </label>
                <input
                  type="password"
                  required
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  placeholder="Mínimo 4 caracteres"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-700 dark:text-slate-100 placeholder-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:border-[#2952E3] focus:ring-0 transition-colors"
                />
              </div>



              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[11px] font-semibold text-amber-800 dark:text-amber-200 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Sua conta começará na primeira fase da trilha, pronta para avançar!</span>
              </div>

              <button
                type="submit"
                className="btn-3d btn-primary-3d w-full py-3.5 rounded-2xl text-white font-black text-sm uppercase tracking-wider block mt-3 shadow-md hover:shadow-lg cursor-pointer"
              >
                Criar Minha Conta
              </button>
            </form>

            {/* Switch to Login */}
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Já tem uma conta?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setTab('login');
                    setErrorMessage(null);
                  }}
                  className="font-black text-[#2952E3] dark:text-sky-400 uppercase hover:underline ml-1 cursor-pointer"
                >
                  Fazer login
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
