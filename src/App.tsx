import { useEffect, useState,useLayoutEffect, useRef } from "react";
import "./App.css";
import Bar from "./Components/Bar";
import Measurement from "./Components/Measurement";
import { gsap } from "gsap";
import MeasureMentContainer from "./Components/MeasureMentContainer";
import Pointer from "./Components/Pointer";

function App() {
  const [bars, setBars] = useState([
    1/4,
    1/4,
    1/4,
    
     
  ]);
  
  const ref = useRef<HTMLDivElement>(null)
  const ref2 = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    gsap.fromTo(ref.current,{
      opacity: 0,
      y:-50,
      
    }, {
      opacity: 1,
      y:-0,
      duration:1.3,
      ease: "circ.out",
    })

    const g = gsap.fromTo(ref2.current,{
      left:0,
      
    }, {
      left:"100%",
      duration:10,
      ease: "linear",
      repeat:-1
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
    flex-1
    rounded-md 
    max-w-container
    h-container
    relative
    "
      >
        <div className="flex flex-1">
          {bars.map((v) => (
            <Bar w={v} />
          ))}
        </div>
            <MeasureMentContainer/>
            <div ref={ref2} className="absolute left-0 top-[120%] -translate-x-1/2">
              <Pointer/>
            </div>
      </div>
    </div>
    
  );
}

export default App;
