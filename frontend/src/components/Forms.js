import React from "react";
export function Forms({ add, newName, text, newNum, num }) {
  return (
    <form onSubmit={add}>
      <div>
        name: <input value={newName} onChange={text} />
      </div>
      <div>
        number: <input type="phonenumber" value={newNum} onChange={num} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}
