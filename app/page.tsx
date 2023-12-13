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
      element.scrollTo({ top: element.scrollHeight, behavior: 'smooth' })
    }
  }, [chatHistoryRef.current?.scrollHeight]);

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

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 1200;

  return (
    <div className="w-full h-[100vh] bg-cover bg-top flex justify-center items-center bg-[#000]">
      <video
        autoPlay
        muted
        loop
        src="/videos/video-bg.mp4"
        className="absolute top-0 left-0 w-full h-[100vh] object-cover object-top z-[0] max-[1200px]:hidden"
      />
      <div className="w-[1200px] h-[675px] md:rounded-[50px] relative min-[1201px]:p-[40px] max-[1200px]:!h-[100vh] max-[1200px]:!bg-center" style={bgStyle}>
        {!isVideoLoaded && !isMobile ? (
          <video
            autoPlay
            muted
            className="absolute top-0 left-0 object-fit z-[3] min-[1201px]:scale-x-[1.07] min-[1201px]:scale-y-[1.135] max-w-[1200px] w-full h-[100vh] min-[1201px]:h-[675px]"
            onEnded={handleVideoPlayEnded}
            src="/videos/01.webm"
          />
        ) : (
          <>
            <video
              autoPlay
              muted
              loop
              src="/videos/02.webm"
              className="absolute top-0 left-0 object-fit z-[3] scale-x-[1.07] scale-y-[1.135] max-w-[1200px] w-full h-[675px] max-[1200px]:h-[100vh] max-[1200px]:left-[70px] max-[450px]:object-top max-[450px]:scale-[1.5] max-[450px]:top-[25%] max-[450px]:left-[-25%] max-[1200px]:hidden"
            />
            <div className="absolute top-[40px] left-[70px] max-[1200px]:top-[20px] max-[1200px]:left-[50px] z-[100]">
              <img src="/images/small-letter1.png" className="object-cover object-left-top w-auto h-[9px]" alt="bg" />
            </div>
            <div className="absolute top-[40px] right-[70px] max-[1200px]:top-[20px] max-[1200px]:right-[50px] z-[100]">
              <img src="/images/small-letter3.png" className="object-cover object-left-top w-auto h-[9px]" alt="bg" />
            </div>
            <div className="absolute max-w-[1100px] w-full h-[470px] !overflow-y-auto min-[1201px]:left-[50px] min-[1201px]:top-[100px] flex flex-col gap-[10px] pl-[5px] max-[1200px]:pt-[50px] min-[1201px]:pr-[545px] pr-[47%] z-[10] max-[450px]:p-0 max-[450px]:px-[40px] max-[450px]:top-[300px] max-[1200px]:h-[250px] max-[450px]:h-[300px] max-[1200px]:pl-[40px]" ref={chatHistoryRef}>
              <div className="whitespace-pre-wrap max-w-[300px] !w-fit p-3 rounded-t-[20px] ms-auto me-0 bg-[#f45751] rounded-l-[20px] text-white max-[1200px]:text-[14px]">
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
                  <div key={m.id} className={`whitespace-pre-wrap max-w-[280px] p-2 rounded-t-[20px] text-white ${m.role === 'user' ? 'ms-0 me-auto bg-[#7c8c9b] rounded-r-[20px]' : 'ms-auto me-0 bg-[#f45751] rounded-l-[20px]'}`}>
                    {m.content}
                  </div>
                ))
                : null}
            </div>
            <div className="w-full">
              <form className="w-full" onSubmit={handleSubmit}>
                <input
                  className="absolute bottom-[20px] z-[10] w-[calc(100%_-_80px)] rounded-[25px] p-3 outline-none bg-[#fff] max-[1200px]:p-2 max-[1200px]:text-[14px] max-[1200px]:left-[40px] start-img"
                  value={input}
                  placeholder="What will I get for Christmas?"
                  onChange={handleInputChange}
                />
                <Image src="/images/right-arrow.png" className='absolute bottom-[30px] right-[50px] cursor-pointer z-[11] max-[1200px]:bottom-[25px]' width={30} height={30} quality={100} alt="submit" onClick={(e) => handleSubmit(e as any)} />
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
