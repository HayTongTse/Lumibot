
import type { Child, Tab } from './types';
import { Trend, ShareCardVisibility, ShareCardType, Task } from './types';

export const TABS: Tab[] = ['Home', 'Shares', 'Insights', 'Settings'];

export const MOCK_CHILDREN: Child[] = [
  {
    id: 'child1',
    name: 'Leo',
    avatarUrl: 'https://picsum.photos/seed/leo/100/100',
    today: {
      topics: ['恐龙', '太空', '画画'],
      interactionDistribution: [
        { name: '早', value: 20 },
        { name: '中', value: 45 },
        { name: '晚', value: 35 },
      ],
      learningTrend: Trend.Up,
      moodTrend: Trend.Stable,
      tasksCompleted: 3,
      badgesEarned: 1,
      pendingRequests: 2,
    },
    tasks: [
        { id: 't1', title: '完成一组恐龙知识问答', reminderTime: '今天', status: 'Pending' },
        { id: 't2', title: '抽背古诗《静夜思》', reminderTime: '今晚 7:00', status: 'Pending' },
        { id: 't3', title: '朗读一篇英文小故事', reminderTime: '昨天', status: 'Completed' },
    ],
    shareCards: [
      {
        id: 'sc1',
        type: ShareCardType.Showcase,
        title: '我画的霸王龙！',
        summary: 'Leo分享了一张他画的恐龙画，想让你看看。他说这是他画的最好的一张，特别自豪。',
        timestamp: '2小时前',
        visibility: ShareCardVisibility.Snippet,
        childsComment: '爸爸妈妈快看！酷不酷！',
        expiresInDays: 7,
        imageUrl: 'https://picsum.photos/seed/dino-drawing/400/300',
      },
      {
        id: 'sc7',
        type: ShareCardType.TaskUpdate,
        title: '任务完成啦',
        summary: 'Leo完成了任务：“朗读一篇英文小故事”。',
        timestamp: '1天前',
        visibility: ShareCardVisibility.Summary,
        expiresInDays: 6,
      },
      {
        id: 'sc2',
        type: ShareCardType.HomeworkHelp,
        title: '这道数学题有点难',
        summary: 'Leo在做数学作业时遇到了困难，有一道关于除法的问题不太明白，希望你能帮忙看看。',
        timestamp: '昨天',
        visibility: ShareCardVisibility.Urgent,
        expiresInDays: 1,
      },
      {
        id: 'sc4',
        type: ShareCardType.GeneralChat,
        title: '关于我的新朋友',
        summary: 'Leo聊到了他在学校新交的一个朋友，他们今天一起玩了积木，看起来他很开心。',
        timestamp: '3天前',
        visibility: ShareCardVisibility.Summary,
        expiresInDays: 5,
      },
    ],
    weeklyReport: {
      interactionTotal: 4.5,
      topTopics: [
        { name: '科学', value: 40 },
        { name: '艺术', value: 30 },
        { name: '故事', value: 20 },
        { name: '其他', value: 10 },
      ],
      learningTrend: Trend.Up,
      moodTrend: Trend.Stable,
      achievements: ['完成了“一周阅读挑战”', '学会了5个新英文单词', '主动整理了自己的玩具'],
      highlight: {
        title: '最大的进步',
        text: 'Leo本周在提问时更有条理了，能够清晰地表达自己的困惑，这是批判性思维发展的良好迹象。'
      },
      recommendations: [
        {
            title: '下周共读推荐',
            text: '《国家地理：恐龙百科》，巩固他对科学的兴趣。',
        },
        {
            title: '对话引导句',
            text: '“你画的恐龙有什么特别的故事吗？”'
        }
      ],
    },
    safetyReports: [
      {
        id: 'sr1',
        time: '2024-07-21 15:30',
        category: '安全词触发',
        systemAction: '已通知家长，并暂停对话',
        status: 'pending',
        summary: 'LUMIBOT在对话中识别到预设的安全词，为了保护孩子的安全，已暂停相关话题。',
        suggestion: '建议您在方便时，用温和的方式和孩子聊一聊，了解他/她遇到的情况。',
      },
      {
        id: 'sr2',
        time: '2024-07-19 10:12',
        category: '高风险内容',
        systemAction: '已通知家长',
        status: 'viewed',
        summary: '系统检测到对话中可能涉及高风险内容，已做记录。',
        suggestion: '这可能是一个与孩子讨论网络安全的好机会。',
      },
    ],
  },
  {
    id: 'child2',
    name: 'Mia',
    avatarUrl: 'https://picsum.photos/seed/mia/100/100',
    today: {
      topics: ['唱歌', '小猫', '做蛋糕'],
      interactionDistribution: [
        { name: '早', value: 30 },
        { name: '中', value: 20 },
        { name: '晚', value: 50 },
      ],
      learningTrend: Trend.Stable,
      moodTrend: Trend.Up,
      tasksCompleted: 4,
      badgesEarned: 2,
      pendingRequests: 0,
    },
    tasks: [
        { id: 't4', title: '挑战5道数学趣味题', reminderTime: '今天', status: 'Pending' },
        { id: 't5', title: '完成睡前故事《小猫钓鱼》的阅读', reminderTime: '昨天', status: 'Completed' },
    ],
    shareCards: [
      {
        id: 'sc3',
        type: ShareCardType.EmotionalMoment,
        title: '今天有点不开心',
        summary: 'Mia今天在幼儿园和朋友闹了点小别扭，情绪有些低落。她和LUMIBOT聊了聊，现在感觉好多了。',
        timestamp: '5小时前',
        visibility: ShareCardVisibility.Summary,
        expiresInDays: 3,
      },
       {
        id: 'sc5',
        type: ShareCardType.Showcase,
        title: '看我搭的城堡！',
        summary: 'Mia用积木搭了一个漂亮的城堡，并且给它取名叫“梦幻公主堡”，她希望你能看到她的作品。',
        timestamp: '昨天',
        visibility: ShareCardVisibility.Snippet,
        childsComment: '这是我给艾莎公主建的家！',
        expiresInDays: 6,
        imageUrl: 'https://picsum.photos/seed/castle-blocks/400/300',
      },
      {
        id: 'sc8',
        type: ShareCardType.TaskUpdate,
        title: '任务已完成',
        summary: 'Mia完成了任务：“完成睡前故事《小猫钓鱼》的阅读”。',
        timestamp: '1天前',
        visibility: ShareCardVisibility.Summary,
        expiresInDays: 6,
      },
       {
        id: 'sc6',
        type: ShareCardType.HomeworkHelp,
        title: '这个字怎么念？',
        summary: 'Mia在读绘本的时候遇到了一个不认识的字，她圈了出来，希望你能教教她。',
        timestamp: '2天前',
        visibility: ShareCardVisibility.Urgent,
        expiresInDays: 2,
      },
    ],
    weeklyReport: {
      interactionTotal: 3.8,
      topTopics: [
        { name: '音乐', value: 35 },
        { name: '社交', value: 25 },
        { name: '生活', value: 25 },
        { name: '其他', value: 15 },
      ],
      learningTrend: Trend.Stable,
      moodTrend: Trend.Up,
      achievements: ['学会了一首新歌', '帮助准备了家庭晚餐', '主动和小伙伴和好'],
      highlight: {
          title: '最有趣的对话',
          text: 'Mia和LUMIBOT一起为家里的猫咪编了一首歌，充满了想象力。'
      },
      recommendations: [
         {
            title: '家庭挑战邀请',
            text: '下周可以和Mia一起尝试做一个真正的蛋糕！'
        },
        {
            title: '对话引导句',
            text: '“你和朋友和好了，真棒！可以告诉我当时发生了什么吗？”'
        }
      ],
    },
    safetyReports: [],
  },
];