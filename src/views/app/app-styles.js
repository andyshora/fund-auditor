import styled from 'styled-components';
import { theme } from '../../styles/utils';

export const Wrapper = styled.div`
  .error {
    position: fixed;
    bottom: 0;
    z-index: 11;
  }
  .notification {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 10;
  }
`;

export const Header = styled.header``;


export const Nav = styled.nav`

> a {
  padding: 1rem;
}
`;

export const MainSection = styled.div`
  text-align: left;
`;

export const LoadingWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: white;

  > svg {
    display: block;
  }
`;
