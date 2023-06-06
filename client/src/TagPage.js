import React, { useState } from "react";
import useBackgroundColor from "./useBackgroundColor";
import { Outlet } from "react-router-dom";
import TagDataheader from "./TagDataHeader";

export default function TagPage() {
  const [randomData, setRandomData] = useState(null); //will be an object with dataPoint, id and tags[]
  const [chosenTagFilter, setChosenTagFilter] = useState();
  const [updatedTagCount, setUpdatedTagCount] = useState(0); //used to track every time a tag update has been made

  useBackgroundColor("lightgreen");

  return (
    <>
      <TagDataheader
        randomData={randomData}
        setRandomData={setRandomData}
        chosenTagFilter={chosenTagFilter}
        setChosenTagFilter={setChosenTagFilter}
        updatedTagCount={updatedTagCount}
      />
      <Outlet
        context={[
          randomData,
          setRandomData,
          chosenTagFilter,
          setUpdatedTagCount,
        ]}
      />
    </>
  );
}
