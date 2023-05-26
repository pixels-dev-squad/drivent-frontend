import styled from 'styled-components';
import Subtitle from '../../../components/Subtitle';
import Title from '../../../components/TitlePage';
import { useEffect, useState } from 'react';
import useToken from '../../../hooks/useToken';
import { getDates } from '../../../services/activityApi';
import DayButton from '../../../components/Activity/DayButton';
import ActivityCard from '../../../components/Activity/ActivityCard';

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
      <LocalsContainer>
        <Locals>
          <p>Auditório Principal</p>
          <ActivitiesContainer>
            <ActivityCard />
          </ActivitiesContainer>
        </Locals>
        <Locals>
          <p>Auditório Lateral</p>
          <ActivitiesContainer></ActivitiesContainer>
        </Locals>
        <Locals>
          <p>Sala de Workshop</p>
          <ActivitiesContainer></ActivitiesContainer>
        </Locals>
      </LocalsContainer>
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

const LocalsContainer = styled.div`
  display: flex;
`;

const Locals = styled.div `
  width: 288px;
  height: 410px;
  text-align: center;
  margin-top: 25px;
  p{
    font-size: 18px;
    color: #7B7B7B;
  }
`;

const ActivitiesContainer = styled.div `
  display: flex;
  flex-direction: column;
  margin-top: 13px;
  width: 100%;
  height: 390px;
  border: 1px solid #D7D7D7;
  padding: 10px 9px;
  text-align: start;
  gap: 10px;
`;
