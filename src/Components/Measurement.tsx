import * as React from "react";

interface IMeasurementProps {
    removeLast?:boolean
}

interface BoxProps {
  w: number
}

const Box: React.FunctionComponent<BoxProps> = ({ w }) => {
  return (

      <span
      style={{
        width: `${w}px`
      }}
        className="
        bg-black 
        block
        h-full
        rounded-t-full
        translate-x-1/2
        "
      ></span>
    
  );
};

const Measurement: React.FunctionComponent<IMeasurementProps> = ({removeLast}) => {
  return (
    <div className="grid grid-cols-[repeat(8,1fr)] justify-items-end w-1/4 left-0 bottom-0 h-full opacity-80">
      <Box w={1} />
      <Box w={1} />
      <Box w={1} />
      <Box w={4} />
      <Box w={1} />
      <Box w={1} />
      <Box w={1} />
      
      {!removeLast && <Box w={8} />}
    </div>
  );
};

export default Measurement;
