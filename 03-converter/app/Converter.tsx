'use client';

import { useState } from 'react';

type Unit = {
  label: string;
  toMeter: number;
};

const UNITS: Unit[] = [
  { label: 'km (킬로미터)', toMeter: 1000 },
  { label: 'm (미터)', toMeter: 1 },
  { label: 'cm (센티미터)', toMeter: 0.01 },
  { label: 'mm (밀리미터)', toMeter: 0.001 },
  { label: 'mile (마일)', toMeter: 1609.344 },
  { label: 'yard (야드)', toMeter: 0.9144 },
  { label: 'ft (피트)', toMeter: 0.3048 },
  { label: 'inch (인치)', toMeter: 0.0254 },
];

function convert(value: number, fromIndex: number, toIndex: number): string {
  const meters = value * UNITS[fromIndex].toMeter;
  const result = meters / UNITS[toIndex].toMeter;
  if (result === 0) return '0';
  if (result >= 0.001 && result < 1_000_000) return parseFloat(result.toPrecision(6)).toString();
  return result.toExponential(4);
}

export default function Converter() {
  const [input, setInput] = useState('');
  const [fromIndex, setFromIndex] = useState(0);

  const value = parseFloat(input);
  const hasValue = input !== '' && !isNaN(value);

  return (
    <main className="min-h-screen bg-[#0f172a] flex justify-center px-4 py-12">
      <div className="w-full max-w-[480px] h-fit">
        <h1 className="text-white text-2xl font-bold mb-1">길이 변환기</h1>
        <p className="text-slate-400 text-sm mb-8">단위를 선택하고 숫자를 입력하세요</p>

        {/* 입력 영역 */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-4">
          <label className="text-slate-400 text-xs mb-2 block">변환할 값</label>
          <input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="0"
            className="w-full bg-transparent text-white text-3xl font-light outline-none placeholder-white/20 mb-4"
          />
          <label className="text-slate-400 text-xs mb-2 block">단위</label>
          <select
            value={fromIndex}
            onChange={(e) => setFromIndex(Number(e.target.value))}
            className="w-full bg-white/10 text-white rounded-lg px-3 py-2 outline-none cursor-pointer"
          >
            {UNITS.map((unit, i) => (
              <option key={i} value={i} className="bg-slate-800">{unit.label}</option>
            ))}
          </select>
        </div>

        {/* 결과 목록 */}
        <div className="space-y-2">
          {UNITS.map((unit, i) => {
            if (i === fromIndex) return null;
            return (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 flex justify-between items-center">
                <span className="text-slate-400 text-sm">{unit.label}</span>
                <span className="text-white text-lg font-medium">
                  {hasValue ? convert(value, fromIndex, i) : '—'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
