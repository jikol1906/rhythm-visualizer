import * as React from 'react';

interface IBarProps {
    w:number
}

const Bar: React.FunctionComponent<IBarProps> = ({w}) => {
  return <div style={{width:`${w*100}%`}} className={"last:rounded-r-md odd:bg-tertiary even:bg-white "}></div>;
};

export default Bar;
