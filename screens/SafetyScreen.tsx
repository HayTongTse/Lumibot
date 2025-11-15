
import React from 'react';

interface SafetyReport {
  id: string;
  time: string;
  category: string;
  systemAction: string;
  status: 'pending' | 'viewed';
}

const mockReports: SafetyReport[] = [
  {
    id: 'sr1',
    time: '2024-07-21 15:30',
    category: '高风险内容',
    systemAction: '已通知家长，并暂停对话',
    status: 'pending',
  },
  {
    id: 'sr2',
    time: '2024-07-19 10:12',
    category: '安全词触发',
    systemAction: '已通知家长',
    status: 'viewed',
  },
];

const SafetyReportCard: React.FC<{ report: SafetyReport }> = ({ report }) => {
  const isPending = report.status === 'pending';
  return (
    <div className={`bg-white rounded-2xl shadow-md p-4 border-l-4 ${isPending ? 'border-red-400' : 'border-gray-300'}`}>
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-gray-800">{report.category}</h3>
        {isPending && <span className="text-xs font-semibold text-white bg-red-500 px-2 py-1 rounded-full">待处理</span>}
      </div>
      <p className="text-sm text-gray-500 mt-1">{report.time}</p>
      <div className="mt-4 bg-amber-50 p-3 rounded-lg">
        <p className="text-sm font-semibold text-amber-800">系统操作</p>
        <p className="text-sm text-amber-700">{report.systemAction}</p>
      </div>
      <div className="mt-4 flex gap-2">
        <button className="text-sm bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors">
          查看详情
        </button>
        <button className="text-sm bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
          修复对话脚本
        </button>
      </div>
    </div>
  );
};

const SafetyScreen: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 px-1">内容安全报告</h2>
      <div className="bg-blue-100 text-blue-800 p-4 rounded-2xl text-sm">
        <p>这里只记录高风险内容的摘要，用于保护孩子的安全。所有内容都经过脱敏处理，我们鼓励您与孩子进行开放的沟通。</p>
      </div>
      {mockReports.map(report => (
        <SafetyReportCard key={report.id} report={report} />
      ))}
    </div>
  );
};

export default SafetyScreen;
