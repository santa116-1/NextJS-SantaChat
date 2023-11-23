'use client';

import { useChat } from 'ai/react';
import Image from 'next/image';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, data } = useChat();
  return (
    <div className="w-full h-[100vh] bg-cover bg-top flex justify-center items-center" style={{ backgroundImage: "url(images/bg.jpg)" }}>
      <div className="w-[1200px] h-[800px] bg-gradient-to-bl from-[#edb4a6] to-[#cee6fe] rounded-[50px] opacity-[95%] relative p-[40px]">
        <img src="/images/character.png" alt="" width={400} className="absolute left-[50%] translate-x-[-50%] bottom-0 z-[2]" />
        <div className="absolute w-[360px] h-[600px] overflow-y-auto left-[50px] top-[100px] flex flex-col gap-[10px]">
          <div className="whitespace-pre-wrap max-w-[280px] p-3 rounded-t-[20px] ms-auto me-0 bg-[#979ea7] rounded-l-[20px] text-white">
            Well Hello Ho Ho Ho there,<br />
            how are you?<br />
            What would you like to know?<br />
            I guess you are curious about what gift you'll get?
          </div>
          {messages.length > 0
            ? messages.map(m => (
              <div key={m.id} className={`whitespace-pre-wrap max-w-[280px] p-2 rounded-t-[20px] text-white ${m.role === 'user' ? 'ms-0 me-auto bg-[#94c8f3] rounded-r-[20px]' : 'ms-auto me-0 bg-[#979ea7] rounded-l-[20px]'}`}>
                {m.content}
              </div>
            ))
            : null}
        </div>
        <div className="w-full">
          <form className="w-full" onSubmit={handleSubmit}>
            <input
              className="absolute bottom-[20px] z-[3] w-[calc(100%_-_80px)] rounded-[25px] p-3 outline-none bg-[#eee] focus:bg-[#fff]"
              value={input}
              placeholder="What will I get for Chrismas?"
              onChange={handleInputChange}
            />
            <Image src="/images/right-arrow.png" className='absolute bottom-[30px] right-[50px] cursor-pointer z-[4]' width={30} height={30} quality={100} alt="submit" onClick={(e) => handleSubmit(e as any)} />
          </form>
        </div>
      </div>
    </div>
  );
}
