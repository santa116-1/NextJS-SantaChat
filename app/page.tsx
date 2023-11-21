'use client';

import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, data } = useChat();
  return (
    <div className="w-full h-[100vh] bg-cover bg-top flex justify-center items-center" style={{ backgroundImage: "url(images/bg.jpg)" }}>
      <div className="w-[1200px] h-[800px] bg-gradient-to-bl from-[#edb4a6] to-[#cee6fe] rounded-[50px] opacity-[95%] relative p-[40px]">
        <img src="/images/character.png" alt="" width={400} className="absolute left-[50%] translate-x-[-50%] bottom-0 z-[2]" />
        <div className="absolute w-[360px] left-[50px] top-[100px]">
          {messages.length > 0
            ? messages.map(m => (
              <div key={m.id} className={`whitespace-pre-wrap max-w-[200px] ${m.role === 'user' ? 'text-left' : 'text-right'}`}>
                {m.content}
              </div>
            ))
            : null}
        </div>
        <div className="">
          <form onSubmit={handleSubmit}>
            <input
              className="absolute bottom-[20px] z-[3] w-[calc(100%_-_80px)] rounded p-3"
              value={input}
              placeholder="Say something..."
              onChange={handleInputChange}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
