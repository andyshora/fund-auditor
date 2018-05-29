import styled, { keyframes } from 'styled-components';

const anim = keyframes`
  0% {
    fill-opacity: 0;
    stroke-opacity: 1;
  }
  50% {
    fill-opacity: 0.5;
    stroke-opacity: 1;
  }
  100% {
    fill-opacity: 0;
    stroke-opacity: 1;
  }
`;

export const LoaderWrapper = styled.svg`
  path {
    fill-opacity: 0.1;
    animation: ${anim} 2s infinite;
    stroke-width: 0.2;
  }
`;
