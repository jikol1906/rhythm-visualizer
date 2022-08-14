import * as React from 'react';

interface IBarProps {
    w:number
}

const Bar: React.FunctionComponent<IBarProps> = ({w}) => {
  return <div style={{width:`${w*100}%`}} 
    className={"odd:bg-tertiary even:bg-white first:rounded-l-md last:rounded-r-md"}
    ></div>;
};

export default Bar;
