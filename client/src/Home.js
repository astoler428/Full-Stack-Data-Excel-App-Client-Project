import { Link } from "react-router-dom";
import useBackgroundColor from "./useBackgroundColor";

export default function Home() {
  useBackgroundColor("gray");

  return (
    <>
      <h1>Home Page</h1>
      <div className="container">
        <div className="add-data">
          <Link to="/data/add">Add Data</Link>
        </div>
        <div className="tag-data">
          <Link to="/data/tag">Tag Data</Link>
        </div>
      </div>
    </>
  );
}
