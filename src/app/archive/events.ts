import * as blurStirMod from './blur-stir/data';
import * as faellesspisningMod from './faellesspisning/data';
import * as hazamaMod from './hazama/data';
import * as traceTrashMod from './trace-trash/data';
import * as trouvailleMod from './trouvaille/data';

export type EventItem = {
  id: string;
  title: string;
  year: number | string;
  city?: string;
  date?: string;
  location?: string;
  description?: string;
  imageUrl?: string;
  mainImage?: string;
  image?: string;
  [key: string]: any;
};

// モジュール内から EventData 型のオブジェクトを自動探索
const extractData = (mod: any): any => {
  if (!mod) return {};
  // 1. default や eventData などの定番プロパティ
  if (mod.default) return mod.default;
  if (mod.eventData) return mod.eventData;

  // 2. モジュール内でエクスポートされている最初のオブジェクトを探す（例: traceTrashData 等）
  const exportedKeys = Object.keys(mod).filter((k) => k !== '__esModule');
  for (const key of exportedKeys) {
    if (typeof mod[key] === 'object' && mod[key] !== null && 'title' in mod[key]) {
      return mod[key];
    }
  }

  return mod;
};

export const eventTable: Record<string, EventItem> = {
  'blur-stir': { id: 'blur-stir', ...extractData(blurStirMod) },
  'faellesspisning': { id: 'faellesspisning', ...extractData(faellesspisningMod) },
  'hazama': { id: 'hazama', ...extractData(hazamaMod) },
  'trace-trash': { id: 'trace-trash', ...extractData(traceTrashMod) },
  'trouvaille': { id: 'trouvaille', ...extractData(trouvailleMod) },
};