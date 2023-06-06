import React from "react";
import AddForm from "./AddForm";
import { createFiles } from "./apiCalls";

import useBackgroundColor from "./useBackgroundColor";

export default function AddPage() {
  useBackgroundColor("lightblue");
  createFiles();

  return <AddForm />;
}
