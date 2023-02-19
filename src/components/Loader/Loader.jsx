import React from "react";
import Classes from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={Classes.loader_wrapper}>
      <div className={Classes.loader}></div>
    </div>
  );
};

export default Loader;
