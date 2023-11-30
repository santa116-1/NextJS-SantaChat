'use client';

import React, { useState, useEffect, useRef } from "react";
import Typewriter, { Options } from 'typewriter-effect';
import { useChat } from 'ai/react';
import Image from 'next/image';

export default function Chat() {

  const chatHistoryRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, data } = useChat();

  const [isTyping, setIsTyping] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    if (chatHistoryRef.current) {
      const element = chatHistoryRef.current;
      element.scrollTop = element.scrollHeight;
    }
  });

  const handleVideoPlayEnded = () => {
    setIsVideoLoaded(true);
  };

  const backgroundImageUrl = '/images/bg.png';

  const bgStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '675px',
    width: '1200px'
  };

  return (
    <div className={`w-full h-[100vh] bg-cover bg-top flex justify-center items-center bg-[#000]`}>
      <video autoPlay muted loop className="absolute top-0 left-0 w-full h-[100vh] object-cover object-top z-[0]">
        <source src="/videos/video-bg.mp4" type="video/webm" />
        Your browser does not support the video tag.
      </video>
      <div className="w-[1200px] h-[675px] rounded-[50px] relative p-[40px]" style={bgStyle}>
        {!isVideoLoaded ? (
          <video
            autoPlay
            muted
            className={`absolute top-0 left-0 object-fit z-[3]`}
            onEnded={handleVideoPlayEnded}
            width={1200}
            height={675}
          >
            <source src="/videos/01.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <>
            <video
              autoPlay
              muted
              loop
              className={`absolute top-0 left-0 object-fit z-[3]`} width={1200} height={675}>
              <source src="/videos/02.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute top-[40px] left-[40px] z-[5]">
              <img src="/images/small-letter1.png" className="object-cover object-left-top w-auto h-[9px]" alt="bg" />
            </div>
            <div className="absolute top-[40px] left-[50%] z-[5] translate-x-[-50%]">
              <img src="/images/small-letter2.png" className="object-cover object-left-top w-auto h-[9px]" alt="bg" />
            </div>
            <div className="absolute top-[40px] right-[40px] z-[5]">
              <img src="/images/small-letter3.png" className="object-cover object-left-top w-auto h-[9px]" alt="bg" />
            </div>
            <div className="absolute w-[360px] h-[470px] !overflow-y-auto left-[50px] top-[100px] flex flex-col gap-[10px] px-[5px] z-[10]" ref={chatHistoryRef}>
              <div className="whitespace-pre-wrap max-w-[250px] p-3 rounded-t-[20px] ms-auto me-0 bg-[#f45751] rounded-l-[20px] text-white">
                {isTyping ? (
                  <Typewriter
                    onInit={(typewriter) => {
                      typewriter.typeString('Well Hello Ho Ho Ho there,\nhow are you?\nWhat would you like to know?\nI guess you are curious about what gift you\'ll get?')
                        .callFunction(() => {
                          setIsTyping(false);
                        })
                        .start();
                    }}
                    options={{
                      delay: 50
                    }}
                  />
                ) : (
                  <>
                    Well Hello Ho Ho Ho there,<br />
                    how are you?<br />
                    What would you like to know?<br />
                    I guess you are curious about what gift you'll get?
                  </>
                )}
              </div>
              {messages.length > 0
                ? messages.map(m => (
                  <div key={m.id} className={`whitespace-pre-wrap max-w-[280px] p-2 rounded-t-[20px] text-white ${m.role === 'user' ? 'ms-0 me-auto bg-[#94c8f3] rounded-r-[20px]' : 'ms-auto me-0 bg-[#f45751] rounded-l-[20px]'}`}>
                    {m.content}
                  </div>
                ))
                : null}
            </div>
            <div className="w-full">
              <form className="w-full" onSubmit={handleSubmit}>
                <input
                  className="absolute bottom-[20px] z-[10] w-[calc(100%_-_80px)] rounded-[25px] p-3 outline-none bg-[#fff] start-img"
                  value={input}
                  placeholder="What will I get for Chrismas?"
                  onChange={handleInputChange}
                />
                <Image src="/images/right-arrow.png" className='absolute bottom-[30px] right-[50px] cursor-pointer z-[11]' width={30} height={30} quality={100} alt="submit" onClick={(e) => handleSubmit(e as any)} />
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
