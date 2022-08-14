import { useEffect, useState,useLayoutEffect, useRef } from "react";
import "./App.css";
import Bar from "./Components/Bar";
import Measurement from "./Components/Measurement";
import { gsap } from "gsap";

function App() {
  const [bars, setBars] = useState([
    1 / 4, 
    1 / 8, 
    1 / 4, 1/8+1/16,
    1/16]);
  
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    gsap.fromTo(ref.current,{
      opacity: 0,
      y:-50,
      
    }, {
      opacity: 1,
      y:-0,
      duration:2,
      ease: "circ.out",
    })
  }, []);
  return (
    <div className="h-full flex justify-center items-center">
      <div
      ref={ref}
        className="
        drop-shadow-md		
    bg-secondary 
    flex 
    rounded-md 
    w-container 
    h-container overflow-hidden 
    relative
    
    "
      >
        <div className="flex flex-1">
          {bars.map((v) => (
            <Bar w={v} />
          ))}
        </div>
        <div className="absolute flex left-0 bottom-0 h-5 w-full">
          <Measurement />
          <Measurement />
          <Measurement />
          <Measurement removeLast={true} />
        </div>
      </div>
    </div>
  );
}

export default App;
