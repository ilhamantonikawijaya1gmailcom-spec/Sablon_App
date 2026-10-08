import React, { createContext, useContext, useState } from 'react';
import { DesignSize, ShirtColor, ShirtType, Size } from '../types/shirt';

export type Draft = {
  type: ShirtType | null; color: ShirtColor | null; size: Size | null;
  designUri: string | null; designSize: DesignSize | null;
  position: { x: number; y: number }; scale: number;
};
export const emptyDraft: Draft = {
  type: null, color: null, size: null, designUri: null, designSize: null,
  position: { x: 0, y: 0 }, scale: 1,
};
const Ctx = createContext<{ draft: Draft; update: (p: Partial<Draft>) => void; reset: () => void }>(null as any);

export const DraftProvider = ({ children }: { children: React.ReactNode }) => {
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  return (
    <Ctx.Provider value={{ draft, update: (p) => setDraft((d) => ({ ...d, ...p })), reset: () => setDraft(emptyDraft) }}>
      {children}
    </Ctx.Provider>
  );
};
export const useDraft = () => useContext(Ctx);
