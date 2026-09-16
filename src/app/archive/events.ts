import * as blurStirMod from './blur-stir/data';
import * as faellesspisningMod from './faellesspisning/data';
import * as hazamaMod from './hazama/data';
import * as traceTrashMod from './trace-trash/data';
import * as trouvailleMod from './trouvaille/data';

// 🌟 id は eventTable 側で明示的に付与するため、抽出結果の型には含めない
// （含めてしまうと後段のスプレッドで「id が二重指定」というTSの誤検知が発生する）
type ExtractedData = {
  title: string;
  year: number | string;
  city?: string;
  date?: string;
  location?: string;
  description?: string;
  imageUrl?: string;
  mainImage?: string;
  image?: string;
  [key: string]: unknown;
};

export type EventItem = ExtractedData & { id: string };

// モジュール内から EventData 型のオブジェクトを自動探索
// 🌟 各 ./*/data.ts のエクスポート形はモジュールごとに異なるため、実行時のダックタイピングで判定している。
// 見つかった値は 'title' の有無を確認済みなので ExtractedData として扱って問題ない。

const extractData = (mod: unknown): ExtractedData => {
  const m = (mod ?? {}) as Record<string, unknown>;

  // 1. default や eventData などの定番プロパティ
  if (m.default) return m.default as ExtractedData;
  if (m.eventData) return m.eventData as ExtractedData;

  // 2. モジュール内でエクスポートされている最初のオブジェクトを探す（例: traceTrashData 等）
  const exportedKeys = Object.keys(m).filter((k) => k !== '__esModule');
  for (const key of exportedKeys) {
    const value = m[key];
    if (typeof value === 'object' && value !== null && 'title' in value) {
      return value as ExtractedData;
    }
  }

  return m as ExtractedData;
};

export const eventTable: Record<string, EventItem> = {
  'blur-stir': { id: 'blur-stir', ...extractData(blurStirMod) },
  'faellesspisning': { id: 'faellesspisning', ...extractData(faellesspisningMod) },
  'hazama': { id: 'hazama', ...extractData(hazamaMod) },
  'trace-trash': { id: 'trace-trash', ...extractData(traceTrashMod) },
  'trouvaille': { id: 'trouvaille', ...extractData(trouvailleMod) },
};