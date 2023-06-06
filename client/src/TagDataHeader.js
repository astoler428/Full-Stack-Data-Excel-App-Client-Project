import React, { useState, useEffect } from "react";
import { fetchRandomData, fetchRecentTag, fetchAllTags } from "./apiCalls";
import { useNavigate } from "react-router-dom";

//Contains the filter by tag selection, button and textArea

export default function TagDataheader({
  randomData,
  setRandomData,
  chosenTagFilter,
  setChosenTagFilter,
  updatedTagCount,
}) {
  const [filterTags, setFilterTags] = useState([]); //list of existing tags
  const navigate = useNavigate();

  async function getRandomData() {
    const res = await fetchRandomData(chosenTagFilter);

    if (res.status === 404) {
      window.alert("No datapoint found with that filter");
      setRandomData(null);
      return;
    }
    const data = await res.json();
    setRandomData(data);
    navigate(`${data.id}`);
  }

  async function setRecentTag() {
    const res = await fetchRecentTag();
    const recentTag = await res.json();
    setChosenTagFilter(recentTag.tag);
  }

  async function setHeader() {
    const res = await fetchAllTags();
    const tags = await res.json();
    tags.unshift(" ", "RANDOM DATA");
    setFilterTags(tags);
    setRecentTag();
    setRandomData(null);
  }

  useEffect(() => {
    setHeader();
  }, [updatedTagCount]);

  const displayFilterTags = filterTags.map((tag) => (
    <option key={Math.random()}>{tag}</option>
  ));

  return (
    <>
      <div className="options-container">
        <label>Filter By Tag:</label>
        <select
          name="existing-tags"
          className="select-tag"
          value={chosenTagFilter}
          onChange={(e) => setChosenTagFilter(e.target.value)}
        >
          {displayFilterTags}
        </select>
        <button onClick={getRandomData}>Get Random Data</button>
      </div>
      <div className="data-container">
        <textarea
          readOnly={true}
          className="data-textarea"
          value={randomData ? randomData.dataPoint : ""}
        ></textarea>
      </div>
    </>
  );
}
