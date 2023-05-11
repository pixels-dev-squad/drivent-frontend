import Title from '../../../components/TitlePage';
import Subtitle from '../../../components/Subtitle';
import HotelContainer from './HotelContainer';
import { getHotels, getHotelById } from '../../../services/hotelApi';
import useToken from '../../../hooks/useToken';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function Hotel() {
  const token = useToken();
  const [hotelsWithRooms, setHotelsWithRooms] = useState([]);

  useEffect(() => {
    async function fetchHotels() {
      const hotel = await getHotels(token);
      const promisses = hotel.map((h) => getHotelById(token, h.id));
      const newHotelsWithRooms = await Promise.all(promisses);
      setHotelsWithRooms(newHotelsWithRooms);
    }

    fetchHotels();
  }, [token]);

  //eslint-disable-next-line
  hotelsWithRooms.map((h) =>
    //eslint-disable-next-line
    console.log(h.image)
  );
  return (
    <>
      <Title>Escolha de hotel e quarto</Title>
      <Subtitle show={true}>Primeiro, escolha seu hotel</Subtitle>
      <HotelsContainerStyled>
        {hotelsWithRooms.map((h) => (
          <HotelContainer image={h.image} name={h.name} key={h.id} />
        ))}
      </HotelsContainerStyled>
    </>
  );
}

const HotelsContainerStyled = styled.div`
  display: flex;
  justify-content: start;
`;

//eslint-disable-next-line
