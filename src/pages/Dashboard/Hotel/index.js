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
      let capacity = 0;
      let acomodationType = [];

      newHotelsWithRooms.map((h) => {
        console.log(h);
        h.Rooms.map((r) => {
          console.log(r);
          if (r.capacity === 3 && !acomodationType.includes('Triple')) {
            acomodationType.push('Triple');
          }
          if (r.capacity === 2 && !acomodationType.includes('Double')) {
            acomodationType.push('Double');
          }
          if (r.capacity === 1 && !acomodationType.includes('Single')) {
            acomodationType.push('Single');
          }
          capacity += r.capacity;
        });

        h['capacity'] = capacity;
        h['acomodationType'] = acomodationType;
      });
      setHotelsWithRooms(newHotelsWithRooms);
    }

    fetchHotels();
  }, [token]);
  console.log(hotelsWithRooms);
  //eslint-disable-next-line
  //eslint-disable-next-line
  return (
    <>
      <Title>Escolha de hotel e quarto</Title>
      <Subtitle show={true}>Primeiro, escolha seu hotel</Subtitle>
      <HotelsContainerStyled>
        {hotelsWithRooms.map((h) => (
          <HotelContainer
            image={h.image}
            name={h.name}
            key={h.id}
            capacity={h.capacity}
            acomodationType={h.acomodationType}
            hotelId={h.id}
            rooms={h.Rooms}
          />
        ))}
      </HotelsContainerStyled>
    </>
  );
}

const HotelsContainerStyled = styled.div`
  display: flex;
  justify-content: start;
  gap: 10px;
`;

//eslint-disable-next-line
