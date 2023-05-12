import { IoPersonOutline, IoPersonSharp } from 'react-icons/io5';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

export default function RoomButton({ active, room, onClick }) {
  const [icons, setIcons] = useState([]);

  const renderIcons = () => {
    const newIcons = [];
    for (let i = 1; i <= room.capacity; i++) {
      const isOccupied = i <= room.ocupation;
      let isSelected = false;
      if (i === room.capacity && active) isSelected = true;

      const icon = (
        <Icon key={i} isOccupied={isOccupied} isSelected={isSelected} disabled={room.capacity === room.ocupation}>
          {' '}
          {isOccupied || isSelected ? <IoPersonSharp /> : <IoPersonOutline />}
        </Icon>
      );
      if (isSelected) newIcons.push(icon);
      else newIcons.unshift(icon);
    }
    setIcons(newIcons);
  };

  useEffect(() => {
    renderIcons();
  }, [active]);

  return (
    <Button active={active} disabled={room.capacity === room.ocupation} onClick={onClick}>
      <span>{room.name}</span>
      <span>{icons}</span>
    </Button>
  );
}

const Button = styled.button`
  width: 190px;
  height: 45px;
  border: 1px solid #cecece;
  border-radius: 10px;
  cursor: pointer;
  margin: 4px 9px;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  text-align: center;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px 0 16px;

  background-color: ${(props) => (props.active ? '#FFEED2;' : '')};
  color: '#454545';
  ${(props) => (props.active ? 'border: none;' : '')};

  &:hover {
    background-color: #ffeed2;
    border: none;
    opacity: 0.5;
  }
  span {
    display: flex;
  }
  ${(props) =>
    props.disabled
      ? `
    background-color: #CECECE;
    color: #9D9D9D;
    cursor: not-allowed;
    &[disabled]:hover {
        background-color: #CECECE;
        border: 1px solid #cecece;
        opacity: 1;
    }
    `
      : ''};
`;

const Icon = styled.div`
  & > *:first-child {
    color: ${(props) => (props.isSelected ? '#FF4791' : props.disabled ? '#8C8C8C' : '#000')};
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 2px;
  }
`;
