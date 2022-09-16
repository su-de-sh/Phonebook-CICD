import React from "react";
export function Filter({ searchValue, search }) {
  return (
    <>
      <span>filter shown with</span>
      <input type="text" value={searchValue} onChange={search} />
    </>
  );
}
