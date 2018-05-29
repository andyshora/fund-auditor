import styled, { keyframes } from 'styled-components';

import { theme } from '../../styles/utils';

const enterAnim = keyframes`
  0% {
    transform: translateY(100px);
  }
  100% {
    transform: translateY(0);
  }
`;

export const NotificationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  color: ${theme.colors.light};
  border-top: 1px solid ${theme.colors.positive};
  width: 80%;
  min-width: 800px;
  padding: 1rem 2rem 2rem;
  margin: 0 auto;
  color: white;
  background: linear-gradient(0deg, ${theme.colors.dark2}, ${theme.colors.dark});
  animation: 0.4s ${enterAnim} forwards;

  > svg {
    position: absolute;
    right: 2rem;
    top: 2rem;
    cursor: pointer;
  }

  p > i {
    font-size: 1.2rem;
  }
`;

export const LeftSection = styled.div`
  padding: 1.7rem 2rem 1.7rem 1rem;
`;
export const RightSection = styled.div``;
