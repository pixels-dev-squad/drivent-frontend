import styled from 'styled-components';
import { HiArrowLeftOnRectangle } from 'react-icons/hi2';
import { HiXCircle } from 'react-icons/hi';

export default function ActivityCard({ name, capacity, start, end }) {
  return (
    <Activity capacity={capacity} start={start.slice(0, -6)} end={end.slice(0, -6)}>
      <div>
        <p>{name}</p>
        <span>
          {start.slice(0, -3)} - {end.slice(0, -3)}
        </span>
      </div>
      <div>
        {capacity <= 0 ? (
          <>
            <HiXCircle />
            <p>Esgotado</p>
          </>
        ) : (
          <>
            <HiArrowLeftOnRectangle />
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
  background-color: #f1f1f1;
  border-radius: 5px;
  padding: 12px 0px 10px 10px;
  gap: 18px;
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
