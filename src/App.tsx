import { useEffect, useState,useLayoutEffect, useRef } from "react";
import "./App.css";
import Bar from "./Components/Bar";
import Measurement from "./Components/Measurement";
import { gsap } from "gsap";
import MeasureMentContainer from "./Components/MeasureMentContainer";

function App() {
  const [bars, setBars] = useState([
    ...Array(12).fill(1 / 4 / 3)
     
  ]);
  
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
            <MeasureMentContainer/>
      </div>
    </div>
  );
}

export default App;
