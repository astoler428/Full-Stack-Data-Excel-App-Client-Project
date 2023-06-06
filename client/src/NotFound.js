import React from "react";
import useBackgroundColor from "./useBackgroundColor";

export default function NotFound() {
  useBackgroundColor("black");

  return <h1 className="not-found">Page Not Found</h1>;
}
