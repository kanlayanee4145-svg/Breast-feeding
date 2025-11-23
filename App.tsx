import React, { useState, useEffect } from 'react';
import { Page } from './types';
import Home from './components/Home';
import PreTest from './components/PreTest';
import Content from './components/Content';
import PostTest from './components/PostTest';
import Evaluation from './components/Evaluation';
import { ChevronLeft } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  
  // 0: Start, 1: Pre-test Done, 2: Content Done, 3: Post-test Done, 4: All Done
  // Initialize from localStorage if available
  const [unlockedStep, setUnlockedStep] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('breastMilkApp_progress');
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });

  // Save progress whenever it changes
  useEffect(() => {
    localStorage.setItem('breastMilkApp_progress', unlockedStep.toString());
  }, [unlockedStep]);

  const handleResetProgress = () => {
    if (window.confirm('คุณต้องการล้างความคืบหน้าและเริ่มใหม่ทั้งหมดใช่หรือไม่?')) {
      setUnlockedStep(0);
      localStorage.removeItem('breastMilkApp_progress');
      window.location.reload();
    }
  };

  // Helper to go back home
  const goHome = () => setCurrentPage(Page.HOME);

  // Helper for dynamic navbar title
  const getTitle = () => {
    switch(currentPage) {
      case Page.PRE_TEST: return 'แบบทดสอบก่อนเรียน';
      case Page.CONTENT: return 'เนื้อหาสอน';
      case Page.POST_TEST: return 'แบบทดสอบหลังเรียน';
      case Page.EVALUATION: return 'แบบประเมินความพึงพอใจ';
      default: return 'หน้าหลัก';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          {currentPage !== Page.HOME ? (
            <button 
              onClick={goHome}
              className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors flex items-center"
            >
              <ChevronLeft className="w-6 h-6" />
              <span className="text-sm font-medium ml-1">กลับ</span>
            </button>
          ) : (
            <div className="w-8"></div> // Spacer
          )}
          
          <h1 className="text-lg font-bold text-slate-800 truncate px-4">
            {getTitle()}
          </h1>

          <div className="w-8"></div> // Spacer to center title
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow container mx-auto px-4 py-2">
        {currentPage === Page.HOME && (
          <Home 
            setPage={setCurrentPage} 
            unlockedStep={unlockedStep} 
            onReset={handleResetProgress}
          />
        )}

        {currentPage === Page.PRE_TEST && (
          <PreTest 
            onComplete={() => {
              setUnlockedStep(prev => Math.max(prev, 1));
              goHome();
            }} 
            onExit={goHome}
          />
        )}

        {currentPage === Page.CONTENT && (
          <Content 
            onNext={() => {
              setUnlockedStep(prev => Math.max(prev, 2));
              setCurrentPage(Page.POST_TEST);
            }} 
          />
        )}

        {currentPage === Page.POST_TEST && (
          <PostTest 
            onComplete={() => {
              setUnlockedStep(prev => Math.max(prev, 3));
              goHome();
            }} 
            onExit={goHome}
          />
        )}

        {currentPage === Page.EVALUATION && (
          <Evaluation 
            onComplete={() => {
              setUnlockedStep(prev => Math.max(prev, 4));
              goHome();
            }} 
            onExit={goHome}
          />
        )}
      </main>
    </div>
  );
};

export default App;