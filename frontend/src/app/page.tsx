'use client';
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [chat, setChat] = useState<{ user: string; bot: string }[]>([]);

  const askBot = async () => {
    if (!query.trim()) return;

    try {
      const res = await fetch("http://localhost:8000/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: "user1", message: query }),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();

      if (!data || typeof data.response !== "string") {
        throw new Error("Unexpected API response");
      }

      setChat((prevChat) => [...prevChat, { user: query, bot: data.response }]);
      setQuery("");
    } catch (error) {
      console.error("Error talking to the bot:", error);
      setChat((prevChat) => [
        ...prevChat,
        { user: query, bot: "⚠️ Sorry, something went wrong. Try again!" },
      ]);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center p-6 relative overflow-hidden text-white">

      {/* Faint Tech BG Image */}
      <div className="absolute inset-0 bg-[url('/images/image.png')] bg-cover bg-center opacity-10 z-0 blur-sm" />

      {/* Floating Gadgets */}
      <div className="absolute top-10 left-0 right-0 flex justify-center gap-6 animate-fade-in z-0">
        <img src="/images/gadget1.png" alt="Gadget 1" className="w-28 h-28 rounded-xl shadow-lg border border-gray-600 hover:scale-110 transition-all duration-300" />
        <img src="/images/gadget2.jpg" alt="Gadget 2" className="w-28 h-28 rounded-xl shadow-lg border border-gray-600 hover:scale-110 transition-all duration-300" />
        <img src="/images/gadget3.jpg" alt="Gadget 3" className="w-28 h-28 rounded-xl shadow-lg border border-gray-600 hover:scale-110 transition-all duration-300" />
        <img src="/images/gadget4.jpg" alt="Gadget 4" className="w-28 h-28 rounded-xl shadow-lg border border-gray-600 hover:scale-110 transition-all duration-300" />
      </div>

      {/* Main UI Box */}
      <div className="w-full max-w-3xl bg-white bg-opacity-10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl z-10 border border-white/10 transition-all">

        <h1 className="text-4xl font-extrabold mb-8 text-center tracking-wide text-cyan-300 drop-shadow-md">
          🤖 Tech Gadget Advisor
        </h1>

        {/* Chat Box */}
        <div className="space-y-4 max-h-[300px] overflow-y-auto mb-6 scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-gray-800 pr-2">
          {chat.map((msg, i) => (
            <div key={i} className="bg-white bg-opacity-5 p-4 rounded-xl shadow-md hover:bg-opacity-10 transition-all">
              <p className="text-lg text-white font-semibold"><strong>You:</strong> {msg.user}</p>
              <p className="text-cyan-200 mt-2 text-lg"><strong>Bot:</strong> {msg.bot}</p>
            </div>
          ))}
        </div>

        {/* Input Section */}
        <div className="flex flex-col gap-4">
          <input
            className="border border-cyan-500 bg-black bg-opacity-50 text-white rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-400 shadow-inner"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about your next gadget..."
          />
          <button
            onClick={askBot}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-600 hover:to-cyan-400 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Ask
          </button>
        </div>
      </div>
    </main>
  );
}
