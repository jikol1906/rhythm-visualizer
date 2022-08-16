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

const startBPM = 120

function App() {
  const [bars, setBars] = useState<IBar[]>([]);

  
  const [curr, setCurr] = useState(-1);
  const [bpm, setBpm] = useState(startBPM)
  const ref2 = useRef<HTMLDivElement>(null);
  const tween = useRef<gsap.core.Tween | null>(null);
  const synth = useRef<Tone.Synth | null>(null);
  const part = useRef<Tone.Part | null>(null);
  const metronome = useRef<Tone.Synth | null>(null);
  const loop = useRef<Tone.Loop | null>(null);
  const toneStarted = useRef(false)
  const beats = useRef<number>(0);

  useEffect(() => {
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

  useEffect(() => {
    Tone.Transport.bpm.value = bpm;

    if(tween.current) {
      tween.current.timeScale(bpm/startBPM)
    }
  },[bpm])


  useEffect(() => {

    const lengthOfMeasure = Tone.Time("1m").toSeconds();

    
    
    
    let currentTime = 0;
    const notes = bars.map((b, i) => {
      
      
      const toReturn = { time: currentTime, note: b.note, length:b.length * lengthOfMeasure, isPause:b.isPause };
      currentTime += b.length * lengthOfMeasure;
      

        return toReturn;
      
    });

    const part = new Tone.Part((time, value) => {
      Tone.Draw.schedule(() => {
        setCurr((prev) => (prev + 1) % bars.length);
      }, time);
      if(!value.isPause) {
        synth.current?.triggerAttackRelease(value.note, value.length, time);
      }
    }, notes).start(0);
    
    part.loop = true;

    const m = new Tone.Loop((time) => {
      if (beats.current % 4 === 0) {
        Tone.Draw.schedule(() => {
          console.log("is active",tween.current?.isActive());
          
          if(!tween.current?.paused()) {
            tween.current?.restart();
          }
        }, time);
      }
      beats.current++;
      metronome.current?.triggerAttackRelease("C6", 0.05, time,.5);
    }, "4n").start(0);

    setCurr(-1)
    tween.current?.seek(0);
    beats.current = 0;
    
    Tone.Transport.seconds = 0;

    return () => {
      part.dispose();
      m.dispose()
    }

  },[bars])

  const start = async () => {
    if(!toneStarted.current) {
      await Tone.start();  
      toneStarted.current = true
    }
    re()
    


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

    

    Tone.Transport.start();

  };

  const updateNotePart = () => {

  }

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
    const space = "\\s*"
    const comma = `${space},${space}`;
    const note = `[A-Ga-g][#b]?[0-9]`
    const pause =`p`
    const plus = `${space}\\+${space}`;
    const fraction = `\\d+(?:\\/\\d+)+`;
    const r2 = `${space}(${fraction}(?:${plus}${fraction})*)${space}(${pause}|${note})${space}`;
    const r3 = `^${r2}(?:${comma}${r2})*$`;

    let updatedBars: IBar[] = [];
    if (new RegExp(r3).test(e.currentTarget.value)) {
      
      
        const values = e.currentTarget.value.split(/\s*,\s*/)
        
        
        
        updatedBars = values.map((v,i) => {
          
          let isPause = /p$/.test(v)
          const [_,frac,parsedNote] = v.match(new RegExp(r2)) as string[]
          const t = v.match(new RegExp(r2)) as string[]

          
          return {
            note:parsedNote,
            length: math.evaluate(frac),
            isPause 
          } as IBar
        })

      

      setBars(updatedBars)
    }
  };
  
  const increaseBPM = () => {
    setBpm(prev => prev + 5)
  }
  const decreaseBPM = () => {
    setBpm(prev => prev - 5)
  }

  return (
    <div className="h-full grid content-center">
      <div
        
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
            <Bar key={i} isPause={v.isPause} isCurrent={curr === i} w={v.length} />
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
        <button onClick={increaseBPM}>increase bpm</button>
        <button onClick={decreaseBPM}>decrease bpm</button>
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
