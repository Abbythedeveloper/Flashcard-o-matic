import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import CardForm from "./CardForm";

function AddCard() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const initialCardState = {
    front: "",
    back: "",
  };

  const [newCard, setNewCard] = useState(initialCardState);
  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      try {
        const response = await readDeck(deckId, abortController.signal);
        setDeck(response);
      } catch (error) {
        console.log("Something went wrong", error);
      }
      return () => {
        abortController.abort();
      };
    }
    fetchData();
  }, [deckId]);
  // Handling changes to the card front and card back from the form

  const handleCardChange = (evt) => {
    setNewCard({ ...newCard, [evt.target.name]: evt.target.value });
  };

  const handleSubmitCard = (evt) => {
    evt.preventDefault();
    const abortController = new AbortController();
    const cardResponse = createCard(
      deckId,
      { ...newCard },
      abortController.signal
    );
    //To check if new cards were created.
    console.log("deck", deck);
    console.log("card", deck.cards);
    //Clear the form after submit
    setNewCard(initialCardState);
    //a promise that resolves the the new cards, which will have an id property.
    return cardResponse;
  };

  const linkTo = `/decks/${deckId}`;
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">{`${deck.name}`}</li>
          <li class="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h4>{`${deck.name}: Add Card`}</h4>

      <CardForm
        onChange={handleCardChange}
        onSubmit={handleSubmitCard}
        valueFront={newCard.front}
        valueBack={newCard.back}
        linkTo={linkTo}
      />
    </div>
  );
}
export default AddCard;
