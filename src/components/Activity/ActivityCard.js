import styled from 'styled-components';
// import { HiArrowLeftOnRectangle } from 'react-icons/hi2';
// import { HiXCircle } from 'react-icons/hi';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function ActivityCard({ name, capacity, start, end, activitiesChoosed, setActivitiesChoosed, day }) {
  const [choosed, setChoosed] = useState(false);
  console.log(activitiesChoosed);

  const checkTimeConflict = (day, start, end) => {
    const activities = activitiesChoosed[day];

    if (activities) {
      return activities.some((activity) => {
        const activityStart = activity.start;
        const activityEnd = activity.end;

        return (
          (start >= activityStart && start < activityEnd) || 
          (end > activityStart && end <= activityEnd) || 
          (start <= activityStart && end >= activityEnd) 
        );
      });
    }

    return false; 
  };

  const addActivity = (day, name, start, end) => {
    const isTimeConflict = checkTimeConflict(day, start, end);

    if (isTimeConflict) {
      toast('Conflito de horário!');
      setChoosed(false);
      return;
    }

    setActivitiesChoosed((prevState) => {
      const updatedActivities = { ...prevState };

      if (updatedActivities[day]) {
        const index = updatedActivities[day].findIndex((activity) => activity.name === name);
        if (index !== -1) {
          updatedActivities[day].splice(index, 1);
        } else {
          updatedActivities[day].push({ name, start, end });
        }
      } else {
        updatedActivities[day] = [{ name, start, end }];
      }

      return updatedActivities;
    });
  };

  return (
    <Activity
      choosed={choosed}
      capacity={capacity}
      start={start.slice(0, -6)}
      end={end.slice(0, -6)}
      onClick={() => {
        setChoosed(!choosed);
        addActivity(day, name, start, end);
      }}
    >
      <div>
        <p>{name}</p>
        <span>
          {start.slice(0, -3)} - {end.slice(0, -3)}
        </span>
      </div>
      <div>
        {capacity <= 0 ? (
          <>
            <p>Esgotado</p>
          </>
        ) : (
          <>
            <p>{capacity} vagas</p>
          </>
        )}
      </div>
    </Activity>
  );
}
const Activity = styled.div`
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;
  width: 265px;
  height: ${(props) => {
    return (props.end - props.start) * 80;
  }}px;
  background-color: ${(props) => (props.choosed === false ? '#f1f1f1' : '#D0FFDB')};
  border-radius: 5px;
  padding: 12px 0px 10px 10px;
  gap: 18px;
  &:hover {
    cursor: pointer;
  }
  div:first-child {
    p {
      font-size: 11px;
      font-weight: 700;
      color: #343434;
    }
    span {
      font-size: 11px;
      color: #343434;
    }
  }
  div:last-child {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 66px;
    border-left: 1px solid #cfcfcf;
    p {
      font-size: 9px;
      color: ${(props) => (props.capacity <= 0 ? '#CC6666' : '#078632')};
    }
    svg {
      font-size: 25px;
      color: ${(props) => (props.capacity <= 0 ? '#CC6666' : '#078632')};
      margin-bottom: 2px;
    }
  }
`;
