
import React from 'react';
import type { Child, SafetyReport } from '../types';

const SafetyReportCard: React.FC<{ report: SafetyReport }> = ({ report }) => {
  const isPending = report.status === 'pending';
  return (
    <div className={`bg-white rounded-2xl shadow-md p-4 border-l-8 ${isPending ? 'border-pink-500' : 'border-gray-300'}`}>
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-gray-800">{report.category}</h3>
        {isPending && <span className="text-xs font-semibold text-white bg-pink-500 px-3 py-1 rounded-full">待处理</span>}
      </div>
      <p className="text-sm text-gray-500 mt-1 font-semibold">{report.time}</p>
      <div className="mt-4 bg-slate-100 p-3 rounded-lg">
        <p className="text-sm font-bold text-gray-700">系统操作</p>
        <p className="text-sm text-gray-600">{report.systemAction}</p>
      </div>
      <div className="mt-4 flex gap-2">
        <button className="text-sm bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-semibold">
          查看详情
        </button>
        <button className="text-sm bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors font-semibold">
          修复对话脚本
        </button>
      </div>
    </div>
  );
};


interface ToggleProps {
  label: string;
  description: string;
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleProps> = ({ label, description, enabled, setEnabled }) => (
  <div className="flex items-center justify-between">
    <div>
      <h4 className="font-bold text-gray-800 text-base">{label}</h4>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
    <button
      onClick={() => setEnabled(!enabled)}
      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
        enabled ? 'bg-violet-500' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  </div>
);

const SettingsCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white rounded-3xl shadow-lg">
        <h3 className="font-extrabold text-gray-700 text-lg p-5 border-b border-slate-100">{title}</h3>
        <div className="p-5 space-y-5">{children}</div>
    </div>
);


const SettingsScreen: React.FC<{ child: Child }> = ({ child }) => {
    const [allowSummary, setAllowSummary] = React.useState(true);
    const [allowSnippet, setAllowSnippet] = React.useState(false);

    return (
        <div className="p-4 space-y-6">
            <h2 className="text-3xl font-extrabold text-gray-800 px-1">设置与安全</h2>

            <SettingsCard title="设备管理">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="font-bold text-gray-800">LUMIBOT-{child.name}</p>
                        <p className="text-sm text-green-600 font-semibold">已连接</p>
                    </div>
                    <p className="text-sm text-gray-500 font-semibold">上次同步: 5分钟前</p>
                </div>
            </SettingsCard>
            
            <SettingsCard title="权限与可见性">
                <ToggleSwitch 
                    label="允许查看摘要级分享" 
                    description="孩子主动分享的内容，默认可见摘要"
                    enabled={allowSummary}
                    setEnabled={setAllowSummary}
                />
                 <ToggleSwitch 
                    label="允许查看片段级分享" 
                    description="需要您单次授权后，才能查看对话片段"
                    enabled={allowSnippet}
                    setEnabled={setAllowSnippet}
                />
                <button className="text-sm text-pink-600 hover:underline font-bold">
                    撤回所有未来内容的查看权限
                </button>
            </SettingsCard>

            <SettingsCard title="安全与监护">
                <div className="flex justify-between items-center">
                    <p className="font-bold text-gray-800">安全词设置</p>
                    <button className="text-sm text-violet-600 hover:underline font-bold">管理</button>
                </div>
                <div className="flex justify-between items-center">
                    <p className="font-bold text-gray-800">监护灵敏度</p>
                    <button className="text-sm text-violet-600 hover:underline font-bold">调整</button>
                </div>
            </SettingsCard>

            <SettingsCard title="内容安全报告">
                <div className="bg-violet-100 text-violet-800 p-4 rounded-2xl text-sm font-semibold">
                    <p>这里只记录高风险内容的摘要，用于保护孩子的安全。所有内容都经过脱敏处理，我们鼓励您与孩子进行开放的沟通。</p>
                </div>
                {child.safetyReports.length > 0 ? (
                    child.safetyReports.map(report => (
                        <SafetyReportCard key={report.id} report={report} />
                    ))
                ) : (
                    <p className="text-center text-gray-500 py-4">暂无安全报告记录。</p>
                )}
            </SettingsCard>

            <SettingsCard title="关于">
                <div className="flex justify-between items-center">
                    <p className="font-bold text-gray-800">常见问题解答</p>
                    <button className="text-sm text-violet-600 hover:underline font-bold">查看</button>
                </div>
                 <div className="flex justify-between items-center">
                    <p className="font-bold text-gray-800">产品优化建议</p>
                    <button className="text-sm text-violet-600 hover:underline font-bold">反馈</button>
                </div>
            </SettingsCard>
        </div>
    );
};

export default SettingsScreen;