"use client"

import { useState, useEffect } from "react"

export default function Home() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [memos, setMemos] = useState<{ title: string; content: string }[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("memos")
    if (saved) setMemos(JSON.parse(saved))
  }, [])

  function saveMemo() {
    if (!title.trim()) return
    const newMemos = [...memos, { title, content }]
    setMemos(newMemos)
    localStorage.setItem("memos", JSON.stringify(newMemos))
    setTitle("")
    setContent("")
  }

  function deleteMemo(index: number) {
    const newMemos = memos.filter((_, i) => i !== index)
    setMemos(newMemos)
    localStorage.setItem("memos", JSON.stringify(newMemos))
  }

  return (
    <div className="min-h-screen bg-[#111009] text-[#E8DFC8]">

      {/* 헤더 */}
      <header className="border-b border-[#C9A84C]/30 px-8 py-6">
        <div className="max-w-5xl mx-auto flex items-end justify-between">
          <div>
            <h1
              className="text-3xl font-bold tracking-[0.4em] text-[#C9A84C] uppercase"
              style={{ fontFamily: "'Libre Baskerville', serif" }}
            >
              MEMO
            </h1>
            <p className="text-xs text-[#E8DFC8]/40 tracking-[0.2em] mt-1">Personal Notes</p>
          </div>
          <span className="text-xs text-[#E8DFC8]/30 tracking-widest mb-1">
            {memos.length} entries
          </span>
        </div>
      </header>

      {/* 메인 */}
      <div className="max-w-5xl mx-auto px-8 py-10 grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* 왼쪽 — 새 메모 작성 */}
        <div className="space-y-5">
          <p className="text-xs tracking-[0.25em] text-[#C9A84C]/70 uppercase">새 메모 작성</p>

          <input
            className="w-full bg-transparent border-b border-[#C9A84C]/40 pb-3 text-lg placeholder:text-[#E8DFC8]/20 focus:outline-none focus:border-[#C9A84C] transition-colors duration-300"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="w-full bg-[#1C1A14] border border-[#C9A84C]/20 p-4 text-sm placeholder:text-[#E8DFC8]/20 focus:outline-none focus:border-[#C9A84C]/50 transition-colors duration-300 resize-none leading-relaxed"
            placeholder="내용을 입력하세요..."
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button
            onClick={saveMemo}
            className="w-full border border-[#C9A84C]/60 py-3 text-sm tracking-[0.25em] uppercase text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#111009] transition-all duration-300 cursor-pointer"
          >
            저장
          </button>
        </div>

        {/* 오른쪽 — 메모 목록 */}
        <div className="space-y-4">
          <p className="text-xs tracking-[0.25em] text-[#C9A84C]/70 uppercase">메모 목록</p>

          {memos.length === 0 ? (
            <div className="border border-dashed border-[#E8DFC8]/10 p-12 text-center">
              <p className="text-[#E8DFC8]/20 text-sm">아직 메모가 없어요</p>
            </div>
          ) : (
            <div className="space-y-3">
              {memos.map((memo, i) => (
                <div
                  key={i}
                  className="group border-l-2 border-[#C9A84C]/30 bg-[#1C1A14] px-5 py-4 hover:border-[#C9A84C] transition-all duration-200"
                >
                  <div className="flex justify-between items-start">
                    <h2 className="text-sm font-bold text-[#E8DFC8] tracking-wide">{memo.title}</h2>
                    <button
                      onClick={() => deleteMemo(i)}
                      className="text-[#E8DFC8]/0 group-hover:text-[#E8DFC8]/30 hover:!text-red-400 text-xs transition-colors duration-200 cursor-pointer ml-4 shrink-0"
                    >
                      삭제
                    </button>
                  </div>
                  {memo.content && (
                    <p className="mt-2 text-xs text-[#E8DFC8]/45 leading-relaxed line-clamp-2">
                      {memo.content}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
