import styled from 'styled-components';

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

export function ReservedHotelContainer(props) {
  if (!props.name) return;
  let acomodationType;
  if (props.capacity === 1) acomodationType = 'Single';
  if (props.capacity === 2) acomodationType = 'Double';
  if (props.capacity === 3) acomodationType = 'Triple';

  return (
    <HotelContainerStyled selected={props.selected}>
      <ImageContainerStyled>
        <img src={props.image} alt="Imagem do hotel." width={'168px'} height={'109px'}></img>
      </ImageContainerStyled>

      <DescriptionContainerStyled>
        <h1>{props.name}</h1>
        <InformationContainerStyled>
          <h1>Quarto reservado</h1>
          <h2>{`${props.roomName} (${acomodationType})`}</h2>
        </InformationContainerStyled>
        <InformationContainerStyled>
          <h1>Pessoas no seu quarto</h1>
          <h2>{props.ocupation > 1 ? `Você e mais ${props.ocupation} pessoa(s)` : 'Somente você'}</h2>
        </InformationContainerStyled>
      </DescriptionContainerStyled>
    </HotelContainerStyled>
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
  margin-bottom: 25px;
  :hover {
    cursor: pointer;
  }
`;

const DescriptionContainerStyled = styled.div`
  width: 100%;
  height: 117px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  p {
  }
`;

const ImageContainerStyled = styled.div`
  width: 168px;
  height: 109px;
`;

const InformationContainerStyled = styled.div`
  width: 100%;
  font-size: 12px;
  font-weight: 700;
  line-height: 14px;
  h2 {
    font-weight: 400;
  }
`;
