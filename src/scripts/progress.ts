/* 学习进度 · localStorage 存取
   每课一条：rbi:v1:lesson:<slug>
   练习日志（算连续天数）：rbi:v1:days  */

export interface LessonProgress {
  done?: boolean;
  doneAt?: string;
  recall?: { correct: number; total: number; at: string };
  quiz?: { correct: number; total: number; at: string };
  attempts?: number;
}

const LESSON_KEY = (slug: string) => `rbi:v1:lesson:${slug}`;
const DAYS_KEY = 'rbi:v1:days';

function today(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function getLesson(slug: string): LessonProgress {
  try {
    return JSON.parse(localStorage.getItem(LESSON_KEY(slug)) || '{}');
  } catch {
    return {};
  }
}

function setLesson(slug: string, p: LessonProgress) {
  localStorage.setItem(LESSON_KEY(slug), JSON.stringify(p));
}

/** 任何一次练习动作都记一天，用于连续天数 */
export function logPracticeDay() {
  const days = getDays();
  const t = today();
  if (!days.includes(t)) {
    days.push(t);
    localStorage.setItem(DAYS_KEY, JSON.stringify(days));
  }
}

export function getDays(): string[] {
  try {
    return JSON.parse(localStorage.getItem(DAYS_KEY) || '[]');
  } catch {
    return [];
  }
}

/** 从今天（或昨天）往回数的连续练习天数 */
export function streak(): number {
  const days = new Set(getDays());
  let n = 0;
  const cur = new Date();
  // 今天还没练不打断连续：从今天开始数，今天缺就从昨天开始
  if (!days.has(today())) cur.setDate(cur.getDate() - 1);
  for (;;) {
    const key = `${cur.getFullYear()}-${String(cur.getMonth() + 1).padStart(2, '0')}-${String(cur.getDate()).padStart(2, '0')}`;
    if (!days.has(key)) break;
    n++;
    cur.setDate(cur.getDate() - 1);
  }
  return n;
}

export function recordRecall(slug: string, correct: number, total: number) {
  const p = getLesson(slug);
  p.recall = { correct, total, at: new Date().toISOString() };
  p.attempts = (p.attempts || 0) + 1;
  setLesson(slug, p);
  logPracticeDay();
}

export function recordQuiz(slug: string, correct: number, total: number) {
  const p = getLesson(slug);
  p.quiz = { correct, total, at: new Date().toISOString() };
  setLesson(slug, p);
  logPracticeDay();
}

export function markDone(slug: string) {
  const p = getLesson(slug);
  p.done = true;
  p.doneAt = new Date().toISOString();
  setLesson(slug, p);
  logPracticeDay();
}

export function doneCount(slugs: string[]): number {
  return slugs.filter((s) => getLesson(s).done).length;
}
