import styled from 'styled-components';

export const ErrorWrapper = styled.div`
  background: rgb(173, 0, 0);
  width: 100%;
  padding: 2rem;
  color: white;
  position: relative;

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
