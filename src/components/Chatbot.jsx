import { useState, useRef, useEffect } from "react";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: <>Hi! I'm Cupcake your EatWise assistant.</>,
    },
  ]);

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = async () => {
    if (!input) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    setTyping(true); // ✅ START typing

    try {
      const res = await fetch(
        "https://eat-wise-phi.vercel.app/_/backend/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: input }),
        },
      );

      const data = await res.json();

      setTyping(false); // ✅ STOP typing

      const botMsg = { sender: "bot", text: data.reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      setTyping(false); // ✅ STOP even on error
      console.error(error);
    }

    setInput("");
  };

  return (
    <>
      {/* Floating Cupcake Button */}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-20 h-20 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition"
          style={{ backgroundColor: "#06D6A0" }}
        >
          <img src="/cupcake.png" alt="Cupcake AI" className="w-12 h-auto" />
        </button>
      )}

      {/* Chat Window */}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 bg-white shadow-2xl rounded-2xl border border-gray-200 flex flex-col">
          {/* Header */}

          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-800">Cupcake AI</span>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 text-lg"
            >
              ✕
            </button>
          </div>

          {/* Messages */}

          <div className="h-80 overflow-y-auto p-3 space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.sender === "user"
                    ? "bg-green-100 ml-auto text-right"
                    : "bg-gray-100"
                }`}
              >
                {typeof msg.text === "string"
                  ? msg.text.replace(/\*\*/g, "").replace(/[*#]/g, "")
                  : msg.text}
              </div>
            ))}

            {typing && (
              <div className="bg-gray-100 p-2 rounded-lg max-w-[80%]">
                Cupcake is typing...
              </div>
            )}

            <div ref={messagesEndRef}></div>
          </div>

          {/* Input */}

          <div className="relative border-t p-3 flex items-center gap-3">
            <img
              src="/cupcake.png"
              alt="Cupcake"
              className="inline w-10 h-auto mx-1 animate-bounce"
            />

            <input
              type="text"
              placeholder="Ask Cupcake..."
              className="flex-1 p-3 pr-14 outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            {/* Floating Send Button */}

            <button
              onClick={sendMessage}
              className="absolute right-3 bottom-3 w-10 h-10 rounded-full text-white flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition"
              style={{ backgroundColor: "#06D6A0" }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
