/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TabType, UserStats } from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { BottomCompanionBar } from './components/BottomCompanionBar';
import { LandingScreen } from './components/screens/LandingScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { TrailScreen } from './components/screens/TrailScreen';
import { AlphabetScreen } from './components/screens/AlphabetScreen';
import { DailySignsScreen } from './components/screens/DailySignsScreen';
import { MemoryGameScreen } from './components/screens/MemoryGameScreen';
import { AchievementsScreen } from './components/screens/AchievementsScreen';
import { CreditsCuriositiesScreen } from './components/screens/CreditsCuriositiesScreen';
import { LessonModal } from './components/modals/LessonModal';
import { HighFiveModal } from './components/modals/HighFiveModal';
import { LumiTipModal } from './components/modals/LumiTipModal';
import { AccessibilityModal } from './components/modals/AccessibilityModal';
import { ProfileModal } from './components/modals/ProfileModal';
import { MediaCreditsModal } from './components/modals/MediaCreditsModal';
import { AuthModal } from './components/modals/AuthModal';
import { playSound } from './utils/sound';
import { 
  getTodayDateString, 
  getLevelTitle 
} from './utils/storage';
import {
  UserAccount,
  getCurrentSession,
  syncUserProgress,
  logoutUser,
  createInitialUserProgress
} from './utils/auth';
import { saveUserToFirestore, signOutFirebase } from './services/firebase';

