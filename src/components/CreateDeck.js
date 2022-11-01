import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";
import Form from "./Form";

function CreateDeck() {
  const history = useHistory();
  const linkTo = "/";
  const initialState = {
    name: "",
    description: "",
  };

  const [newDeck, setNewDeck] = useState(initialState);
  // Handling changes to the deck's name and description in the form
  const handleChange = (evt) => {
    setNewDeck({ ...newDeck, [evt.target.name]: evt.target.value });
    console.log(evt.target.name);
  };

  ////////////////////////////////////////////////////
  // Clicking submit will then take the user to that deck's screen
  //If the user clicks Submit, the user is taken to the Deck screen.
  // Adding new deck to the database. Saved deck will have an "id" property

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const abortController = new AbortController();
    createDeck({ ...newDeck }).then((newDeck) =>
      history.push(`/decks/${newDeck.id}`)
    );
    // a promise that resolves the saved deck, which will now have an 'id'property
  };

  // const handleSubmit = (evt) => {
  //   evt.preventDefault();
  //   const abortController = new AbortController();
  //   const response = createDeck({ ...newDeck }, abortController.signal);
  //   history.push("/");
  //   console.log("newdeck", newDeck);
  //   return response;
  // };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h2>Create Deck</h2>
      <Form
        onSubmit={handleSubmit}
        valueName={newDeck.name}
        valueDescription={newDeck.description}
        onChange={handleChange}
        linkTo={linkTo}
      />
    </div>
  );
}

export default CreateDeck;
