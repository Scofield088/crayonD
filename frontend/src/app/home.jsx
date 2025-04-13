import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [chat, setChat] = useState([]);

  const askBot = async () => {
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: "user1", message: query })
    });
    const data = await res.json();
    setChat([...chat, { user: query, bot: data.response }]);
    setQuery("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Tech Gadget Advisor</h1>
      <div className="bg-white p-4 rounded shadow">
        {chat.map((msg, i) => (
          <div key={i}>
            <p><strong>You:</strong> {msg.user}</p>
            <p><strong>Bot:</strong> {msg.bot}</p>
          </div>
        ))}
      </div>
      <input
        className="border mt-4 p-2 w-full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask something..."
      />
      <button onClick={askBot} className="bg-blue-600 text-white mt-2 p-2 rounded">
        Ask
      </button>
    </div>
  );
}
