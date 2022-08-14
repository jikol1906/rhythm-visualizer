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
      note: "A#4",
    },
    {
      length: 1 / 4 / 3,
      note: "F#4",
    },
    {
      length: 1 / 4 / 3,
      note: "F#4",
    },
    {
      length: 1 / 4 / 3,
      note: "F#4",
    },
    {
      length: 1 / 4,
      note: "C#4",
    },
    {
      length: 1 / 8 + 1/16,
      note: "C#4",
    },
    {
      length: 1/16,
      note: "#4",
    },
  ]);

  const ref = useRef<HTMLDivElement>(null);
  const [curr, setCurr] = useState(0);
  const ref2 = useRef<HTMLDivElement>(null);
  const tween = useRef<gsap.core.Tween | null>(null);
  const synth = useRef<Tone.Synth | null>(null);
  const beats = useRef<number>(0);

  useEffect(() => {
    Tone.Transport.bpm.value = 80;
    synth.current = new Tone.Synth({
      envelope: {
        release: 0.1,
      },
    }).toDestination();
  }, []);

  useEffect(() => {});

  const start = async () => {
    await Tone.start();

    const lengthOfMeasure = Tone.Time("1m").toSeconds();

    let currentTime = 0;
    const notes = bars.map((b, i) => {
      const toReturn = { time: currentTime, note: b.note };
      currentTime += b.length * lengthOfMeasure;
      return toReturn;
    });
    let t = false
    const part = new Tone.Part((time, value) => {
      

      if(t) {
        Tone.Draw.schedule(() => {
          setCurr((prev) => (prev + 1) % bars.length);
        }, time);
      }

      t = true

      synth.current?.triggerAttackRelease(value.note, "8n", time);
    }, notes).start(0);

    const m = new Tone.Loop((time) => {
      if (beats.current % 4 === 0) {
        Tone.Draw.schedule(() => {
          tween.current?.restart();
        }, time);
      }
      beats.current++;
    }, "4n").start(0);

    part.loop = true;

    part.start(0);

    Tone.Transport.start();

    tween.current = gsap.fromTo(
      ref2.current,
      {
        left: 0,
      },
      {
        left: "100%",
        duration: (60 / Tone.Transport.bpm.value) * 4,
        ease: "linear",
      }
    );
  };

  const onInput = (e: React.FormEvent<HTMLInputElement>) => {
    tween.current?.timeScale(+e.currentTarget.value / 1000);
  };

  const re = () => {
    beats.current = 0;
    Tone.Transport.seconds = 0;
    tween.current?.restart();
  };

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
          {bars.map((v, i) => (
            <Bar key={i} isCurrent={curr === i} w={v.length} />
          ))}
        </div>
        <MeasureMentContainer />
        <div ref={ref2} className="absolute left-0 top-[150%] -translate-x-1/2">
          <Pointer />
        </div>
      </div>
      <button onClick={start}>Start</button>
      <button onClick={re}>re</button>
      <input type="range" onInput={onInput} id="" min="0" max="4000" />
    </div>
  );
}

export default App;
