import * as React from "react";

interface IMeasurementProps {
    removeLast?:boolean
}

interface BoxProps {
  w: number
}

const Box: React.FunctionComponent<BoxProps> = ({ w }) => {
  return (
    <div
      className="
    flex-1
    relative 
    "
    >
      <div
      style={{
        width: `${w}px`
      }}
        className="
        content-[''] 
        bg-black 
        block
        absolute
        right-0
        bottom-0
        h-full
        translate-x-1/2
        rounded-t-full
        "
      ></div>
    </div>
  );
};

const Measurement: React.FunctionComponent<IMeasurementProps> = ({removeLast}) => {
  return (
    <div className="grid grid-cols-[repeat(8,1fr)] w-1/4 left-0 bottom-0 h-full opacity-80">
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
