"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [items, setItems] = useState([]);
  const [serverMsg, setServerMsg] = useState("");
  const [loading, setLoading] = useState(false);

  function addItem() {
    if (text.trim() === "") return;
    setItems([...items, text]);
    setText("");
  }

  async function askServer() {
    setLoading(true);
    const res = await fetch("/api/hello");
    const data = await res.json();
    setServerMsg(data.message);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-50 p-10">
      <h1 className="text-2xl mb-4">我的清单</h1>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="打几个字"
        className="border p-2 rounded"
      />
      <button onClick={addItem} className="ml-2 bg-black text-white px-4 py-2 rounded">
        添加
      </button>

      <div className="mt-6">
        <button onClick={askServer} className="bg-slate-700 text-white px-4 py-2 rounded">
          {loading ? "请求中…" : "向服务器要一句话"}
        </button>
        <p className="mt-2 text-slate-600">{serverMsg}</p>
      </div>

      <ul className="mt-6">
        {items.map((item, i) => (
          <li key={i} className="border-b border-slate-200 py-2">
            {item}
          </li>
        ))}
      </ul>
    </main>
  );
}
