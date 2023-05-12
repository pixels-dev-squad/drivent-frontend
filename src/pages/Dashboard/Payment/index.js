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

export default function Payment() {
  const [modality, setModality] = useState(null);
  const [hotelity, setHotelity] = useState(null);
  const [ticket, setTicket] = useState([]);
  const [reserved, setReserved] = useState(false);
  const token = useToken();

  const presential = { name: 'Presencial', price: 250 };
  const online = { name: 'Online', price: 100 };
  const withHotel = { name: 'Com Hotel', price: 350 };
  const withoutHotel = { name: 'Sem Hotel', price: 0 };
  const { enrollment } = useEnrollment();

  const sum = (modality?.price ?? 0) + (hotelity?.price ?? 0);

  useEffect(async() => {
    const userTicket = await getTicket(token);

    if (userTicket) {
      setTicket(userTicket.TicketType);
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
        setTicket(userTicket.TicketType);
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
      <SummaryCard ticketType={ticket.name} price={ticket.price} show={reserved ? true : false}/>
      <Subtitle show={reserved ? true : false}>Pagamento</Subtitle>
      <CreditCard show={reserved ? true : false} />
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
