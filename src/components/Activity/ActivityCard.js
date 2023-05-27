import styled from 'styled-components';
import { HiArrowLeftOnRectangle } from 'react-icons/hi2';

export default function ActivityCard() {
  return (
    <Activity>
      <div>
        <p>Minecraft: montando o PC ideal</p>
        <span>09:00 - 10:00</span>
      </div>
      <div>
        <HiArrowLeftOnRectangle />
        <p>27 vagas</p>
      </div>
    </Activity>
  );
}

const Activity = styled.div`
  display: flex;
  justify-content: space-between;
  width: 265px;
  height: 79px;
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
      color: #078632;
    }
    svg {
      font-size: 20px;
      color: #078632;
      margin-bottom: 2px;
    }
  }
`;
