
import React, { useState, useMemo } from 'react';
import type { Child, Tab } from './types';
import { MOCK_CHILDREN, TABS } from './data';
import {
  HomeIcon, MessageSquareIcon, BarChartIcon, SettingsIcon,
  BellIcon, ChevronDownIcon
} from './components/Icons';

import HomeScreen from './screens/HomeScreen';
import MessagesScreen from './screens/MessagesScreen';
import InsightsScreen from './screens/InsightsScreen';
import SettingsScreen from './screens/SettingsScreen';

const TAB_ICONS: Record<Tab, React.FC<{className?: string}>> = {
  Home: HomeIcon,
  Shares: MessageSquareIcon,
  Insights: BarChartIcon,
  Settings: SettingsIcon,
};

const Header: React.FC<{ 
  childrenData: Child[]; 
  activeChild: Child; 
  onSelectChild: (id: string) => void;
}> = ({ childrenData, activeChild, onSelectChild }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const totalPendingRequests = useMemo(() => 
    childrenData.reduce((acc, child) => acc + child.today.pendingRequests, 0), 
    [childrenData]
  );

  return (
    <header className="sticky top-0 bg-slate-50/80 backdrop-blur-lg z-10 px-4 py-3 flex justify-between items-center shadow-sm">
      <div className="relative">
        <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-3">
          <img src={activeChild.avatarUrl} alt={activeChild.name} className="w-12 h-12 rounded-full border-4 border-white shadow-lg" />
          <div className="text-left">
            <span className="text-sm text-gray-500 font-semibold">当前孩子</span>
            <div className="flex items-center gap-1">
              <h1 className="text-xl font-extrabold text-gray-800">{activeChild.name}</h1>
              {activeChild.today.pendingRequests > 0 && <span className="h-2.5 w-2.5 bg-pink-500 rounded-full"></span>}
              <ChevronDownIcon className={`w-6 h-6 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>
          </div>
        </button>
        {isOpen && (
          <div className="absolute top-full mt-2 w-48 bg-white rounded-2xl shadow-xl py-2 z-20">
            {childrenData.map(child => (
              <a
                key={child.id}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectChild(child.id);
                  setIsOpen(false);
                }}
                className="flex justify-between items-center px-4 py-2 text-base font-semibold text-gray-700 hover:bg-violet-100 hover:text-violet-700"
              >
                <span>{child.name}</span>
                {child.today.pendingRequests > 0 && <span className="h-2.5 w-2.5 bg-pink-500 rounded-full"></span>}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

const BottomNav: React.FC<{ activeTab: Tab; onTabChange: (tab: Tab) => void }> = ({ activeTab, onTabChange }) => (
  <nav className="sticky bottom-0 bg-white/80 backdrop-blur-lg shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
    <div className="max-w-md mx-auto flex justify-around p-2">
      {TABS.map((tab) => {
        const Icon = TAB_ICONS[tab];
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 w-20 ${isActive ? 'text-violet-600 bg-violet-100' : 'text-gray-500 hover:bg-slate-100'}`}
          >
            <Icon className="w-7 h-7" />
            <span className="text-xs font-bold">{tab}</span>
          </button>
        );
      })}
    </div>
  </nav>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Home');
  const [activeChildId, setActiveChildId] = useState<string>(MOCK_CHILDREN[0].id);

  const activeChild = useMemo(() => MOCK_CHILDREN.find(c => c.id === activeChildId)!, [activeChildId]);

  const renderContent = () => {
    switch (activeTab) {
      case 'Home': return <HomeScreen child={activeChild} />;
      case 'Shares': return <MessagesScreen child={activeChild} />;
      case 'Insights': return <InsightsScreen child={activeChild} />;
      case 'Settings': return <SettingsScreen child={activeChild} />;
      default: return <HomeScreen child={activeChild} />;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-slate-100 min-h-screen flex flex-col shadow-2xl">
      <Header childrenData={MOCK_CHILDREN} activeChild={activeChild} onSelectChild={setActiveChildId} />
      <main className="flex-grow pb-24">
        {renderContent()}
      </main>
      <div className="fixed bottom-0 left-0 right-0">
         <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
};

export default App;