import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  getDocFromServer
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { UserAccount, createInitialUserProgress } from '../utils/auth';

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

/* CRITICAL: Passing firestoreDatabaseId is required by AI Studio environment */
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map((p) => ({
        providerId: p.providerId,
        email: p.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Test connection on boot
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase Firestore: cliente offline ou aguardando conexão.');
    }
  }
}
testConnection();

/**
 * Salva ou atualiza os dados completos do usuário no Firestore
 */
export async function saveUserToFirestore(user: UserAccount): Promise<void> {
  // Somente grava no Firestore se o usuário estiver autenticado no Firebase com este UID
  if (!auth.currentUser || auth.currentUser.uid !== user.id) {
    return;
  }

  const path = `users/${user.id}`;
  try {
    const userDocRef = doc(db, 'users', user.id);
    await setDoc(userDocRef, {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role || 'geral',
      avatar: user.avatar || '🌟',
      createdAt: user.createdAt,
      lastActiveDate: user.lastActiveDate,
      stats: user.stats,
      completedTrailNodes: user.completedTrailNodes || [],
      seenAlphabetLetters: user.seenAlphabetLetters || [],
      practicedWords: user.practicedWords || [],
      unlockedAchievements: user.unlockedAchievements || [],
      unlockedStickers: user.unlockedStickers || [],
      memoryGameWins: user.memoryGameWins || 0
    }, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

/**
 * Carrega os dados de um usuário do Firestore
 */
export async function loadUserFromFirestore(userId: string): Promise<UserAccount | null> {
  // Somente busca no Firestore se o cliente estiver autenticado no Firebase com este UID
  if (!auth.currentUser || auth.currentUser.uid !== userId) {
    return null;
  }

  const path = `users/${userId}`;
  try {
    const userDocRef = doc(db, 'users', userId);
    const snap = await getDoc(userDocRef);
    if (!snap.exists()) {
      return null;
    }
    const data = snap.data() as Partial<UserAccount>;
    return {
      id: data.id || userId,
      name: data.name || 'Aluno Lumi',
      email: data.email || '',
      role: data.role || 'geral',
      avatar: data.avatar || '🌟',
      createdAt: data.createdAt || new Date().toISOString(),
      lastActiveDate: data.lastActiveDate || new Date().toISOString().split('T')[0],
      stats: data.stats || {
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
      completedTrailNodes: data.completedTrailNodes || [],
      seenAlphabetLetters: data.seenAlphabetLetters || [],
      practicedWords: data.practicedWords || [],
      unlockedAchievements: data.unlockedAchievements || [],
      unlockedStickers: data.unlockedStickers || [],
      memoryGameWins: data.memoryGameWins || 0
    };
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, path);
    return null;
  }
}

/**
 * Login com Google real usando popup do Firebase
 */
export async function signInWithGoogleReal(): Promise<UserAccount> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const firebaseUser: FirebaseUser = result.user;
    
    // Tenta carregar documento existente do Firestore
    let existingUser = await loadUserFromFirestore(firebaseUser.uid);
    if (!existingUser) {
      // Primeira vez desse usuário: cria conta limpa com nome e foto reais do Google
      const displayName = firebaseUser.displayName || 'Aventureiro Lumi';
      const email = firebaseUser.email || 'usuario@google.com';
      existingUser = createInitialUserProgress(displayName, email, 'geral', firebaseUser.uid);
      
      // Salva no Firestore
      await saveUserToFirestore(existingUser);
    }

    return existingUser;
  } catch (err: unknown) {
    console.error('Erro na autenticação Google:', err);
    throw err;
  }
}

/**
 * Registra novo usuário com E-mail e Senha no Firebase Auth e cria o perfil no Firestore
 */
export async function registerWithFirebaseEmail(
  name: string,
  email: string,
  password: string
): Promise<UserAccount> {
  const userCredential = await createUserWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
  const firebaseUser = userCredential.user;
  const newUser = createInitialUserProgress(
    name.trim() || 'Aventureiro Lumi', 
    firebaseUser.email || email, 
    'geral', 
    firebaseUser.uid
  );
  await saveUserToFirestore(newUser);
  return newUser;
}

/**
 * Login com E-mail e Senha no Firebase Auth e carrega o perfil do Firestore
 */
export async function loginWithFirebaseEmail(
  email: string,
  password: string
): Promise<UserAccount> {
  const userCredential = await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
  const firebaseUser = userCredential.user;
  let user = await loadUserFromFirestore(firebaseUser.uid);
  if (!user) {
    user = createInitialUserProgress(
      firebaseUser.displayName || 'Aventureiro Lumi', 
      firebaseUser.email || email, 
      'geral', 
      firebaseUser.uid
    );
    await saveUserToFirestore(user);
  }
  return user;
}

/**
 * Logout do Firebase
 */
export async function signOutFirebase(): Promise<void> {
  try {
    await firebaseSignOut(auth);
  } catch (err) {
    console.error('Erro ao deslogar do Firebase:', err);
  }
}
