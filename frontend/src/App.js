import { Persons } from "./components/Persons";
import { Forms } from "./components/Forms";
import { Filter } from "./components/Filter";
import { useState, useEffect } from "react";
import apiCall from "./services/apicall";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [message, setMessage] = useState({ msg: null, type: null });
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    apiCall.get().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const text = (event) => {
    setNewName(event.target.value);
  };
  const num = (event) => {
    setNewNum(event.target.value);
  };

  const add = (event) => {
    event.preventDefault();
    // let alreadyInPhoneBook = persons.some((person) => {
    //   return person.name === newName;
    // });
    // if (alreadyInPhoneBook) {
    //   let updateNum = window.confirm(
    //     `${newName} is already added to phonebook, replace old number with new one?`
    //   );

    //   let person = persons.find((person) => person.name === newName);

    //   if (updateNum) {
    //     apiCall
    //       .update(person.id, { ...person, number: newNum })
    //       .then((response) => {
    //         setPersons(
    //           persons.map((x) => (x.id !== person.id ? x : response.data))
    //         );
    //         setNewName("");
    //         setNewNum("");
    //         setMessage({ msg: `Updated ${response.data.name}`, type: "info" });
    //         setTimeout(() => {
    //           setMessage({ msg: null, type: null });
    //         }, 2000);
    //       })
    //       .catch((error) => {
    //         setMessage({
    //           msg: `Information of ${newName} has already been removed from server`,
    //           type: "alert",
    //         });

    //         setTimeout(() => {
    //           setMessage({ msg: null, type: null });
    //         }, 2000);
    //       });
    //   }
    // } else {

    apiCall
      .post(newName, newNum)
      .then((response) => {
        setPersons([...persons, response.data]);
        setNewName("");
        setNewNum("");
        setMessage({ msg: `Added ${response.data.name}`, type: "info" });
        setTimeout(() => {
          setMessage({ msg: null, type: null });
        }, 2000);
      })
      .catch((error) => {
        setMessage({ msg: error.response.data.error, type: "alert" });
        setTimeout(() => {
          setMessage({ msg: null, type: null });
        }, 2000);
      });
  };
  // };

  const search = (event) => {
    setSearchValue(event.target.value);
  };
  let personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(searchValue)
  );

  const deleteNumber = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      apiCall
        .remove(id)
        .then((response) => {
          setPersons(persons.filter((person) => person.id !== id));
          setMessage({ msg: `Delete successfull!!!`, type: "alert" });
          setTimeout(() => {
            setMessage({ msg: null, type: null });
          }, 2000);
        })
        .catch((error) => {
          setMessage({
            msg: `Information of the user has already been removed from server`,
            type: "info",
          });
          setTimeout(() => {
            setMessage({ msg: null, type: null });
          }, 2000);

          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message.msg} type={message.type} />
      <Filter searchValue={searchValue} search={search} />
      <h2>Add a new</h2>
      <Forms
        add={add}
        newName={newName}
        text={text}
        newNum={newNum}
        num={num}
      />
      <h2>Numbers</h2>
      <Persons person={personsToShow} deleteNumber={deleteNumber} />
    </div>
  );
};

export default App;
