import styled from 'styled-components';

export default function DayButton({ day, onClick, selected }) {
  return (
    <Button selected={selected} onClick={onClick}>
      {day}
    </Button>
  );
}

const Button = styled.button`
  width: 131px;
  height: 37px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  font-size: 14px;
  border: none;
  margin-right: 17px;
  background-color: ${(props) => (props.selected ? '#FFD37D;' : '#E0E0E0')};
  cursor: pointer;

  &:hover {
    background-color: #ffeed2;
    border: none;
    opacity: 0.5;
  }
`;
