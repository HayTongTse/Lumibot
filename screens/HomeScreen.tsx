
import React from 'react';
import type { Child, Task, SafetyReport } from '../types';
import { Trend } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ArrowUpIcon, ArrowDownIcon, MinusIcon, InfoIcon, PlusIcon } from '../components/Icons';

const TrendIcon: React.FC<{ trend: Trend }> = ({ trend }) => {
  switch (trend) {
    case Trend.Up:
      return <ArrowUpIcon className="w-6 h-6 text-green-500" />;
    case Trend.Down:
      return <ArrowDownIcon className="w-6 h-6 text-orange-500" />;
    case Trend.Stable:
    default:
      return <MinusIcon className="w-6 h-6 text-gray-500" />;
  }
};

const CHART_COLORS = ['#a78bfa', '#f472b6', '#60a5fa', '#f87171'];
const TOPIC_COLORS = [
    'bg-violet-100 text-violet-800',
    'bg-pink-100 text-pink-800',
    'bg-sky-100 text-sky-800',
    'bg-orange-100 text-orange-800',
];

const DashboardCard: React.FC<{ title: string; children: React.ReactNode, action?: React.ReactNode }> = ({ title, children, action }) => (
  <div className="bg-white rounded-3xl shadow-lg p-4 flex flex-col">
    <div className="flex justify-between items-center mb-2 px-2">
      <h3 className="font-bold text-gray-700 text-lg">{title}</h3>
      {action || <InfoIcon className="w-4 h-4 text-gray-400" />}
    </div>
    <div className="p-2">{children}</div>
  </div>
);

const TaskCard: React.FC<{task: Task}> = ({task}) => {
    const isCompleted = task.status === 'Completed';
    return (
        <div className={`p-4 rounded-2xl border-l-8 ${isCompleted ? 'bg-slate-50 border-green-300' : 'bg-white border-violet-400 shadow-md'}`}>
            <p className={`font-bold text-gray-800 ${isCompleted ? 'line-through text-gray-500' : ''}`}>{task.title}</p>
            <div className="flex justify-between items-center mt-2">
                <span className="text-xs font-semibold text-gray-500">{task.reminderTime}</span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${isCompleted ? 'bg-green-100 text-green-800' : 'bg-violet-100 text-violet-800'}`}>
                    {task.status}
                </span>
            </div>
        </div>
    );
};

const RiskAlertCard: React.FC<{ report: SafetyReport }> = ({ report }) => (
  <div className="bg-amber-50 border-l-8 border-amber-400 p-4 rounded-2xl shadow-md">
    <div className="flex justify-between items-start">
      <div>
        <h4 className="font-bold text-amber-800 text-base">{report.category}</h4>
        <p className="text-xs text-gray-500 font-semibold mt-1">{report.time}</p>
      </div>
      <span className="text-xs font-bold text-amber-800 bg-amber-200 px-3 py-1 rounded-full">需要您关注</span>
    </div>
    <p className="text-gray-700 mt-3 text-sm">{report.summary}</p>
    <div className="mt-4 bg-white/70 p-3 rounded-xl">
      <p className="text-sm font-bold text-gray-700">沟通建议</p>
      <p className="text-sm text-gray-600 mt-1">{report.suggestion}</p>
    </div>
    <div className="mt-4 flex gap-3">
      <button className="flex-1 text-sm bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-semibold shadow">
        查看详情
      </button>
      <button className="flex-1 text-sm bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors font-semibold">
        与孩子沟通
      </button>
    </div>
  </div>
);


const HomeScreen: React.FC<{ child: Child }> = ({ child }) => {
  const pendingSafetyReports = child.safetyReports.filter(report => report.status === 'pending');
  return (
    <div className="p-4 space-y-5">
      <DashboardCard title="今日话题">
        <div className="flex flex-wrap gap-2">
          {child.today.topics.map((topic, index) => (
            <span key={topic} className={`text-sm font-bold px-4 py-2 rounded-full ${TOPIC_COLORS[index % TOPIC_COLORS.length]}`}>
              {topic}
            </span>
          ))}
        </div>
      </DashboardCard>

      <DashboardCard title="互动时长分布">
        <div className="h-48 -ml-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={child.today.interactionDistribution} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
              <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{fill: '#6b7280', fontSize: 14, fontWeight: 600}} />
              <YAxis tickLine={false} axisLine={false} tick={{fill: '#6b7280', fontSize: 14, fontWeight: 600}} />
              <Tooltip cursor={{fill: 'rgba(233, 213, 255, 0.5)'}} contentStyle={{backgroundColor: 'white', border: 'none', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'}}/>
              <Bar dataKey="value" name="时长" unit="%" radius={[12, 12, 0, 0]}>
                 {child.today.interactionDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </DashboardCard>
      
      <div className="grid grid-cols-2 gap-4">
        <DashboardCard title="学习趋势">
            <div className="flex items-center justify-center gap-2 flex-grow h-20">
                <TrendIcon trend={child.today.learningTrend} />
                <span className="text-2xl font-bold text-gray-800">{child.today.learningTrend}</span>
            </div>
        </DashboardCard>
        <DashboardCard title="情绪趋势">
            <div className="flex items-center justify-center gap-2 flex-grow h-20">
                <TrendIcon trend={child.today.moodTrend} />
                <span className="text-2xl font-bold text-gray-800">{child.today.moodTrend}</span>
            </div>
        </DashboardCard>
      </div>

       <DashboardCard title="规则执行情况">
            <div className="flex justify-around items-center text-center flex-grow h-24">
                <div>
                    <p className="text-4xl font-extrabold text-violet-600">{child.today.tasksCompleted}</p>
                    <p className="text-sm font-semibold text-gray-600">成长任务</p>
                </div>
                 <div>
                    <p className="text-4xl font-extrabold text-pink-500">{child.today.badgesEarned}</p>
                    <p className="text-sm font-semibold text-gray-600">获得徽章</p>
                </div>
            </div>
        </DashboardCard>
        
        {pendingSafetyReports.length > 0 && (
          <DashboardCard title="风险提醒">
            <div className="space-y-3 -m-2">
              {pendingSafetyReports.map(report => (
                <RiskAlertCard key={report.id} report={report} />
              ))}
            </div>
          </DashboardCard>
        )}

        <DashboardCard 
            title="布置任务" 
            action={
                <button className="bg-violet-500 text-white rounded-full p-1.5 shadow-lg hover:bg-violet-600">
                    <PlusIcon className="w-5 h-5" />
                </button>
            }
        >
            <div className="space-y-3">
                {child.tasks.map(task => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>
        </DashboardCard>
    </div>
  );
};

export default HomeScreen;