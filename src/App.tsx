import { useEffect, useState, useLayoutEffect, useRef } from "react";
import "./App.css";
import Bar from "./Components/Bar";
import Measurement from "./Components/Measurement";
import { gsap } from "gsap";
import MeasureMentContainer from "./Components/MeasureMentContainer";
import Pointer from "./Components/Pointer";
import * as Tone from "tone";
import { IBar } from "./Types";
import * as math from "mathjs";

function App() {
  const [bars, setBars] = useState<IBar[]>([
    {
      length: 1 / 4 + 1 / 8 + 1 / 32,
      note: "A#4",
    },
    {
      length: 1 / 32,
      note: "F#4",
    },
    {
      length: 1 / 32,
      note: "C#4",
    },
    {
      length: 1 / 32,
      note: "G#4",
    },
    {
      length: 1 / 4 + 1 / 8,
      note: "F#4",
    },
    {
      length: 1 / 8,
      note: "D#4",
    },
  ]);

  const ref = useRef<HTMLDivElement>(null);
  const [curr, setCurr] = useState(-1);
  const ref2 = useRef<HTMLDivElement>(null);
  const tween = useRef<gsap.core.Tween | null>(null);
  const synth = useRef<Tone.Synth | null>(null);
  const metronome = useRef<Tone.Synth | null>(null);
  const beats = useRef<number>(0);

  useEffect(() => {
    Tone.Transport.bpm.value = 80;
    synth.current = new Tone.Synth({
      envelope: {
        release: 0.1,
      },
    }).toDestination();
    metronome.current = new Tone.Synth({
      envelope: {
        release: 0.1,
      },
    }).toDestination();
  }, []);

  const start = async () => {
    await Tone.start();

    const lengthOfMeasure = Tone.Time("1m").toSeconds();

    let currentTime = 0;
    const notes = bars.map((b, i) => {
      const toReturn = { time: currentTime, note: b.note };
      currentTime += b.length * lengthOfMeasure;
      return toReturn;
    });

    const part = new Tone.Part((time, value) => {
      Tone.Draw.schedule(() => {
        setCurr((prev) => (prev + 1) % bars.length);
      }, time);

      synth.current?.triggerAttackRelease(value.note, 2, time);
    }, notes).start(0);
    const m = new Tone.Loop((time) => {
      if (beats.current % 4 === 0) {
        Tone.Draw.schedule(() => {
          tween.current?.restart();
        }, time);
      }
      beats.current++;
      metronome.current?.triggerAttackRelease("C6", 0.05, time);
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
    tween.current?.seek(0);
    setCurr(-1);
  };

  const pause = () => {
    Tone.Transport.pause();
    tween.current?.pause();
  };
  const resume = () => {
    Tone.Transport.start();
    tween.current?.play();
  };

  const onNoteInput = (e: React.FormEvent<HTMLInputElement>) => {
    const comma = "\\s*,\\s*";
    const plus = "\\s*\\+\\s*";
    const r = "\\d+(?:\\/\\d+)+";
    const r2 = `${r}(?:${plus}${r})*`;
    const r3 = `^${r2}(?:${comma}${r2})*$`;

    let updatedBars: IBar[] = [];

    if (new RegExp(r3).test(e.currentTarget.value)) {
      console.log(e.currentTarget.value);
      if (e.currentTarget.value.includes(",")) {
        const res = math.evaluate(
          e.currentTarget.value.split(/\s*,\s*/)
        ) as number[];

        res.forEach((n) => {
          updatedBars.push({
            length: n,
            note: "C#4",
          });
        });

        console.log(res);
      } else {
        const res = math.evaluate(e.currentTarget.value) as number;
        updatedBars.push({
          length: res,
          note: "A#4",
        });
      }

      setBars(updatedBars)
    }
  };

  return (
    <div className="h-full grid content-center">
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
        mb-28
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
      <div className="flex justify-around mb-10">
        <button onClick={start}>Start</button>
        <button onClick={re}>Restart</button>
        <button onClick={pause}>Pause</button>
        <button onClick={resume}>Resume</button>
      </div>
      {/* <input type="range" onInput={onInput} id="" min="0" max="4000" /> */}
      <input
        type="text"
        onInput={onNoteInput}
        className="text-lg px-6 py-5 outline-none rounded-full"
      />
    </div>
  );
}

export default App;
