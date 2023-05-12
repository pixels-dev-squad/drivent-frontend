import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import styled from 'styled-components';

export default function CreditCard({ show }) {
  const [card, setCard] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
    issuer: '',
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setCard((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setCard((prev) => ({ ...prev, focus: evt.target.name }));
  };

  return (
    <div>
      <Allcards show={show}>
        <Cards
          number={card.number}
          expiry={card.expiry}
          cvc={card.cvc}
          name={card.name}
          focused={card.focus}
          acceptedCards={['visa', 'mastercard']}
          // callback={(e) => setCard({ ...card, issuer: e.issuer.toUpperCase() })}
        />
        <form>
          <input
            type="credit-card"
            name="number"
            placeholder="Card Number"
            maxLength="16"
            value={card.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            required
          />
          <p>E.g.: 49..., 51..., 36..., 37...</p>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={card.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            required
          />
          <input
            className="ValidThru"
            type="tel"
            name="expiry"
            placeholder="Valid Thru"
            maxLength="4"
            value={card.expiry}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            required
          />
          <input
            className="cvv"
            type="tel"
            name="cvc"
            placeholder="CVC"
            maxLength="4"
            value={card.cvc}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            required
          />
        </form>
      </Allcards>
    </div>
  );
}

const Allcards = styled.div`
  display: ${(props) => (props.show === true ? 'flex' : 'none')};
  form {
    display: flex;
    flex-wrap: wrap;
    padding: 0px 250px 0px 20px;
    width: 70%;
    justify-content: space-between;

    input {
      border-radius: 5px;
      border: 2px solid #8e8e8e;
      height: 40px;
      width: 100%;
      color: #8e8e8e;
      font-size: 15px;
      line-height: 23px;
      :focus {
        outline: 1px solid #8e8e8e;
      }
    }
    p {
      color: #8e8e8e;
      margin-bottom: 5px;
    }
    .ValidThru {
      width: 62%;
    }
    .cvv {
      width: 33%;
    }
  }
`;
