import Title from '../../../components/TitlePage';
import Subtitle from '../../../components/Subtitle';
import HotelContainer from './HotelContainer';
import { getHotels, getHotelById } from '../../../services/hotelApi';
import useToken from '../../../hooks/useToken';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import RoomButton from '../../../components/Hotel/RoomButton';

export default function Hotel() {
  const token = useToken();
  const [hotelsWithRooms, setHotelsWithRooms] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState({});
  const [selectedRoom, setSelectedRoom] = useState({});

  function handleSelectHotel(hotel) {
    if (selectedHotel.id === hotel.id) return setSelectedHotel({}) && setSelectedRoom({});

    setSelectedHotel(hotel);
    setSelectedRoom({});
  }

  function handleSelectRoom(room) {
    if (selectedRoom === room) return setSelectedRoom({});
    setSelectedRoom(room);
  }

  useEffect(() => {
    async function fetchHotels() {
      const hotel = await getHotels(token);
      const promisses = await hotel.map((h) => getHotelById(token, h.id));
      const newHotelsWithRooms = await Promise.all(promisses);

      newHotelsWithRooms.map((h) => {
        let capacity = 0;
        let acomodationType = [];
        h.Rooms.map((r) => {
          if (r.capacity === 3 && !acomodationType.includes('Triple')) {
            // console.log(`o Hotel ${h.name} tem triple`);
            acomodationType.push('Triple');
          }
          if (r.capacity === 2 && !acomodationType.includes('Double')) {
            // console.log(`o Hotel ${h.name} tem double`);
            acomodationType.push('Double');
          }
          if (r.capacity === 1 && !acomodationType.includes('Single')) {
            // console.log(`o Hotel ${h.name} tem single`);
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
            selected={selectedHotel.name === h.name}
            onClick={() => handleSelectHotel(h)}
          />
        ))}
      </HotelsContainerStyled>

      <Subtitle show={!!selectedHotel.name}>Ótima pedida! Agora escolha seu quarto</Subtitle>
      <RoomsContainerStyled>
        {selectedHotel.Rooms?.map((r, i) => (
          <RoomButton active={selectedRoom.id === r.id} onClick={() => handleSelectRoom(r)} key={r.id} room={r} />
        ))}
      </RoomsContainerStyled>
    </>
  );
}

const HotelsContainerStyled = styled.div`
  display: flex;
  justify-content: start;
  gap: 10px;
`;

const RoomsContainerStyled = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
  flex-wrap: wrap;
`;
