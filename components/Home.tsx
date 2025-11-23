import React from 'react';
import { Page } from '../types';
import { FileText, PlayCircle, ClipboardCheck, Heart, Lock, CheckCircle, RotateCcw } from 'lucide-react';

interface Props {
  setPage: (page: Page) => void;
  unlockedStep: number;
  onReset?: () => void;
}

const Home: React.FC<Props> = ({ setPage, unlockedStep, onReset }) => {
  const menuItems = [
    {
      page: Page.PRE_TEST,
      title: 'แบบทดสอบก่อนเรียน',
      subtitle: 'Pre-test',
      icon: FileText,
      color: 'bg-indigo-500',
      shadow: 'shadow-indigo-200'
    },
    {
      page: Page.CONTENT,
      title: 'เนื้อหาสอน',
      subtitle: 'Video + อธิบาย',
      icon: PlayCircle,
      color: 'bg-blue-500',
      shadow: 'shadow-blue-200'
    },
    {
      page: Page.POST_TEST,
      title: 'แบบทดสอบหลังเรียน',
      subtitle: 'Post-test',
      icon: ClipboardCheck,
      color: 'bg-teal-500',
      shadow: 'shadow-teal-200'
    },
    {
      page: Page.EVALUATION,
      title: 'แบบประเมิน',
      subtitle: 'ความพึงพอใจ',
      icon: Heart,
      color: 'bg-rose-500',
      shadow: 'shadow-rose-200'
    }
  ];

  return (
    <div className="max-w-md mx-auto w-full py-8 px-4">
      {/* Hero Section */}
      <div className="text-center mb-10 animate-fade-in-down">
        <div className="bg-white w-24 h-24 mx-auto rounded-full shadow-lg flex items-center justify-center mb-4 ring-4 ring-blue-100">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/2917/2917633.png" 
            alt="Baby Icon" 
            className="w-14 h-14"
          />
        </div>
        <h1 className="text-2xl font-bold text-blue-900 mb-2">ความสำคัญของ<br/>น้ำนมแม่หยดแรก</h1>
        <p className="text-blue-600/80 text-sm">สื่อการเรียนรู้สำหรับคุณแม่มือใหม่</p>
      </div>

      {/* Navigation Grid */}
      <div className="grid grid-cols-1 gap-5">
        {menuItems.map((item, index) => {
          const isLocked = index > unlockedStep;
          const isCompleted = index < unlockedStep;

          return (
            <button
              key={item.page}
              onClick={() => !isLocked && setPage(item.page)}
              disabled={isLocked}
              className={`group relative overflow-hidden bg-white rounded-2xl shadow-md transition-all duration-300 border border-slate-100 p-6 flex items-center text-left
                ${isLocked ? 'opacity-60 grayscale cursor-not-allowed bg-slate-50' : 'hover:shadow-xl'}
              `}
            >
              {/* Colored Background Accent */}
              {!isLocked && (
                <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-10 transition-transform group-hover:scale-150 ${item.color}`}></div>
              )}
              
              <div className={`flex-shrink-0 p-4 rounded-xl text-white shadow-lg mr-5 transition-transform ${!isLocked && 'group-hover:scale-110'} ${isLocked ? 'bg-slate-400 shadow-none' : `${item.color} ${item.shadow}`}`}>
                {isLocked ? <Lock className="w-8 h-8" /> : <item.icon className="w-8 h-8" />}
              </div>
              
              <div className="flex-grow">
                <h3 className={`text-lg font-bold ${isLocked ? 'text-slate-500' : 'text-slate-800 group-hover:text-blue-600'} transition-colors`}>
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm font-medium mt-1">
                  {isLocked ? 'ยังไม่ปลดล็อค' : item.subtitle}
                </p>
              </div>

              {/* Status Icons */}
              <div className="ml-2">
                {isLocked ? (
                  <Lock className="w-5 h-5 text-slate-300" />
                ) : isCompleted ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-12 text-center space-y-4">
        <div className="text-xs text-gray-400">
          <p>© 2024 Breast Milk Education App</p>
        </div>

        {onReset && unlockedStep > 0 && (
          <button 
            onClick={onReset}
            className="inline-flex items-center text-xs text-red-400 hover:text-red-600 transition-colors"
          >
            <RotateCcw className="w-3 h-3 mr-1" />
            ล้างข้อมูลความคืบหน้า (เริ่มใหม่)
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;