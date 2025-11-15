
export enum Trend {
  Up = 'Up',
  Down = 'Down',
  Stable = 'Stable',
}

export enum ShareCardVisibility {
  Private = '私密',
  Summary = '摘要',
  Snippet = '片段',
  Urgent = '紧急',
}

export enum ShareCardType {
  HomeworkHelp = '作业求助',
  Showcase = '成果展示',
  EmotionalMoment = '情绪时刻',
  GeneralChat = '日常闲聊',
  TaskUpdate = '任务动态',
}

export interface Task {
  id: string;
  title: string;
  reminderTime: string;
  status: 'Pending' | 'Completed';
}

export interface SafetyReport {
  id: string;
  time: string;
  category: string;
  systemAction: string;
  status: 'pending' | 'viewed';
  summary: string;
  suggestion: string;
}

export interface ShareCard {
  id: string;
  type: ShareCardType;
  title: string;
  summary: string;
  timestamp: string;
  visibility: ShareCardVisibility;
  childsComment?: string;
  expiresInDays: number;
  imageUrl?: string;
}

export interface WeeklyReport {
  interactionTotal: number;
  topTopics: { name: string; value: number }[];
  learningTrend: Trend;
  moodTrend: Trend;
  achievements: string[];
  highlight: { title: string; text: string };
  recommendations: { title: string; text: string }[];
}

export interface Child {
  id: string;
  name: string;
  avatarUrl: string;
  today: {
    topics: string[];
    interactionDistribution: { name: string; value: number }[];
    learningTrend: Trend;
    moodTrend: Trend;
    tasksCompleted: number;
    badgesEarned: number;
    pendingRequests: number;
  };
  tasks: Task[];
  shareCards: ShareCard[];
  weeklyReport: WeeklyReport;
  safetyReports: SafetyReport[];
}

export type Tab = 'Home' | 'Shares' | 'Insights' | 'Settings';