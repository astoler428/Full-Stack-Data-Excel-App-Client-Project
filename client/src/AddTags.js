import React, { useState, useEffect, useRef } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { putTags, putRecentTag } from "./apiCalls";

//Component that displays when a randomdatapoint is being displayed

export default function AddTags() {
  //state for the tags that will be added to the datapoint
  //these get mapped into input components
  const [tags, setTags] = useState([{ tag: "", focus: true }]);

  //could get randomData from params id, but since I already have it, may as well pass it down and have only one copy of the state
  const [
    randomData,
    setRandomData,
    chosenTagFilter,
    setUpdatedTagCount,
    filterTags,
  ] = useOutletContext();
  const navigate = useNavigate();

  //in case the user manually goes to a url of an id that doesn't exist
  if (!randomData) navigate("..");

  //formats all existing tags on the datapoint to display
  //if no datapoint, then no tags
  //each tag has a comma after except the last one

  //sort existing tags on randomData
  const existingTags = randomData ? randomData.tags.toSorted() : null;

  const displayExistingTagsOnData = randomData
    ? existingTags.map((tag, index) => (
        <label key={index} className="existing-tag">
          {index === randomData.tags.length - 1 ? `${tag} ` : `${tag}, `}
        </label>
      ))
    : "";

  const inputTags = tags.map((tagObj, index) => {
    return (
      <div className="input-tag-container" key={index}>
        <input
          className="input-tag"
          name={index}
          value={tagObj.tag}
          onChange={(e) => handleInputChange(e, index)}
          onFocus={(e) => handleFocus(e, index)}
          onBlur={(e) => handleBlur(e, index)}
          autoFocus={tagObj.focus}
          autoComplete="off"
        />
        <input
          className="suggest"
          placeholder={tagObj.focus ? getFilteredSuggestions(tagObj.tag) : ""}
          readOnly
        />
      </div>
    );
  });

  //event listener for input fields to add tags to make them controlled components
  function handleInputChange(e, index) {
    setTags((prevTags) =>
      prevTags.map((tagObj, idx) =>
        idx === index
          ? { tag: e.target.value, focus: true }
          : { tag: tagObj.tag, focus: false }
      )
    );
  }

  //handles focus
  function handleFocus(e, index) {
    setTags((prevTags) =>
      prevTags.map((tagObj, idx) =>
        idx === index
          ? { tag: tagObj.tag, focus: true }
          : { tag: tagObj.tag, focus: false }
      )
    );
  }

  //handles blur
  function handleBlur(e, index) {
    //if another input got focus, don't do anything
    if (document.activeElement.nodeName === "INPUT") return;
    setTags((prevTags) =>
      prevTags.map((tagObj) => {
        return { tag: tagObj.tag, focus: false };
      })
    );
  }

  //event listener for button to add a tag
  function createNewTag() {
    setTags((prevTags) => [...prevTags, { tag: "", focus: true }]);
  }

  //event handler for submitting tags - sends tags to backend and resets
  async function updateTags(tags) {
    //filter out any blank inputs
    let tagData = tags.filter((tagObj) => tagObj.tag !== "");
    tagData = tagData.map((tagObj) => tagObj.tag.toLowerCase());
    await putTags(randomData, tagData);
    await putRecentTag(chosenTagFilter);
    setRandomData(null);
    setUpdatedTagCount((prevUpdatedTagCount) => prevUpdatedTagCount + 1);
    navigate("..");
  }

  //gets a list of suggestions from tag options that match what is typed in so far
  function getFilteredSuggestions(prefix) {
    prefix = prefix.toLowerCase();
    const filteredFilterTags = filterTags.filter((tag) => {
      return tag.startsWith(prefix) && tag !== " " && tag !== "RANDOM DATA";
    });
    return filteredFilterTags || "";
  }

  return (
    <>
      <div className="existing-tags-container">
        <label>Existing Tags:</label>
        <ul>{displayExistingTagsOnData}</ul>
      </div>
      <div className="new-tags-container">
        <button onClick={createNewTag}>Add tag</button>
        {inputTags}
      </div>
      <button className="update-tags-btn" onClick={() => updateTags(tags)}>
        Update Tags
      </button>
    </>
  );
}
