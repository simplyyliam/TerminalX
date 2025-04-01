import { useEffect, useRef, useState } from "react";
import Github from "./components/Github";
import Terminal from "./components/Terminal";
import gsap from "gsap";

function App() {

  const [showTerminal, setShowTerminal] = useState(false)

  useEffect(() => {
    const HandleKeybind = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLocaleLowerCase() === "j") {
        setShowTerminal((prev) => !prev);
      }
    };
    window.addEventListener("keydown", HandleKeybind);

    return () => {
      window.removeEventListener("keydown", HandleKeybind);
    };
  }, []);

  const TerminalXRef = useRef(null)

  useEffect(() => {
    if (TerminalXRef) {
      gsap.to(TerminalXRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "expo.out",
      });
    }
  }, [showTerminal]);
  
  const [isMaximized, setIsMaximized] = useState(false);

  const HandleMaximize = () => {
    if (!TerminalXRef?.current) return;
  
    gsap.to(TerminalXRef.current, {
      width: isMaximized ? 746 : "100vw",
      height: isMaximized ? 640 : "100vh",
      duration: 0.4,
      ease: isMaximized ? "expo.in" : "expo.out",
    });
  
    setIsMaximized((prev) => !prev);
  };
  
  const textRef = useRef(null)

  useEffect(() => {
    gsap.to(textRef.current, {
      opacity: 1,
      duration: 5,
      ease: 'expo.out,'
    })
  }, [])
  
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-br from-[#121212] to-[#4C4C4C]">
      <div className="flex items-center justify-center w-screen h-screen bg-[#01010110]">
        <h1 ref={textRef} className="tracking-[10px] text-xl font-Roboto font-[300] text-white opacity-0">
          Open TerminalX With Ctrl + J
        </h1>
        <Github />
        {showTerminal && (
          <div ref={TerminalXRef} className="absolute opacity-0 scale-0 w-[746px] h-[640px] ">
            <Terminal maxWindow={HandleMaximize}/>
          </div>
        )}
      </div>
    </div>
  );
}

export default App
