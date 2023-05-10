import styled from 'styled-components';
import Subtitle from '../../../components/Subtitle';
import Title from '../../../components/TitlePage';
import ModalityButton from '../../../components/Payment/ModalityButton';
import { useState } from 'react';
import Button from '../../../components/Form/Button';

function compare(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export default function Payment() {
  const [modality, setModality] = useState(null);
  const [hotelity, setHotelity] = useState(null);

  const presential = { name: 'Presencial', price: 250 };
  const online = { name: 'Online', price: 100 };
  const withHotel = { name: 'Com Hotel', price: 350 };
  const withoutHotel = { name: 'Sem Hotel', price: 0 };

  const sum = (modality?.price ?? 0) + (hotelity?.price ?? 0);

  return (
    <>
      <Title>Ingresso e Pagamento</Title>
      <Subtitle show={true}>Primeiro, escolha sua modalidade de ingresso</Subtitle>
      <ModalityBox show={true}>
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
      <Button
        type="button"
        onClick={() => alert('Click do botão com sucesso, falta a requisição!')}
        show={compare(modality, online) || hotelity !== null}
      >
        Reservar Ingresso
      </Button>
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
