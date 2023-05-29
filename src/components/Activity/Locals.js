import styled from 'styled-components';
import ActivityCard from './ActivityCard';

export default function Locals({ name, activities, activitiesChoosed, setActivitiesChoosed, selectedDay }) {
  console.log(activities[0].startsAt);
  console.log(selectedDay.split(', ')[1]);
  return (
    <LocalsStyled>
      <p>{name}</p>
      <ActivitiesContainer>
        {activities.map((a) => (
          <ActivityCard
            day={selectedDay}
            activitiesChoosed={activitiesChoosed}
            setActivitiesChoosed={setActivitiesChoosed}
            name={a.name}
            capacity={a.capacity}
            start={a.startsAt}
            end={a.endsAt}
            key={a.id}
          />
        ))}
      </ActivitiesContainer>
    </LocalsStyled>
  );
}

const LocalsStyled = styled.div`
  width: 288px;
  height: 410px;
  text-align: center;
  margin-top: 25px;
  p {
    font-size: 18px;
    color: #7b7b7b;
  }
`;

const ActivitiesContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 13px;
  width: 100%;
  height: 390px;
  border: 1px solid #d7d7d7;
  padding: 10px 9px;
  text-align: start;
  overflow-y: auto;
  gap: 10px;
  &::-webkit-scrollbar {
    display: none;
  }
`;
