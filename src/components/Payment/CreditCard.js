import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import styled from 'styled-components';
import Button from '../Form/Button';
import { toast } from 'react-toastify';

export default function CreditCard({ show, finalizePayment }) {
  const [card, setCard] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
    issuer: '',
  });
  const visaRegex = /^4/;
  const mastercardRegex = /^5[1-5]/;
  const amexRegex = /^3[47]/;

  if (visaRegex.test(card.number)) card.issuer = 'VISA';
  if (mastercardRegex.test(card.number)) card.issuer = 'MASTERCARD';
  if (amexRegex.test(card.number)) card.issuer = 'AMEX';
  if (!visaRegex.test(card.number) && !mastercardRegex.test(card.number) && !amexRegex.test(card.number)) card.issuer = 'UNKNOWN';

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setCard((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setCard((prev) => ({ ...prev, focus: evt.target.name }));
  };

  function checkPaymentInformations() {
    if (card.cvc === '' || card.expiry === '' || card.focus === '' || card.number === '' || card.name === '')
      return toast('Preencha corretamente os dados do cartão');
    if (isNaN(Number(card.number) && Number(card.cvc) && Number(card.expiry)) || card.issuer === 'UNKNOWN')
      return toast('Preencha corretamente os dados do cartão');

    finalizePayment({ card, setCard });
  }

  return (
    <div>
      <Allcards show={show}>
        <Cards
          number={card.number}
          expiry={card.expiry}
          cvc={card.cvc}
          name={card.name}
          focused={card.focus}
          acceptedCards={['visa', 'mastercard', 'american-express']}
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
      <Button onClick={checkPaymentInformations} show={show}>FINALIZAR PAGAMENTO</Button>
    </div>
  );
}

const Allcards = styled.div`
  display: ${(props) => (props.show === true ? 'flex' : 'none')};
  margin-bottom: 37px;
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
