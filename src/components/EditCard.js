import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readCard, updateCard, readDeck } from "../utils/api";
import CardForm from "./CardForm";

function EditCard() {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const linkTo = `/decks/${deckId}`;
  const initialEditCardState = {
    id: "",
    front: "",
    back: "",
    deckId: "",
  };
  const initialDeckState = {
    id: "",
    name: "",
    description: "",
  };
  const [card, setCard] = useState(initialEditCardState);
  //breadcrumb
  const [deck, setDeck] = useState(initialDeckState);
  // loading the specified deck from the API
  // loading the specified card from the API
  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      try {
        const cardResponse = await readCard(cardId, abortController.signal);
        const response = await readDeck(deckId, abortController.signal);
        setDeck(response);
        setCard(cardResponse);
      } catch (error) {
        console.log("Something went wrong", error);
      }
      return () => {
        abortController.abort();
      };
    }
    fetchData();
  }, [cardId, deckId]);
  // Handling changes to the deck name and deck description in the form
  const handleEditChange = (evt) => {
    setCard({ ...card, [evt.target.name]: evt.target.value });
    console.log(card);
  };
  // Updating the pre-existing deck with the changes to the deck name and description
  // Clicking submit will take the user to that deck's screen
  const handleEditCardSubmit = (evt) => {
    evt.preventDefault();
    const abortController = new AbortController();
    const responseToUpdate = updateCard({ ...card }, abortController.signal);
    history.push(`/decks/${deckId}`);
    return responseToUpdate;
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>
              {`${deck.name}`}
              {`${deck.id}`}
            </Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {`Edit Card ${card.id}`}
          </li>
        </ol>
      </nav>
      <h4>Edit Card</h4>
      <CardForm
        onChange={handleEditChange}
        onSubmit={handleEditCardSubmit}
        valueFront={card.front}
        valueBack={card.back}
        linkTo={linkTo}
      />
    </div>
  );
}

export default EditCard;
