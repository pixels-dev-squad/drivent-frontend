import styled from 'styled-components';
import Subtitle from '../../../components/Subtitle';
import Title from '../../../components/TitlePage';
import ModalityButton from '../../../components/Payment/ModalityButton';
import { useEffect, useState } from 'react';
import Button from '../../../components/Form/Button';
import useToken from '../../../hooks/useToken';
import { creteTicket, getTicket, getTypes } from '../../../services/ticketApi';
import { toast } from 'react-toastify';
import useEnrollment from '../../../hooks/api/useEnrollment';
import CreditCard from '../../../components/Payment/CreditCard';
import SummaryCard from '../../../components/Payment/SummaryCard';
import { paymentProcess } from '../../../services/paymentApi';
import { BsCheckCircleFill } from 'react-icons/bs';

export default function Payment() {
  const [modality, setModality] = useState(null);
  const [hotelity, setHotelity] = useState(null);
  const [ticket, setTicket] = useState([]);
  const [ticketType, setTicketType] = useState([]);
  const [reserved, setReserved] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const token = useToken();

  const presential = { name: 'Presencial', price: 250 };
  const online = { name: 'Online', price: 100 };
  const withHotel = { name: 'Com Hotel', price: 350 };
  const withoutHotel = { name: 'Sem Hotel', price: 0 };
  const { enrollment } = useEnrollment();

  const sum = (modality?.price ?? 0) + (hotelity?.price ?? 0);

  useEffect(async() => {
    const userTicket = await getTicket(token);

    if (userTicket.status === 'PAID') {
      setTicket(userTicket);
      setTicketType(userTicket.TicketType);
      setIsPaid(true);
    }

    if (userTicket) {
      setTicket(userTicket);
      setTicketType(userTicket.TicketType);
      setReserved(true);
    }
  }, []);

  async function handleSubmit() {
    try {
      const types = await getTypes(token);
      const { id: ticketTypeId } = types.find((type) => type.price === sum);

      await creteTicket({ ticketTypeId, token });

      setModality(null);
      setHotelity(null);
      toast('Ingresso reservado com sucesso!');
      const userTicket = await getTicket(token);

      if (userTicket) {
        setTicket(userTicket);
        setTicketType(userTicket.TicketType);
        setReserved(true);
      }
    } catch (err) {
      toast('Não foi possível reservar o ingresso!');
    }
  }

  function compare(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  if (!enrollment) {
    return (
      <>
        <Title>Ingresso e Pagamento</Title>
        <CenterText>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</CenterText>
      </>
    );
  }

  async function finalizePayment({ card, setCard }) {
    const body = {
      ticketId: ticket.id,
      cardData: {
        issuer: card.issuer,
        number: Number(card.number),
        name: card.name,
        expirationDate: card.expiry,
        cvv: Number(card.cvc)
      }
    };

    try {
      await paymentProcess({ body, token });

      toast('Seu ticket foi pago');
      setIsPaid(true);
    } catch (err) {
      setCard({ ...card });
      toast('Ocorreu um erro com o seu pagamento');
    }
  }

  return (
    <>
      <Title>Ingresso e Pagamento</Title>
      <Subtitle show={reserved ? false : true}>Primeiro, escolha sua modalidade de ingresso</Subtitle>
      <ModalityBox show={reserved ? false : true}>
        <ModalityButton
          onClick={() =>
            compare(modality, presential) ? (setModality(null), setHotelity(null)) : setModality(presential)
          }
          active={compare(modality, presential)}
        >
          <span>{presential.name}</span>
          <span>R$ {presential.price}</span>
        </ModalityButton>
        <ModalityButton
          onClick={() => (compare(modality, online) ? setModality(null) : (setModality(online), setHotelity(null)))}
          active={compare(modality, online)}
        >
          <span>{online.name}</span>
          <span>R$ {online.price}</span>
        </ModalityButton>
      </ModalityBox>
      <Subtitle show={compare(modality, presential)}>Ótimo! Agora escolha sua modalidade de hospedagem</Subtitle>
      <ModalityBox show={compare(modality, presential)}>
        <ModalityButton
          onClick={() => (compare(hotelity, withoutHotel) ? setHotelity(null) : setHotelity(withoutHotel))}
          active={compare(hotelity, withoutHotel)}
        >
          <span>{withoutHotel.name}</span>
          <span>+ R$ {withoutHotel.price}</span>
        </ModalityButton>
        <ModalityButton
          onClick={() => (compare(hotelity, withHotel) ? setHotelity(null) : setHotelity(withHotel))}
          active={compare(hotelity, withHotel)}
        >
          <span>{withHotel.name}</span>
          <span>+ R$ {withHotel.price}</span>
        </ModalityButton>
      </ModalityBox>
      <Subtitle show={compare(modality, online) || hotelity !== null}>
        Fechado! O total ficou em <strong>R$ {sum}</strong>. Agora é só confirmar:
      </Subtitle>
      <Button type="button" onClick={handleSubmit} show={compare(modality, online) || hotelity !== null}>
        Reservar Ingresso
      </Button>
      <Subtitle show={reserved ? true : false}>Ingresso escolhido</Subtitle>
      <SummaryCard ticketType={ticketType.name} price={ticketType.price} show={reserved ? true : false}/>
      <Subtitle show={reserved ? true : false}>Pagamento</Subtitle>
      <CreditCard show={reserved && !isPaid ? true : false} finalizePayment={finalizePayment}/>
      <PaymentDone show={isPaid ? true : false}>
        <div>
          <BsCheckCircleFill />
        </div>

        <div>
          <strong>Pagamento confirmado!</strong>
          <p>Prossiga para escolha de hospedagem e atividades</p>
        </div>
      </PaymentDone>
    </>
  );
}

const ModalityBox = styled.div`
  justify-content: space-between;
  align-items: center;
  max-width: 314px;
  margin-bottom: 44px;
  display: ${(props) => (props.show === true ? 'flex' : 'none')};
`;

const CenterText = styled.div`
  display: flex;
  width: 440px;
  height: 80%;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  text-align: center;
  margin-left: 200px;
  color: #8e8e8e;
`;

const PaymentDone = styled.div`
  display: ${(props) => (props.show === true ? 'flex' : 'none')};
  align-items: center;
  margin-top: 8px;
  svg {
    font-size: 37px;
    margin-right: 13px;
    color: #36B853;
  }
`;
