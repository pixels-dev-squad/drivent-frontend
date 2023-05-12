import styled from 'styled-components';
import { useState } from 'react';
export default function HotelContainer(props) {
  const [clicked, setClicked] = useState(false);
  return (
    <HotelContainerStyled
      onClick={() => {
        setClicked(!clicked);
        props.setInfosHotelSelected(props);
      }}
      clicked={clicked}
    >
      <ImageContainerStyled>
        <img src={props.image} width={'168px'} height={'109px'}></img>
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

const HotelContainerStyled = styled.div`
  width: 196px;
  height: 264px;
  background: ${(props) => (!props.clicked ? '#ebebeb' : '#FFEED2')};
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
