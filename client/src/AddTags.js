import React, { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { putTags, putRecentTag } from "./apiCalls";

export default function AddTags() {
  const [tags, setTags] = useState([""]);
  //could get randomData from params id, but since I already have it, may as well pass it down and have only one copy of the state
  const [randomData, setRandomData, chosenTagFilter, setUpdatedTagCount] =
    useOutletContext();
  const navigate = useNavigate();

  //in case manually go to a id that doesn't exist, check params? or just check that random data is not null
  if (!randomData) navigate("..");

  async function updateTags(tags) {
    const tagData = tags.filter((tag) => tag !== "");

    await putTags(randomData, tagData);
    await putRecentTag(chosenTagFilter);

    setRandomData(null);
    setUpdatedTagCount((prevUpdatedTagCount) => prevUpdatedTagCount + 1);
    navigate("..");
  }

  function handleInputChange(e, index) {
    setTags((prevTags) =>
      prevTags.map((tag, idx) => (idx === index ? e.target.value : tag))
    );
  }

  function createNewTag() {
    setTags((prevTags) => [...prevTags, ""]);
  }

  const displayExistingTagsOnData = randomData
    ? randomData.tags.map((tag, index) => (
        <label key={index} className="existing-tag">
          {index === randomData.tags.length - 1 ? `${tag} ` : `${tag}, `}
        </label>
      ))
    : "";

  const inputTags = tags.map((tag, index) => (
    <input
      key={index}
      value={tag}
      onChange={(e) => handleInputChange(e, index)}
    />
  ));

  return (
    <>
      <div className="existing-tags-container">
        <label>Existing Tags:</label>
        <ul>{displayExistingTagsOnData}</ul>
      </div>
      <div className="new-tags-container">
        <button onClick={createNewTag}>Add tag</button>
        {inputTags}
        <div className="add-tags-container"></div>
      </div>
      <button className="update-tags-btn" onClick={() => updateTags(tags)}>
        Update Tags
      </button>
    </>
  );
}

//lift random data state up as well as handle submit
