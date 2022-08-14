import * as React from "react";
import Measurement from "./Measurement";

interface IMeasureMentContainerProps {}

const MeasureMentContainer: React.FunctionComponent<
  IMeasureMentContainerProps
> = (props) => {
  return (
    <div className="absolute flex left-0 bottom-0 h-5 w-full">
      <Measurement />
      <Measurement />
      <Measurement />
      <Measurement removeLast={true} />
    </div>
  );
};

export default MeasureMentContainer;
