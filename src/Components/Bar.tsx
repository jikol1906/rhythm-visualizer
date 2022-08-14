import * as React from 'react';

interface IBarProps {
    w:number
    isCurrent:boolean
}

const Bar: React.FunctionComponent<IBarProps> = ({w,isCurrent}) => {
  return <div style={{width:`${w*100}%`}} 
    className={"odd:bg-tertiary even:bg-white first:rounded-l-md last:rounded-r-md" + (isCurrent ? " border-8 border-yellow-300" : "")}
    ></div>;
};

export default Bar;
