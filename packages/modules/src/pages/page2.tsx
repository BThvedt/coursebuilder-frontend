import React, { FC } from "react";
import { Link } from "react-router-dom";

const Page2: FC = () => {
  return (
    <div>
      <p>Page 2</p>
      <p>
        <Link to="/service_2/page1">Go back to page 1</Link>
      </p>
    </div>
  );
};

export default Page2;
