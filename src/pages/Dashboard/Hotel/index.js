import Title from '../../../components/TitlePage';
import Subtitle from '../../../components/Subtitle';
import { HotelContainer, HotelReserved } from './HotelContainer';
import { getHotels, getHotelById, bookRoom, getBooking } from '../../../services/hotelApi';
import useToken from '../../../hooks/useToken';
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import RoomButton from '../../../components/Hotel/RoomButton';
import Button from '../../../components/Form/Button';
import { toast } from 'react-toastify';

export default function Hotel() {
  const token = useToken();
  const [hotelsWithRooms, setHotelsWithRooms] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState({});
  const [selectedRoom, setSelectedRoom] = useState({});
  const [reserved, setReserved] = useState(false);
  const [booking, setBooking] = useState({});
  const reserveButtonRef = useRef(null);
  console.log(booking);

  async function verifyBooking(token) {
    const {Room} = await getBooking(token);

    console.log(Room);
    if (response.Room.id > 0) {
      console.log('teste');
      return setBooking({});
    } else {
      const hotel = await getHotelById(token, Room.hotelId);
      const room = hotel.Rooms.find((room) => room.name === Room.name);
      const ocupation = room.ocupation;
      setBooking({ ...Room, hotelName: hotel.name, roomOcupation: ocupation, image: hotel.image });
    }
  }

  function handleSelectHotel(hotel) {
    if (selectedHotel.id === hotel.id) return setSelectedHotel({}) && setSelectedRoom({});

    setSelectedHotel(hotel);
    setSelectedRoom({});
  }

  function handleSelectRoom(room) {
    if (selectedRoom === room) {
      return setSelectedRoom({});
    }
    setSelectedRoom(room);
    console.log(room);
    reserveButtonRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  async function handleSubmit() {
    try {
      // console.log(selectedHotel);
      await bookRoom({ roomId: selectedRoom.id, token });
      setSelectedHotel({});
      setSelectedRoom({});
      verifyBooking(token);
      toast(`Quarto ${selectedRoom.name} do hotel ${selectedHotel.name} reservado com sucesso!`);
    } catch (err) {
      toast('Não foi possível fazer a reserva do quarto!');
    }
  }

  useEffect(() => {
    async function fetchHotels() {
      verifyBooking(token);
      const hotel = await getHotels(token);
      const promisses = await hotel.map((h) => getHotelById(token, h.id));
      const newHotelsWithRooms = await Promise.all(promisses);

      newHotelsWithRooms.map((h) => {
        let capacity = 0;
        let acomodationType = [];
        h.Rooms.map((r) => {
          let availableVacancies = 0;
          availableVacancies = r.capacity - r.ocupation;
          if (r.capacity === 3 && !acomodationType.includes('Triple')) {
            acomodationType.push('Triple');
          }
          if (r.capacity === 2 && !acomodationType.includes('Double')) {
            acomodationType.push('Double');
          }
          if (r.capacity === 1 && !acomodationType.includes('Single')) {
            acomodationType.push('Single');
          }

          capacity += availableVacancies;
        });

        h['capacity'] = capacity;
        h['acomodationType'] = acomodationType;
      });
      setHotelsWithRooms(newHotelsWithRooms);
    }

    fetchHotels();
  }, [token, selectedRoom]);

  return (
    <>
      <Title>Escolha de hotel e quarto</Title>
      <Subtitle show={true}>
        {Object.keys(booking).length === 0 ? 'Primeiro, escolha seu hotel' : 'Você ja escolheu o seu quarto'}
      </Subtitle>
      <HotelsContainerStyled>
        {Object.keys(booking).length === 0 ? (
          hotelsWithRooms.map((h) => (
            <HotelContainer
              image={h.image}
              name={h.name}
              key={h.id}
              capacity={h.capacity}
              acomodationType={h.acomodationType}
              hotelId={h.id}
              rooms={h.Rooms}
              //aqui ele verificando se o hotel que eu to clicando é o hotel que ja foi clicado
              selected={selectedHotel.name === h.name}
              onClick={() => handleSelectHotel(h)}
            />
          ))
        ) : (
          <HotelReserved booking={booking}></HotelReserved>
        )}
      </HotelsContainerStyled>
      {Object.keys(booking).length !== 0 ? <Button type="button">TROCAR DE QUARTO</Button> : ''}

      <Subtitle show={!!selectedHotel.name}>Ótima pedida! Agora escolha seu quarto</Subtitle>
      <RoomsContainerStyled>
        {selectedHotel.Rooms?.map((r, i) => (
          <RoomButton active={selectedRoom.id === r.id} onClick={() => handleSelectRoom(r)} key={r.id} room={r} />
        ))}
      </RoomsContainerStyled>
      <Button type="button" onClick={handleSubmit} show={!!selectedRoom.name}>
        Reservar Quarto
      </Button>
      <div ref={reserveButtonRef}></div>
    </>
  );
}

const HotelsContainerStyled = styled.div`
  display: flex;
  justify-content: start;
  gap: 10px;
  margin-bottom: 33px;
`;

const RoomsContainerStyled = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 33px;
`;
