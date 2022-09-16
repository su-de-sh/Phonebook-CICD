import React from "react";
export function Persons({ person, deleteNumber }) {
  return (
    <div>
      {person.map((person) => {
        return (
          <div key={person.name}>
            <span>
              {person.name} {person.number} {"     "}
            </span>
            <button onClick={() => deleteNumber(person.id)}>delete</button>
          </div>
        );
      })}
    </div>
  );
}
