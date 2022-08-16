import * as React from 'react';

interface IBarProps {
    w:number
    isCurrent:boolean,
    isPause?:boolean
}

const Bar: React.FunctionComponent<IBarProps> = ({w,isCurrent,isPause}) => {

  const classes = 
    (!isPause ? "odd:bg-tertiary even:bg-white first:rounded-l-md last:rounded-r-md" + (isCurrent ? " border-8 border-yellow-300" : "") : "")
    

  return <div style={{width:`${w*100}%`}} 
    className={classes}
    ></div>;
};

export default Bar;
