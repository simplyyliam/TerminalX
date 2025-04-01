import { useRef } from "react"
import gsap from "gsap"


function Github() {

    const iconRef = useRef(null)

    const handleHoverEnter = () => {
        if (iconRef.current) {
            gsap.to(iconRef.current, {
                y: -2,
                rotate: 5,
                duration: 1,
                ease: "expo",
            })
        }
    }
    const handleHoverExit = () => {
        if (iconRef.current) {
            gsap.to(iconRef.current, {
                y: 0,
                rotate: 0,
                duration: 1,
                ease: "expo.out",
            })
        }
    }
    
    
  return (
    <div
      onMouseEnter={handleHoverEnter}
      onMouseLeave={handleHoverExit}
      className="flex items-center justify-center p-4 rounded-[20px] bg-[#0d0d0d] absolute bottom-8 right-8 border-[1px] shadow hover:-translate-y-0.5 transition ease-linear cursor-pointer"
    >
      <a href="https://github.com/simplyyliam/TerminalX.git" target="_blank">
        <div className="relative w-[24px] h-[24px] flex items-center justify-center ">
          <img ref={iconRef} src="/github.png" alt="GitHub Icon" />
        </div>
      </a>
    </div>
  );
}

export default Github