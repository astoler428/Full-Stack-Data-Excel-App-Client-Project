import React, { createContext, useState } from "react";

//logic for context sharing the backgroundcolor state with children

export const BackgroundContext = createContext(null);

export default function BackgroundProvider({ children }) {
  const [backgroundColor, setBackgroundColor] = useState("white");

  return (
    <BackgroundContext.Provider value={[backgroundColor, setBackgroundColor]}>
      {children}
    </BackgroundContext.Provider>
  );
}
