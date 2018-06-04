import styled from 'styled-components';
import { theme, noise } from '../../styles/utils';

export const Wrapper = styled.div`
  background: rgb(255, 255, 255) 0 0 repeat;
  position: relative;

  &::after {
    content: '';
    background: radial-gradient(circle at 10% 10%, ${theme.colors.bright}, rgba(255, 255, 255, 0)),
      radial-gradient(circle at 90% 90%, ${theme.colors.alternate}, rgba(255, 255, 255, 0));
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    opacity: 0.05;
  }

  > div {
    position: relative;
    z-index: 1;
  }
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
  position: fixed;
  top: 0;
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
