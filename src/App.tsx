import { useState } from "react";
import "./App.css";
import Bar from "./Components/Bar";
import Measurement from "./Components/Measurement";

function App() {
  const [bars, setBars] = useState([
    1/4,
    1/4,
    1/4,
    1/8+1/16,
  ],
    );

  return (
    <div className="h-full flex justify-center items-center">
      <div
        className="
        drop-shadow-md		
    bg-secondary 
    flex 
    rounded-md 
    w-containerSmall lg:w-container 
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
        <Measurement removeLast={false}/>
        <Measurement removeLast={false}/>
        <Measurement removeLast={false}/>
        <Measurement removeLast={true}/>
        </div>
      </div>
    </div>
  );
}

export default App;
