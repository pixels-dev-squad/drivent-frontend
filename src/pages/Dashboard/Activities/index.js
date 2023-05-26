import styled from 'styled-components';
import Subtitle from '../../../components/Subtitle';
import Title from '../../../components/TitlePage';
import { useEffect, useState } from 'react';
import useToken from '../../../hooks/useToken';
import { getDates } from '../../../services/activityApi';
import DayButton from '../../../components/Activity/DayButton';
import { getTicket } from '../../../services/ticketApi';
import { toast } from 'react-toastify';

export default function Activities() {
  const token = useToken();
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    async function fetchDays() {
      try {
        const dates = await getDates(token);
        setDays(dates);
      } catch (err) {
        console.error('Failed to fetch activity dates:', err);
      }
    }
    fetchDays();
  }, [selectedDay]);

  function handleSelectDay(day) {
    if (selectedDay === day) setSelectedDay({});
    else setSelectedDay(day);
  }

  useEffect(() => {
    async function fetchTicket() {
      try {
        const ticket = await getTicket(token);
        setTicket(ticket);

        if (ticket.TicketType.isRemote) {
          toast('Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.');
        }

        const paymentStatus = ticket?.status;
        if (paymentStatus !== 'PAID') {
          toast('Você precisa ter confirmado pagamento antes de fazer a escolha de atividades');
        }
      } catch (err) {
        console.error('Failed to fetch ticket:', err);
      }
    }

    fetchTicket();
  }, [token]);

  return (
    <>
      <Title>Escolha de atividades</Title>
      {ticket && ticket.TicketType.isRemote ? (
        <>
          <CenterText>Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.</CenterText>
        </>
      ) : ticket?.status !== 'PAID' ? (
        <>
          <CenterText>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades</CenterText>
        </>
      ) : (
        <>
          <Subtitle>Primeiro, filtre pelo dia do evento:</Subtitle>
          <DaysContainerStyled>
            {days.map((day) => (
              <DayButton key={day} day={day} selected={selectedDay === day} onClick={() => handleSelectDay(day)} />
            ))}
          </DaysContainerStyled>
        </>
      )}
    </>
  );
}

const DaysContainerStyled = styled.div`
  display: flex;
  justify-content: start;
  gap: 10px;
  margin-bottom: 33px;
  display: flex;
`;

const CenterText = styled.div`
  display: flex;
  width: 440px;
  height: 80%;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  text-align: center;
  margin-left: 200px;
  color: #8e8e8e;
`;
