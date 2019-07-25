import React from "react";
import Loader from "react-loader-spinner";

const Loading = () => (
  <div className="loader">
    <Loader 
      type="Audio"
      color="#000"
      height="100"
      width="100"
    />
  </div>
);

export default Loading;