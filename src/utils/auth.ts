import { UserStats } from '../types';
import { getTodayDateString } from './storage';

export type LearnerRole = 'geral' | 'crianca' | 'familia' | 'educador';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  passwordHash?: string;
  role: LearnerRole;
  avatar: string;
  createdAt: string;
  stats: UserStats;
  completedTrailNodes: string[];
  seenAlphabetLetters?: string[];
  practicedWords?: string[];
  unlockedAchievements: string[];
  unlockedStickers: string[];
  memoryGameWins: number;
  lastActiveDate: string;
}

const USERS_STORAGE_KEY = 'lumi_libras_accounts_v1';
const CURRENT_SESSION_KEY = 'lumi_libras_active_session_id';

/**
 * Cria o estado inicial 100% limpo para um novo usuário:
 * Trilha do zero, sem fases prontas, 0 estrelas, 0 streak.
 * Jogo educativo para todos (geral, sem divisão de categoria).
 */
export const createInitialUserProgress = (
  name: string,
  email: string,
  role: LearnerRole = 'geral',
  idOverride?: string
): UserAccount => {
  const roleAvatar = role === 'educador' ? '🎓' : role === 'familia' ? '🏡' : role === 'crianca' ? '🧒' : '🌟';

  return {
    id: idOverride || `user_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: name.trim() || 'Aventureiro Lumi',
    email: email.trim().toLowerCase(),
    role: role || 'geral',
    avatar: roleAvatar,
    createdAt: new Date().toISOString(),
    stats: {
      stars: 0,
      streakDays: 0,
      xp: 0,
      level: 1,
      levelTitle: 'Lumi Aprendiz',
      todayCompleted: false,
      soundEnabled: true,
      highContrast: false,
      darkMode: false,
      fontSize: 'normal'
    },
    completedTrailNodes: [], // Início limpo: NENHUMA fase concluída previamente! Apenas a Fase 1 está aberta para jogar.
    seenAlphabetLetters: ['A'], // Letra A explorada inicialmente
    practicedWords: [], // Nenhum sinal praticado inicialmente
    unlockedAchievements: [],
    unlockedStickers: [],
    memoryGameWins: 0,
    lastActiveDate: getTodayDateString()
  };
};

/**
 * Carrega todas as contas salvas
 */
export const getAllAccounts = (): UserAccount[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Erro ao ler contas salvas:', err);
    return [];
  }
};

/**
 * Salva a lista de contas
 */
export const saveAllAccounts = (accounts: UserAccount[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(accounts));
  } catch (err) {
    console.error('Erro ao salvar contas:', err);
  }
};

/**
 * Registra um novo usuário com trilha inicial limpa
 */
export const registerUser = (
  name: string,
  email: string,
  password: string,
  role: LearnerRole = 'geral'
): { success: boolean; error?: string; user?: UserAccount } => {
  const cleanEmail = email.trim().toLowerCase();
  if (!cleanEmail || !name.trim()) {
    return { success: false, error: 'Por favor, preencha nome e e-mail.' };
  }
  if (!password || password.length < 4) {
    return { success: false, error: 'A senha deve ter pelo menos 4 caracteres.' };
  }

  const accounts = getAllAccounts();
  const existing = accounts.find((u) => u.email === cleanEmail);
  if (existing) {
    return { success: false, error: 'Este e-mail já está cadastrado. Faça login!' };
  }

  const newUser = createInitialUserProgress(name, cleanEmail, role);
  newUser.passwordHash = btoa(password); // Codificação básica de senha local

  accounts.push(newUser);
  saveAllAccounts(accounts);
  setCurrentSession(newUser.id);

  return { success: true, user: newUser };
};

/**
 * Realiza login por e-mail e senha
 */
export const loginUser = (
  email: string,
  password: string
): { success: boolean; error?: string; user?: UserAccount } => {
  const cleanEmail = email.trim().toLowerCase();
  const accounts = getAllAccounts();

  const user = accounts.find((u) => u.email === cleanEmail);
  if (!user) {
    return { success: false, error: 'Conta não encontrada com este e-mail. Crie uma conta grátis!' };
  }

  if (user.passwordHash && user.passwordHash !== btoa(password)) {
    return { success: false, error: 'Senha incorreta. Tente novamente.' };
  }

  setCurrentSession(user.id);
  return { success: true, user };
};

/**
 * Login com Google (Simulação autenticada com conta do usuário)
 */
export const loginWithGoogle = (
  defaultName = 'Aluno Lumi',
  defaultEmail = 'aluno@lumilibras.com'
): UserAccount => {
  const accounts = getAllAccounts();
  let user = accounts.find((u) => u.email === defaultEmail);

  if (!user) {
    user = createInitialUserProgress(defaultName, defaultEmail, 'crianca');
    user.avatar = '🌟';
    accounts.push(user);
    saveAllAccounts(accounts);
  }

  setCurrentSession(user.id);
  return user;
};

/**
 * Obtém a sessão ativa
 */
export const getCurrentSession = (): UserAccount | null => {
  if (typeof window === 'undefined') return null;
  const activeId = localStorage.getItem(CURRENT_SESSION_KEY);
  if (!activeId) return null;

  const accounts = getAllAccounts();
  const user = accounts.find((u) => u.id === activeId);
  return user || null;
};

/**
 * Define a sessão ativa
 */
export const setCurrentSession = (userId: string | null): void => {
  if (typeof window === 'undefined') return;
  if (!userId) {
    localStorage.removeItem(CURRENT_SESSION_KEY);
  } else {
    localStorage.setItem(CURRENT_SESSION_KEY, userId);
  }
};

/**
 * Atualiza o progresso do usuário ativo
 */
export const syncUserProgress = (
  userId: string,
  updates: Partial<UserAccount>
): void => {
  const accounts = getAllAccounts();
  const index = accounts.findIndex((u) => u.id === userId);
  if (index === -1) return;

  accounts[index] = {
    ...accounts[index],
    ...updates,
    lastActiveDate: getTodayDateString()
  };

  saveAllAccounts(accounts);
};

/**
 * Salva ou atualiza uma conta individual e define como sessão ativa
 */
export const saveAccount = (user: UserAccount): void => {
  const accounts = getAllAccounts();
  const index = accounts.findIndex((u) => u.id === user.id);
  if (index >= 0) {
    accounts[index] = user;
  } else {
    accounts.push(user);
  }
  saveAllAccounts(accounts);
  setCurrentSession(user.id);
};

/**
 * Logout
 */
export const logoutUser = (): void => {
  setCurrentSession(null);
};
