import { createContext } from "react";
import { useState } from "react";

const SrcContext = createContext();

export function SrcProvider({ children }) {
  let initialSrcArr = [];
  const srcInfosString = localStorage.getItem("srcInfosArr");
  const srcInfos = JSON.parse(srcInfosString);
  if (srcInfos) {
    initialSrcArr = srcInfos;
  }
  const [srcInfosArr, setSrcInfosArr] = useState(initialSrcArr);
  return (
    <SrcContext.Provider value={{ srcInfosArr, setSrcInfosArr }}>
      {children}
    </SrcContext.Provider>
  );
}

export default SrcContext;
