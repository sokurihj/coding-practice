'use client';

import { useState } from 'react';

type Todo = {
  text: string;
  done: boolean;
};

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  function addTodo() {
    const text = input.trim();
    if (!text) return;
    setTodos([...todos, { text, done: false }]);
    setInput('');
  }

  function toggleTodo(index: number) {
    setTodos(todos.map((todo, i) =>
      i === index ? { ...todo, done: !todo.done } : todo
    ));
  }

  function deleteTodo(index: number) {
    setTodos(todos.filter((_, i) => i !== index));
  }

  return (
    <main className="min-h-screen bg-[#1a1a2e] flex justify-center px-4 py-12">
      <div className="bg-white w-full max-w-[440px] rounded-2xl p-7 shadow-lg h-fit">
        <h1 className="text-[22px] font-semibold mb-1">Today&apos;s Tasks&apos;</h1>
        <p className="text-[13px] text-gray-400 mb-5">작은 것부터 하나씩 ✏️</p>

        <div className="flex gap-2 mb-5">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.nativeEvent.isComposing) addTodo();
            }}
            placeholder="할 일을 입력하세요"
            className="flex-1 px-3.5 py-3 text-[15px] border border-gray-200 rounded-[10px] outline-none focus:border-[#ff6b35]"
          />
          <button
            onClick={addTodo}
            className="px-4 py-3 text-[15px] font-semibold text-white bg-[#e94560] rounded-[10px] hover:bg-[#c73652] cursor-pointer"
          >
            입력
          </button>
        </div>

        {todos.length === 0 ? (
          <p className="text-center text-gray-300 py-6 text-sm">아직 할 일이 없어요 🌱</p>
        ) : (
          <ul>
            {todos.map((todo, i) => (
              <li key={i} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-none">
                <span
                  onClick={() => toggleTodo(i)}
                  className={`flex-1 cursor-pointer text-[15px] ${todo.done ? 'line-through opacity-40' : ''}`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(i)}
                  className="text-gray-300 text-lg hover:text-[#ff3b3b] cursor-pointer bg-transparent border-none"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
