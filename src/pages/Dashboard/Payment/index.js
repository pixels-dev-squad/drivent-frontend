import styled from 'styled-components';
import Subtitle from '../../../components/Subtitle';
import Title from '../../../components/TitlePage';
import ModalityButton from '../../../components/Payment/ModalityButton';
import { useState } from 'react';
import Button from '../../../components/Form/Button';

export default function Payment() {
  const [modality, setModality] = useState(null);
  const [hotelity, setHotelity] = useState(null);

  return (
    <>
      <Title>Ingresso e Pagamento</Title>
      <Subtitle show={true}>Primeiro, escolha sua modalidade de ingresso</Subtitle>
      <ModalityBox show={true}>
        <ModalityButton
          onClick={() =>
            modality === 'presential' ? (setModality(null), setHotelity(null)) : setModality('presential')
          }
          active={modality === 'presential'}
        >
          <span>Presencial</span>
          <span>R$ 250</span>
        </ModalityButton>
        <ModalityButton
          onClick={() => (modality === 'online' ? setModality(null) : (setModality('online'), setHotelity(null)))}
          active={modality === 'online'}
        >
          <span>Online</span>
          <span>R$ 100</span>
        </ModalityButton>
      </ModalityBox>
      <Subtitle show={modality === 'presential'}>Ótimo! Agora escolha sua modalidade de hospedagem</Subtitle>
      <ModalityBox show={modality === 'presential'}>
        <ModalityButton
          onClick={() => (hotelity === 'without' ? setHotelity(null) : setHotelity('without'))}
          active={hotelity === 'without'}
        >
          <span>Sem Hotel</span>
          <span>+ R$ 0</span>
        </ModalityButton>
        <ModalityButton
          onClick={() => (hotelity === 'with' ? setHotelity(null) : setHotelity('with'))}
          active={hotelity === 'with'}
        >
          <span>Com Hotel</span>
          <span>+ R$ 350</span>
        </ModalityButton>
      </ModalityBox>
      <Subtitle show={modality === 'online' || hotelity !== null}>
        Fechado! O total ficou em <strong>R$ {calculateTicketPrice(modality, hotelity)}</strong>. Agora é só confirmar:
      </Subtitle>
      <Button
        type="button"
        onClick={() => alert('Ingresso reservado com sucesso!')}
        show={modality === 'online' || hotelity !== null}
      >
        Reservar Ingresso
      </Button>
    </>
  );
}

function calculateTicketPrice(modality, hotelity) {
  let result = 0;

  if (modality === 'presential') result += 250;
  if (modality === 'online') result += 100;
  if (hotelity === 'with') result += 350;
  if (hotelity === 'without') result += 0;

  return result;
}

const ModalityBox = styled.div`
  justify-content: space-between;
  align-items: center;
  max-width: 314px;
  margin-bottom: 44px;
  display: ${(props) => (props.show === true ? 'flex' : 'none')};
`;
