import { Typography } from '@material-ui/core';
import styled from 'styled-components';

export default function Title({ children }) {
  return <StyledTypography variant="h4">{children}</StyledTypography>;
}

const StyledTypography = styled(Typography)`
  margin-bottom: 37px !important;
`;
