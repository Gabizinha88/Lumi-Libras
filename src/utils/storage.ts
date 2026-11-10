import { UserStats } from '../types';

export const STORAGE_KEY = 'lumi_libras_user_data_v2';

export interface SavedUserData {
  stats: UserStats;
  lastActiveDate: string; // YYYY-MM-DD
  completedTrailNodes: string[]; // e.g. ['node-1', 'node-2']
  unlockedAchievements: string[];
  unlockedStickers: string[];
  memoryGameWins: number;
}

export const DEFAULT_USER_DATA: SavedUserData = {
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
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedTrailNodes: [], // Início do zero absoluto: nenhuma lição terminada ainda!
  unlockedAchievements: [],
  unlockedStickers: [],
  memoryGameWins: 0
};

export const getLocalDateString = (d: Date = new Date()): string => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getTodayDateString = (): string => {
  return getLocalDateString(new Date());
};

export const getYesterdayDateString = (): string => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return getLocalDateString(d);
};

export const getLevelTitle = (level: number): string => {
  if (level <= 1) return 'Lumi Aprendiz';
  if (level === 2) return 'Explorador de Sinais';
  if (level === 3) return 'Lumi Explorer';
  if (level === 4) return 'Mestre dos Cumprimentos';
  if (level === 5) return 'Guardião das Mãos';
  return 'Campeão de Libras';
};

/**
 * Carrega os dados salvos do localStorage com validação de sequência diária (streak).
 */
export const loadUserData = (): SavedUserData => {
  if (typeof window === 'undefined') {
    return DEFAULT_USER_DATA;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // First time loading - save defaults and return
      saveUserData(DEFAULT_USER_DATA);
      return DEFAULT_USER_DATA;
    }

    const parsed: SavedUserData = JSON.parse(raw);
    const today = getTodayDateString();
    const yesterday = getYesterdayDateString();

    const updatedStats = { ...parsed.stats };

    // Validar Sequência Diária com base na data
    if (parsed.lastActiveDate === today) {
      // Já acessou hoje, mantém status de hoje
      // todayCompleted permanece o que estiver salvo
    } else if (parsed.lastActiveDate === yesterday) {
      // Último acesso foi ontem: a sequência continua viva!
      // Mas a lição de hoje ainda precisa ser feita
      updatedStats.todayCompleted = false;
    } else {
      // Passou mais de 1 dia: a sequência foi interrompida
      updatedStats.streakDays = 1;
      updatedStats.todayCompleted = false;
    }

    // Recalcular título do nível
    updatedStats.levelTitle = getLevelTitle(updatedStats.level);

    // Dark mode check com localStorage separado para compatibilidade
    const savedDark = localStorage.getItem('lumi_dark_mode');
    if (savedDark !== null) {
      updatedStats.darkMode = savedDark === 'true';
    }

    const updatedData: SavedUserData = {
      ...parsed,
      stats: updatedStats,
      completedTrailNodes: parsed.completedTrailNodes || [],
      unlockedAchievements: parsed.unlockedAchievements || [],
      unlockedStickers: parsed.unlockedStickers || []
    };

    return updatedData;
  } catch (err) {
    console.error('Erro ao carregar dados do usuário:', err);
    return DEFAULT_USER_DATA;
  }
};

/**
 * Salva os dados do usuário no localStorage.
 */
export const saveUserData = (data: SavedUserData): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    localStorage.setItem('lumi_dark_mode', String(data.stats.darkMode));
  } catch (err) {
    console.error('Erro ao salvar dados no localStorage:', err);
  }
};
