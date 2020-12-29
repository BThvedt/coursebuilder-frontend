// @ts-ignore
import { mount } from "service_2/Service2App";
import React, { useRef, useEffect } from "react";
import { Location, LocationListener } from "history";
import { useHistory } from "react-router-dom";

interface IProps {
  onSignIn?: () => void;
}

interface IMountReturnObject {
  onParentNavigate?: LocationListener<unknown>;
}

const Service1App: React.FC<IProps> = ({ onSignIn }) => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate }: IMountReturnObject = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathName }: Location) => {
        const { pathname } = history.location;

        if (pathname !== nextPathName) {
          history.push(nextPathName);
        }
      },
    });

    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};

export default Service1App;
