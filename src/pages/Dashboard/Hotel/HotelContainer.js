import styled from 'styled-components';
import Button from '../../../components/Form/Button';

export function HotelContainer(props) {
  return (
    <HotelContainerStyled onClick={() => props.onClick()} selected={props.selected}>
      <ImageContainerStyled>
        <img src={props.image} alt="Imagem do hotel." width={'168px'} height={'109px'}></img>
      </ImageContainerStyled>

      <DescriptionContainerStyled>
        <h1>{props.name}</h1>
        <InformationContainerStyled>
          <h1>Tipos de acomodação</h1>
          <h2>
            {props.acomodationType.slice(0, -1).join(', ')} e {props.acomodationType.slice(-1)}
          </h2>
        </InformationContainerStyled>
        <InformationContainerStyled>
          <h1>Vagas disponíveis</h1>
          <h2>{props.capacity}</h2>
        </InformationContainerStyled>
      </DescriptionContainerStyled>
    </HotelContainerStyled>
  );
}

export function HotelReserved(props) {
  console.log(props.booking);
  return (
    <>
      <HotelContainerStyled onClick={() => props.onClick()} selected={true}>
        <ImageContainerStyled>
          <img src={props.booking.image} alt="Imagem do hotel." width={'168px'} height={'109px'}></img>
        </ImageContainerStyled>

        <DescriptionContainerStyled>
          <h1>{props.booking.hotelName}</h1>
          <InformationContainerStyled>
            <h1>Quarto Reservado</h1>
            <h2>
              {`${props.booking.name} (${
                props.booking.capacity === 3 ? 'Triple' : props.booking.capacity === 2 ? 'Double' : 'Single'
              })`}
            </h2>
          </InformationContainerStyled>
          <InformationContainerStyled>
            <h1>Pessoas no Seu quarto</h1>
            <h2>
              {props.booking.ocupation === 1
                ? 'Apenas você'
                : props.booking.ocupation === 2
                  ? 'Você e mais um'
                  : 'Você e mais dois'}
            </h2>
          </InformationContainerStyled>
        </DescriptionContainerStyled>
      </HotelContainerStyled>
    </>
  );
}

const HotelContainerStyled = styled.div`
  width: 196px;
  height: 264px;
  background-color: ${(props) => (props.selected ? '#FFEED2' : '#ebebeb')};
  border-radius: 10px;
  box-sizing: border-box;
  padding: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  :hover {
    cursor: pointer;
  }
`;

export const DescriptionContainerStyled = styled.div`
  width: 100%;
  height: 117px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  p {
  }
`;

export const ImageContainerStyled = styled.div`
  width: 168px;
  height: 109px;
`;

export const InformationContainerStyled = styled.div`
  width: 100%;
  font-size: 12px;
  font-weight: 700;
  line-height: 14px;
  h2 {
    font-weight: 400;
  }
`;
