import { Typography } from '@material-ui/core';
import styled from 'styled-components';

export default function Subtitle({ children, ...props }) {
  return <StyledTypography variant="h5" {...props}>{children}</StyledTypography>;
}

const StyledTypography = styled(Typography)`
  margin-bottom: 17px !important;
  color: #8e8e8e;
  display: ${props => props.show === true ? 'block' : 'none'} !important;
`;
