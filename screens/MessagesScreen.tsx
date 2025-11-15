
import React, { useState } from 'react';
import type { Child, ShareCard as ShareCardType } from '../types';
import { ShareCardVisibility, ShareCardType as CardTypeEnum } from '../types';
import { LockIcon, FileTextIcon, EyeIcon, AlertTriangleIcon, SparklesIcon, XIcon, CheckCircleIcon } from '../components/Icons';
import ImageEditorModal from '../components/ImageEditorModal';

const VISIBILITY_INFO: Record<ShareCardVisibility, { icon: React.FC<{className?: string}>, color: string }> = {
    [ShareCardVisibility.Private]: { icon: LockIcon, color: 'text-gray-500' },
    [ShareCardVisibility.Summary]: { icon: FileTextIcon, color: 'text-blue-500' },
    [ShareCardVisibility.Snippet]: { icon: EyeIcon, color: 'text-green-500' },
    [ShareCardVisibility.Urgent]: { icon: AlertTriangleIcon, color: 'text-pink-500' },
};

const CARD_TYPE_INFO: Partial<Record<CardTypeEnum, { icon: React.FC<{className?: string}>, color: string }>> = {
    [CardTypeEnum.TaskUpdate]: { icon: CheckCircleIcon, color: 'text-green-600 bg-green-100' },
    [CardTypeEnum.HomeworkHelp]: { icon: AlertTriangleIcon, color: 'text-pink-600 bg-pink-100' },
};

const Card: React.FC<{ card: ShareCardType; onSelect: (card: ShareCardType) => void }> = ({ card, onSelect }) => {
    const typeInfo = CARD_TYPE_INFO[card.type];
    const VisIcon = VISIBILITY_INFO[card.visibility].icon;
    const visColor = VISIBILITY_INFO[card.visibility].color;

    return (
        <div onClick={() => onSelect(card)} className="bg-white rounded-3xl shadow-lg p-5 space-y-3 hover:shadow-xl transition-shadow cursor-pointer">
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-3">
                        <span className={`text-xs font-bold ${visColor} flex items-center gap-1.5`}>
                            <VisIcon className="w-3.5 h-3.5" />
                            {card.visibility}
                        </span>
                         {typeInfo && (
                            <span className={`text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1.5 ${typeInfo.color}`}>
                                <typeInfo.icon className="w-3.5 h-3.5" />
                                {card.type}
                            </span>
                        )}
                    </div>
                    <h3 className="font-bold text-gray-800 text-lg mt-2">{card.title}</h3>
                </div>
                <span className="text-xs text-gray-400 font-semibold">{card.timestamp}</span>
            </div>
            <p className="text-gray-600 text-base">{card.summary}</p>
            {card.childsComment && (
                 <p className="text-base text-violet-800 bg-violet-100 p-3 rounded-2xl italic font-semibold">"{card.childsComment}"</p>
            )}
        </div>
    );
}

const CardDetailModal: React.FC<{ card: ShareCardType; onClose: () => void; onOpenImageEditor: () => void; }> = ({ card, onClose, onOpenImageEditor }) => {
    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-40 p-4" onClick={onClose}>
            <div className="bg-slate-50 rounded-3xl shadow-xl w-full max-w-md m-auto flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">{card.title}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><XIcon className="w-6 h-6" /></button>
                </div>
                <div className="p-6 space-y-4">
                     <p className="text-base"><span className="font-bold">类型:</span> {card.type}</p>
                     <p className="text-base"><span className="font-bold">摘要:</span> {card.summary}</p>
                     {card.imageUrl && <img src={card.imageUrl} alt={card.title} className="rounded-2xl shadow-sm w-full" />}
                     <p className="text-sm text-gray-500 font-semibold">7天后自动删除</p>
                </div>
                <div className="p-4 bg-white/50 rounded-b-3xl flex flex-col sm:flex-row gap-3">
                    {card.type === CardTypeEnum.Showcase && (
                        <button onClick={onOpenImageEditor} className="flex-1 flex justify-center items-center gap-2 bg-violet-600 text-white px-4 py-3 rounded-xl font-bold hover:bg-violet-700 transition-colors shadow">
                          <SparklesIcon className="w-5 h-5"/> Edit with Gemini
                        </button>
                    )}
                    <button className="flex-1 bg-green-500 text-white px-4 py-3 rounded-xl font-bold hover:bg-green-600 transition-colors shadow">回复</button>
                    <button className="flex-1 bg-blue-500 text-white px-4 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors shadow">预约协作</button>
                </div>
            </div>
        </div>
    );
};

const MessagesScreen: React.FC<{ child: Child }> = ({ child }) => {
  const [selectedCard, setSelectedCard] = useState<ShareCardType | null>(null);
  const [isImageEditorOpen, setIsImageEditorOpen] = useState(false);

  const handleOpenEditor = () => {
      setSelectedCard(null);
      setIsImageEditorOpen(true);
  }
  
  const sortedShareCards = [...child.shareCards].sort((a, b) => {
    // A simple sort to bring newer items to the top. This is a placeholder.
    // In a real app, you'd parse timestamps properly.
    if (a.timestamp.includes('小时') && !b.timestamp.includes('小时')) return -1;
    if (!a.timestamp.includes('小时') && b.timestamp.includes('小时')) return 1;
    if (a.timestamp.includes('昨天') && !b.timestamp.includes('昨天')) return -1;
    if (!a.timestamp.includes('昨天') && b.timestamp.includes('昨天')) return 1;
    return 0;
  });

  return (
    <div className="p-4 space-y-4">
      {sortedShareCards.map(card => (
          <Card key={card.id} card={card} onSelect={setSelectedCard} />
      ))}
      {child.shareCards.length === 0 && (
          <div className="text-center py-10 text-gray-500">
              <p>No share cards yet.</p>
          </div>
      )}

      {selectedCard && <CardDetailModal card={selectedCard} onClose={() => setSelectedCard(null)} onOpenImageEditor={handleOpenEditor} />}

      {isImageEditorOpen && <ImageEditorModal onClose={() => setIsImageEditorOpen(false)} />}
    </div>
  );
};

export default MessagesScreen;