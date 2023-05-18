import styled from 'styled-components';
import Subtitle from '../../../components/Subtitle';
import Title from '../../../components/TitlePage';
import { useEffect, useState } from 'react';
import useToken from '../../../hooks/useToken';
import { getDates } from '../../../services/activityApi';
import DayButton from '../../../components/Activity/DayButton';

export default function Activities() {
  const token = useToken();
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState();

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

  return (
    <>
      <Title>Escolha de atividades</Title>
      <Subtitle>Primeiro, filtre pelo dia do evento:</Subtitle>
      <DaysContainerStyled>
        {days.map((day) => (
          <DayButton key={day} day={day} selected={selectedDay === day} onClick={() => handleSelectDay(day)} />
        ))}
      </DaysContainerStyled>
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
