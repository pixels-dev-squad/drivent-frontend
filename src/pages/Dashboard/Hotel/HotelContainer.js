import styled from 'styled-components';

export default function HotelContainer(props) {
  //eslint-disable-next-line
  console.log(props);
  return (
    <HotelContainerStyled>
      <img src={props.image} width={'168px'} height={'109px'}></img>
      <h1>{props.name}</h1>
    </HotelContainerStyled>
  );
}

const HotelContainerStyled = styled.div`
    width: 196px;
    height: 264px;
    background: #ebebeb;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 14px;
`;
