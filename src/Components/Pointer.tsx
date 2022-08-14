import * as React from "react";

interface IPointerProps {}

const Pointer: React.FunctionComponent<IPointerProps> = (props) => {
  return (
    <>
      <svg
        width="33"
        height="26"
        viewBox="0 0 33 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.9274 1.37947C15.6726 0.251889 17.3274 0.251888 18.0726 1.37947L32.3207 22.9376C33.149 24.1908 32.2503 25.8621 30.7481 25.8621H2.2519C0.749716 25.8621 -0.148987 24.1908 0.679275 22.9376L14.9274 1.37947Z"
          fill="black"
          fill-opacity="0.53"
        />
      </svg>
    </>
  );
};

export default Pointer;
