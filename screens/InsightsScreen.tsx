import React from 'react';
import type { Child } from '../types';
import { Trend } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ArrowUpIcon, ArrowDownIcon, MinusIcon, InfoIcon, SparklesIcon } from '../components/Icons';

const TrendIndicator: React.FC<{ trend: Trend, label: string }> = ({ trend, label }) => {
    const trendInfo = {
        [Trend.Up]: { Icon: ArrowUpIcon, color: 'text-green-500', text: '上升' },
        [Trend.Down]: { Icon: ArrowDownIcon, color: 'text-orange-500', text: '下降' },
        [Trend.Stable]: { Icon: MinusIcon, color: 'text-gray-500', text: '平稳' },
    };
    const {Icon, color, text} = trendInfo[trend];

    return (
        <div className="flex flex-col items-center justify-center bg-white p-4 rounded-3xl shadow-lg h-32">
            <p className="text-base font-bold text-gray-600 mb-2">{label}</p>
            <div className={`flex items-center gap-1 ${color}`}>
                <Icon className="w-6 h-6" />
                <span className="font-bold text-xl">{text}</span>
            </div>
        </div>
    )
};


const InsightCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white rounded-3xl shadow-lg p-5">
    <div className="flex justify-between items-center mb-3">
      <h3 className="font-bold text-gray-700 text-lg">{title}</h3>
      <InfoIcon className="w-4 h-4 text-gray-400" />
    </div>
    {children}
  </div>
);


const COLORS = ['#818cf8', '#f472b6', '#fb923c', '#4ade80', '#60a5fa'];

const InsightsScreen: React.FC<{ child: Child }> = ({ child }) => {
  const { weeklyReport } = child;

  return (
    <div className="p-4 space-y-5">
      <h2 className="text-3xl font-extrabold text-gray-800 px-1">本周洞察与周报</h2>

      <InsightCard title="高频话题占比">
         <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={weeklyReport.topTopics}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={90}
                    innerRadius={50}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    paddingAngle={5}
                    cornerRadius={8}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                {weeklyReport.topTopics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
                <Tooltip contentStyle={{backgroundColor: 'white', border: 'none', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'}} />
            </PieChart>
            </ResponsiveContainer>
        </div>
      </InsightCard>

      <div className="grid grid-cols-2 gap-4">
        <TrendIndicator trend={weeklyReport.learningTrend} label="学习趋势" />
        <TrendIndicator trend={weeklyReport.moodTrend} label="情绪趋势" />
      </div>

       <InsightCard title="本周成就">
            <ul className="space-y-3">
                {weeklyReport.achievements.map((ach, i) => 
                    <li key={i} className="flex items-center gap-3 text-gray-700 font-semibold text-base">
                        <SparklesIcon className="w-5 h-5 text-amber-500 flex-shrink-0" />
                        <span>{ach}</span>
                    </li>
                )}
            </ul>
        </InsightCard>
        
        <InsightCard title="建议互动">
            <div className="space-y-4">
                <div>
                    <h4 className="font-bold text-gray-600 text-sm mb-2">活动追踪</h4>
                    <p className="text-gray-700 text-base bg-slate-100 p-4 rounded-2xl">{weeklyReport.highlight.text}</p>
                </div>
                 <div>
                    <h4 className="font-bold text-gray-600 text-sm mb-2">互动建议</h4>
                     <div className="space-y-2">
                        {weeklyReport.recommendations.map((rec, i) => (
                            <div key={i} className="text-violet-800 bg-violet-100 p-4 rounded-2xl">
                                <p className="font-bold text-sm">{rec.title}</p>
                                <p className="font-semibold mt-1">{rec.text}</p>
                            </div>
                        ))}
                     </div>
                </div>
            </div>
        </InsightCard>

        <div className="text-center pt-2">
            <button className="bg-violet-500 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:bg-violet-600 transition-colors">
                导出PDF周报
            </button>
        </div>
    </div>
  );
};

export default InsightsScreen;