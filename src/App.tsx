import { useEffect, useState, useLayoutEffect, useRef } from "react";
import "./App.css";
import Bar from "./Components/Bar";
import Measurement from "./Components/Measurement";
import { gsap } from "gsap";
import MeasureMentContainer from "./Components/MeasureMentContainer";
import Pointer from "./Components/Pointer";
import * as Tone from "tone";
import { IBar } from "./Types";

function App() {
  const [bars, setBars] = useState<IBar[]>([
    {
      length: 1 / 4,
      note: "A#",
    },
  ]);

  const ref = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const tween = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    gsap.fromTo(
      ref.current,
      {
        opacity: 0,
        y: -50,
      },
      {
        opacity: 1,
        y: -0,
        duration: 1.3,
        ease: "circ.out",
      }
    );
  }, []);

  const start = () => {
    tween.current = gsap.fromTo(
      ref2.current,
      {
        left: 0,
      },
      {
        left: "100%",
        duration: 10,
        ease: "linear",
        repeat: -1,
      }
    );
  };

  const onInput = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(+e.currentTarget.value);
    
    tween.current?.timeScale(+e.currentTarget.value / 1000)
  }

  return (
    <div className="h-full grid content-center gap-28">
      <div
        ref={ref}
        className="
        drop-shadow-md		
      bg-secondary 
        flex 
        flex-1
        rounded-md 
        h-container
        relative
        "
      >
        <div className="flex flex-1">
          {bars.map((v,i) => (
            <Bar key={i} w={v.length} />
          ))}
        </div>
        <MeasureMentContainer />
        <div ref={ref2} className="absolute left-0 top-[150%] -translate-x-1/2">
          <Pointer />
        </div>
      </div>
      <button onClick={start}>Start</button>
      <input type="range" onInput={onInput} id="" min="0" max="4000" />
    </div>

  );
}

export default App;
