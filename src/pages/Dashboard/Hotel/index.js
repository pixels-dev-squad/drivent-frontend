import Title from '../../../components/TitlePage';
import Subtitle from '../../../components/Subtitle';
import { ReservedHotelContainer, HotelContainer } from './HotelContainer';
import { getHotels, getHotelById, bookRoom, getBooking, changeRoom } from '../../../services/hotelApi';
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
  const reserveButtonRef = useRef(null);
  const [reserved, setReserved] = useState(false);
  const [reservedHotel, setReservedHotel] = useState({});

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
    reserveButtonRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  async function makeReservation() {
    try {
      const booking = await getBooking(token);
      if (booking) await changeRoom({ token, bookingId: booking.id, roomId: selectedRoom.id });
      if (!booking) await bookRoom({ roomId: selectedRoom.id, token });

      setSelectedHotel({});
      setSelectedRoom({});
      toast(`Quarto ${selectedRoom.name} do hotel ${selectedHotel.name} reservado com sucesso!`);
    } catch (err) {
      toast('Não foi possível fazer a reserva do quarto!');
    }
  }

  async function swapRoom() {
    setSelectedHotel(reservedHotel);
    setSelectedRoom(reservedHotel.Room);
    setReserved(false);
    setReservedHotel({});
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
      const booking = await getBooking(token);
      if (booking && !selectedHotel.name) {
        const hotel = newHotelsWithRooms.find((h) => h.id === booking.Room.hotelId);
        hotel.Room = hotel.Rooms.find((r) => r.id === booking.Room.id);
        hotel.bookingId = booking.id;

        setReserved(true);
        setReservedHotel(hotel);
      }

      setHotelsWithRooms(newHotelsWithRooms);
    }

    fetchHotels();
  }, [token, selectedHotel, selectedRoom]);

  return (
    <>
      <Title>Escolha de hotel e quarto</Title>
      <Subtitle show={reserved ? false : true}>Primeiro, escolha seu hotel</Subtitle>
      <HotelsContainerStyled show={reserved ? false : true}>
        {hotelsWithRooms.map((h) => (
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
        ))}
      </HotelsContainerStyled>

      <Subtitle show={!!selectedHotel.name}>Ótima pedida! Agora escolha seu quarto</Subtitle>
      <RoomsContainerStyled>
        {selectedHotel.Rooms?.map((r, i) => (
          <RoomButton active={selectedRoom.id === r.id} onClick={() => handleSelectRoom(r)} key={r.id} room={r} />
        ))}
      </RoomsContainerStyled>
      <Button type="button" onClick={makeReservation} show={!!selectedRoom.name}>
        Reservar Quarto
      </Button>
      <div ref={reserveButtonRef}></div>

      <Subtitle show={reserved ? true : false}>Você já escolheu seu quarto:</Subtitle>
      {!!reservedHotel.name && (
        <ReservedHotelContainer
          image={reservedHotel?.image}
          name={reservedHotel?.name}
          key={reservedHotel?.id}
          capacity={reservedHotel?.Room.capacity}
          ocupation={reservedHotel?.Room.ocupation}
          roomName={reservedHotel?.Room.name}
          selected={true}
          reservedHotel={reservedHotel}
        />
      )}
      <Button type="button" onClick={swapRoom} show={reserved}>
        Trocar de Quarto
      </Button>
    </>
  );
}

const HotelsContainerStyled = styled.div`
  display: flex;
  justify-content: start;
  gap: 10px;
  margin-bottom: 33px;
  display: ${(props) => (props.show === true ? 'flex' : 'none')};
`;

const RoomsContainerStyled = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 33px;
`;
// only commit test 
