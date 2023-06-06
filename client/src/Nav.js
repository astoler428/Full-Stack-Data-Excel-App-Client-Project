import React from "react";
import MyNavLink from "./MyNavLink";

export default function Nav() {
  const pages = [
    { title: "Homepage", path: "/" },
    { title: "Add Data", path: "/data/add" },
    { title: "Tag Data", path: "/data/tag" },
  ];

  const links = pages.map((page) => (
    <li key={Math.random()}>
      <MyNavLink title={page.title} path={page.path}></MyNavLink>
    </li>
  ));
  return (
    <nav>
      <ul>{links}</ul>
    </nav>
  );
}

// <NavLink
//             className={({ isActive }) =>
//               isActive ? "nav-link-active" : "nav-link"
//             }
//             to="/"
//           >
//             Homepage
//           </NavLink>
