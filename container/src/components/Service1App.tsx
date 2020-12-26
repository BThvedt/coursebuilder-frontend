// @ts-ignore
import { mount } from "service_1/Service1App";
import React, { useRef, useEffect } from "react";

const Service1App: React.FC = () => {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);
  });

  return <div ref={ref} />;
};

export default Service1App;
