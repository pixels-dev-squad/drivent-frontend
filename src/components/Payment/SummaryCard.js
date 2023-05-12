import styled from 'styled-components';

export default function SummaryCard({ ticketType, price, show }) {
  return (
    <Card show={show}>
      <p>{ticketType}</p>
      <p>R$ {price}</p>
    </Card>
  );
}

const Card = styled.div`
  width: 290px;
  height: 108px;
  border: none;
  border-radius: 20px;
  background-color: #FFEED2;
  margin-bottom: 30px;

  display: ${(props) => (props.show === true ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  flex-direction: column;

  p:first-child{
    color: #454545;
    font-size: 16px;
    margin-bottom: 8px;
  }

  p:last-child{
    color: #898989;
    font-size: 14px;
  }

  @media (max-width: 600px) {
    height: 80px;
  }
`;
