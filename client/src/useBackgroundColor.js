import { useEffect, useContext } from "react";
import { BackgroundContext } from "./BackgroundProvider";

export default function useBackgroundColor(color) {
  //get these from the context
  const [backgroundColor, setBackgroundColor] = useContext(BackgroundContext);

  document.body.style.backgroundColor = color;

  useEffect(() => {
    setBackgroundColor(color);
  }, [backgroundColor, setBackgroundColor, color]);
}