export default function App() {
  // Current authenticated user session
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => getCurrentSession());

  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('lumilibras_sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  const handleToggleDesktopSidebar = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('lumilibras_sidebar_collapsed', String(next));
      } catch {}
      return next;
    });
  };

  // Active user data (fallback to default clean state if not logged in)
  const [stats, setStats] = useState<UserStats>(() => {
    if (currentUser) return currentUser.stats;
    return {
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
    };
  });

  const [completedTrailNodes, setCompletedTrailNodes] = useState<string[]>(() => {
    return currentUser ? currentUser.completedTrailNodes : [];
  });
  const [seenAlphabetLetters, setSeenAlphabetLetters] = useState<string[]>(() => {
    return currentUser?.seenAlphabetLetters || ['A'];
  });
  const [practicedWords, setPracticedWords] = useState<string[]>(() => {
    return currentUser?.practicedWords || [];
  });
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>(() => {
    return currentUser ? currentUser.unlockedAchievements : [];
  });
  const [unlockedStickers, setUnlockedStickers] = useState<string[]>(() => {
    return currentUser ? currentUser.unlockedStickers : [];
  });

  // Active lesson node to open in LessonModal
  const [activeLessonNodeId, setActiveLessonNodeId] = useState<string>('node-1');

  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authInitialTab, setAuthInitialTab] = useState<'login' | 'register'>('login');
  const [isLessonOpen, setIsLessonOpen] = useState<boolean>(false);
  const [isHighFiveOpen, setIsHighFiveOpen] = useState<boolean>(false);
  const [isTipOpen, setIsTipOpen] = useState<boolean>(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isMediaCreditsOpen, setIsMediaCreditsOpen] = useState<boolean>(false);
  const [memoryGameInitialMode, setMemoryGameInitialMode] = useState<'express' | 'normal' | 'master'>('normal');

  // Sync state whenever active currentUser changes
  useEffect(() => {
    if (currentUser) {
      setStats(currentUser.stats);
      setCompletedTrailNodes(currentUser.completedTrailNodes || []);
      setSeenAlphabetLetters(currentUser.seenAlphabetLetters || ['A']);
      setPracticedWords(currentUser.practicedWords || []);
      setUnlockedAchievements(currentUser.unlockedAchievements || []);
      setUnlockedStickers(currentUser.unlockedStickers || []);
    }
  }, [currentUser?.id]);

  // Sync to persistent auth storage & Firestore on any gameplay progress
  useEffect(() => {
    if (currentUser) {
      const updates = {
        stats,
        completedTrailNodes,
        seenAlphabetLetters,
        practicedWords,
        unlockedAchievements,
        unlockedStickers
      };
      syncUserProgress(currentUser.id, updates);

      // Sincroniza em nuvem no Firestore se for conta autenticada no Firebase
      if (currentUser.id.length > 20 && !currentUser.id.startsWith('user_')) {
        saveUserToFirestore({
          ...currentUser,
          ...updates
        }).catch((err) => {
          console.warn('Sincronização Firestore ignorada:', err);
        });
      }
    }
  }, [
    currentUser?.id, 
    stats, 
    completedTrailNodes, 
    seenAlphabetLetters, 
    practicedWords, 
    unlockedAchievements, 
    unlockedStickers
  ]);

  // Handle dark mode class on html and body
  useEffect(() => {
    if (stats.darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [stats.darkMode]);

  // Handle high contrast mode class
  useEffect(() => {
    if (stats.highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [stats.highContrast]);

  const addStars = (amount: number) => {
    const today = getTodayDateString();
    setStats((prev) => {
      const nextStars = prev.stars + amount;
      const nextXp = prev.xp + amount * 5;
      const nextLevel = Math.floor(nextXp / 50) + 1;
      const existingWeekly = prev.weeklyTrainedDates || [];
      const updatedWeekly = existingWeekly.includes(today) ? existingWeekly : [...existingWeekly, today];

      return {
        ...prev,
        stars: nextStars,
        xp: nextXp,
        level: Math.max(prev.level, nextLevel),
        levelTitle: getLevelTitle(Math.max(prev.level, nextLevel)),
        todayCompleted: true,
        weeklyTrainedDates: updatedWeekly
      };
    });
  };

  const handleOpenLesson = (nodeId?: string) => {
    if (nodeId) {
      setActiveLessonNodeId(nodeId);
      setIsLessonOpen(true);
    } else {
      // Abre diretamente a nova Trilha
      setCurrentTab('trail');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCompleteTrailStage = (stageId: string, starsReward: number, xpReward: number) => {
    const today = getTodayDateString();

    setCompletedTrailNodes((prev) => {
      if (!prev.includes(stageId)) {
        return [...prev, stageId];
      }
      return prev;
    });

    setStats((prev) => {
      const nextStars = prev.stars + starsReward;
      const nextXp = prev.xp + xpReward;
      const nextLevel = Math.floor(nextXp / 50) + 1;
      const streakIncrement = !prev.todayCompleted ? 1 : 0;
      const existingWeekly = prev.weeklyTrainedDates || [];
      const updatedWeekly = existingWeekly.includes(today) ? existingWeekly : [...existingWeekly, today];

      return {
        ...prev,
        stars: nextStars,
        xp: nextXp,
        level: Math.max(prev.level, nextLevel),
        levelTitle: getLevelTitle(Math.max(prev.level, nextLevel)),
        todayCompleted: true,
        streakDays: prev.streakDays + streakIncrement,
        weeklyTrainedDates: updatedWeekly
      };
    });
  };

  const handleLessonCompleted = (nodeId: string, starsReward: number, xpReward: number) => {
    const today = getTodayDateString();

    // Unlock node sequentially
    setCompletedTrailNodes((prev) => {
      if (!prev.includes(nodeId)) {
        return [...prev, nodeId];
      }
      return prev;
    });

    // Update stats, streak & XP
    setStats((prev) => {
      const nextStars = prev.stars + starsReward;
      const nextXp = prev.xp + xpReward;
      const nextLevel = Math.floor(nextXp / 50) + 1;
      const streakIncrement = !prev.todayCompleted ? 1 : 0;
      const existingWeekly = prev.weeklyTrainedDates || [];
      const updatedWeekly = existingWeekly.includes(today) ? existingWeekly : [...existingWeekly, today];

      return {
        ...prev,
        stars: nextStars,
        xp: nextXp,
        level: Math.max(prev.level, nextLevel),
        levelTitle: getLevelTitle(Math.max(prev.level, nextLevel)),
        todayCompleted: true,
        streakDays: prev.streakDays + streakIncrement,
        weeklyTrainedDates: updatedWeekly
      };
    });
  };

  const handleUnlockSticker = (stickerId: string) => {
    setUnlockedStickers((prev) => {
      if (!prev.includes(stickerId)) {
        return [...prev, stickerId];
      }
      return prev;
    });
  };

  const handleStartExpressGame = () => {
    playSound.pop(stats.soundEnabled);
    setMemoryGameInitialMode('express');
    setCurrentTab('memory-game');
  };

  const handleToggleDarkMode = () => {
    setStats((s) => ({ ...s, darkMode: !s.darkMode }));
  };

  const handleLogout = () => {
    logoutUser();
    signOutFirebase();
    setCurrentUser(null);
    setCurrentTab('home');
  };

  const handleLoginSuccess = (user: UserAccount) => {
    setCurrentUser(user);
    setStats(user.stats);
    setCompletedTrailNodes(user.completedTrailNodes || []);
    setSeenAlphabetLetters(user.seenAlphabetLetters || ['A']);
    setPracticedWords(user.practicedWords || []);
    setUnlockedAchievements(user.unlockedAchievements || []);
    setUnlockedStickers(user.unlockedStickers || []);
    setCurrentTab('home');
  };

  const handleExploreAsGuest = () => {
    const guestUser = createInitialUserProgress('Visitante', 'visitante@lumilibras.com', 'crianca', 'guest_session');
    setCurrentUser(guestUser);
    setStats(guestUser.stats);
    setCompletedTrailNodes([]);
    setSeenAlphabetLetters(['A']);
    setPracticedWords([]);
  };

  // If user is NOT logged in: Show the Landing Screen from the Stitch file
  if (!currentUser) {
    return (
      <div className={`min-h-screen bg-white dark:bg-[#0A1128] text-slate-800 dark:text-slate-100 ${stats.fontSize === 'large' ? 'text-lg' : 'text-base'}`}>
        <LandingScreen
          onOpenLogin={() => {
            setAuthInitialTab('login');
            setIsAuthModalOpen(true);
          }}
          onOpenRegister={() => {
            setAuthInitialTab('register');
            setIsAuthModalOpen(true);
          }}
          onOpenAccessibility={() => setIsAccessibilityOpen(true)}
          onExploreAsGuest={handleExploreAsGuest}
        />

        {/* Auth Modal for Login and Register */}
        <AuthModal
          isOpen={isAuthModalOpen}
          initialTab={authInitialTab}
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={handleLoginSuccess}
        />

        {/* Accessibility Modal available from Landing Screen */}
        <AccessibilityModal
          isOpen={isAccessibilityOpen}
          onClose={() => setIsAccessibilityOpen(false)}
          stats={stats}
          onToggleSound={() =>
            setStats((s) => ({ ...s, soundEnabled: !s.soundEnabled }))
          }
          onToggleHighContrast={() =>
            setStats((s) => ({ ...s, highContrast: !s.highContrast }))
          }
          onToggleDarkMode={handleToggleDarkMode}
          onToggleFontSize={() =>
            setStats((s) => ({
              ...s,
              fontSize: s.fontSize === 'normal' ? 'large' : 'normal'
            }))
          }
        />
      </div>
    );
  }

  // If user IS logged in: Show the full interactive application with trail starting clean and progressing
  return (
    <div className={`min-h-screen bg-[#F8FAFD] dark:bg-[#0A1128] text-slate-800 dark:text-slate-100 flex transition-colors duration-300 ${stats.fontSize === 'large' ? 'text-lg' : 'text-base'}`}>
      {/* Left Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenTipModal={() => setIsTipOpen(true)}
        onOpenAccessibility={() => setIsAccessibilityOpen(true)}
        onOpenMediaCredits={() => setIsMediaCreditsOpen(true)}
        soundEnabled={stats.soundEnabled}
        isOpenMobile={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
        onLogout={handleLogout}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleDesktopSidebar}
      />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        {/* Top Header with accessibility button always visible on top */}
        <Header
          stats={stats}
          currentUser={{
            name: currentUser.name,
            avatar: currentUser.avatar,
            role: currentUser.role
          }}
          onToggleSound={() =>
            setStats((s) => ({ ...s, soundEnabled: !s.soundEnabled }))
          }
          onToggleDarkMode={handleToggleDarkMode}
          onOpenAccessibility={() => setIsAccessibilityOpen(true)}
          onOpenProfile={() => setIsProfileOpen(true)}
          onOpenMediaCredits={() => setIsMediaCreditsOpen(true)}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onToggleDesktopSidebar={handleToggleDesktopSidebar}
          isSidebarCollapsed={isSidebarCollapsed}
          onLogout={handleLogout}
        />

        {/* View Router */}
        <main className={`flex-1 px-3 sm:px-8 pt-4 sm:pt-6 w-full pb-28 sm:pb-14 transition-all duration-300 ${
          isSidebarCollapsed ? 'max-w-7xl mx-auto' : 'max-w-7xl mx-auto'
        }`}>
          {currentTab === 'home' && (
            <HomeScreen
              stats={stats}
              completedTrailNodes={completedTrailNodes}
              onNavigateTab={(tab) => {
                setCurrentTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenLesson={handleOpenLesson}
              onOpenHighFive={() => setIsHighFiveOpen(true)}
              onOpenTipModal={() => setIsTipOpen(true)}
              onStartExpressGame={handleStartExpressGame}
            />
          )}

          {currentTab === 'trail' && (
            <TrailScreen
              completedStages={completedTrailNodes}
              userStats={stats}
              soundEnabled={stats.soundEnabled}
              onCompleteStage={handleCompleteTrailStage}
              onOpenTip={() => setIsTipOpen(true)}
              onNavigateToAlphabet={() => {
                setCurrentTab('alphabet');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateToMemoryGame={() => {
                setCurrentTab('memory-game');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {currentTab === 'alphabet' && (
            <AlphabetScreen
              stats={stats}
              onRewardStars={addStars}
              seenLetters={seenAlphabetLetters}
              onUpdateSeenLetters={(letters) => setSeenAlphabetLetters(letters)}
            />
          )}

          {currentTab === 'daily-signs' && (
            <DailySignsScreen
              stats={stats}
              onRewardStars={addStars}
              practicedWords={practicedWords}
              onUpdatePracticedWords={(words) => setPracticedWords(words)}
            />
          )}

          {currentTab === 'memory-game' && (
            <MemoryGameScreen
              stats={stats}
              onRewardStars={addStars}
              initialMode={memoryGameInitialMode}
            />
          )}

          {currentTab === 'achievements' && (
            <AchievementsScreen
              stats={stats}
              completedTrailNodes={completedTrailNodes}
              unlockedAchievements={unlockedAchievements}
              unlockedStickers={unlockedStickers}
              onRewardStars={addStars}
              onUnlockSticker={handleUnlockSticker}
            />
          )}

          {currentTab === 'credits-curiosities' && (
            <CreditsCuriositiesScreen
              stats={stats}
              onOpenAccessibility={() => setIsAccessibilityOpen(true)}
              onOpenMediaCredits={() => setIsMediaCreditsOpen(true)}
            />
          )}
        </main>

        {/* Floating Companion Sticky Bar at Bottom */}
        <BottomCompanionBar
          onOpenTip={() => setIsTipOpen(true)}
          onContinueTrail={() => {
            setCurrentTab('trail');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          soundEnabled={stats.soundEnabled}
        />
      </div>

      {/* Interactive Modals */}
      <LessonModal
        isOpen={isLessonOpen}
        nodeId={activeLessonNodeId}
        onClose={() => setIsLessonOpen(false)}
        onCompleteLesson={handleLessonCompleted}
        soundEnabled={stats.soundEnabled}
      />

      <HighFiveModal
        isOpen={isHighFiveOpen}
        onClose={() => setIsHighFiveOpen(false)}
        onRewardStars={addStars}
        soundEnabled={stats.soundEnabled}
      />

      <LumiTipModal
        isOpen={isTipOpen}
        onClose={() => setIsTipOpen(false)}
        soundEnabled={stats.soundEnabled}
      />

      <AccessibilityModal
        isOpen={isAccessibilityOpen}
        onClose={() => setIsAccessibilityOpen(false)}
        stats={stats}
        onToggleSound={() =>
          setStats((s) => ({ ...s, soundEnabled: !s.soundEnabled }))
        }
        onToggleHighContrast={() =>
          setStats((s) => ({ ...s, highContrast: !s.highContrast }))
        }
        onToggleDarkMode={handleToggleDarkMode}
        onToggleFontSize={() =>
          setStats((s) => ({
            ...s,
            fontSize: s.fontSize === 'normal' ? 'large' : 'normal'
          }))
        }
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        stats={stats}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <MediaCreditsModal
        isOpen={isMediaCreditsOpen}
        onClose={() => setIsMediaCreditsOpen(false)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        initialTab={authInitialTab}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />
    </div>
  );
}
