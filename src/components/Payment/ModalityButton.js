import styled from 'styled-components';

export default function ModalityButton({ active, onClick, children }) {
  return (
    <Button active={active} onClick={onClick}>
      {children}
    </Button>
  );
}

const Button = styled.button`
  width: 145px;
  height: 145px;
  border: 1px solid #cecece;
  border-radius: 20px;
  background-color: transparent;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  ${(props) => (props.active ? 'background-color: #FFEED2;' : '')}
  ${(props) => (props.active ? 'border: none;' : '')}

    &:hover {
    background-color: #ffeed2;
    border: none;
    opacity: 0.5;
  }

  & > *:not(:last-child) {
    margin-bottom: 4px;
  }

  & > *:first-child {
    font-size: 1rem;
    line-height: 1.1875rem;
    color: #454545;
  }

  & > *:last-child {
    font-size: 0.875rem;
    line-height: 1rem;
    color: #898989;
  }

  @media (max-width: 600px) {
    height: 80px;
  }
`;
