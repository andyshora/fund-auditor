import styled, { keyframes } from 'styled-components';

import { theme } from '../styles/utils';

export const Wrapper = styled.div`
  padding: 60px 0 0 0;
`;

export const WrapperInset = styled.div`
  padding: 60px 0 0 0;
  max-width: 1000px;
  margin: 0 auto;
`;

export const FormLabel = styled.label`
  width: 120px;
  margin: 1rem 0 0.4rem 0;
`;

export const FormError = styled.label`
  width: 120px;
  margin: 1rem 0 0.4rem 0;
  position: absolute;
  right: 2rem;
  color: ${theme.colors.negative};
  background: white;
`;

export const FormButton = styled.button`
  height: 50px;
  padding: 10px 20px;
  background: rgb(255, 255, 255);
  border: 1px solid rgb(238, 238, 238);
  border-radius: 2px;
  color: rgb(0, 0, 0);
  cursor: pointer;
  user-select: none;

  &.--bare {
    background: none;
    border: 1px solid rgba(238, 238, 238, 0.5);
  }

  &[disabled] {
    opacity: 0.4;
  }
`;

export const FormSendRow = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem 0;
  justify-content: flex-end;

  > button {
    margin: 0 0 0 1rem;
  }
`;

export const FormRow = styled.div`
  padding: 0.5rem 0;
  display: flex;
  flex-direction: column;

  input, textarea {
    padding: 1rem;
    min-width: 300px;
    border: 1px solid ${theme.colors.main4};
    font-size: 2rem;
    font-family: "Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace;

    background: rgb(22, 15, 31);
    color: ${theme.colors.light};
    box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.2);

    &:focus {
      border-color: ${theme.colors.main1};
      outline: none;
    }
  }

  textarea {
    min-width: 300px;
    min-height: 120px;
    line-height: 1.2;
  }
`;

export const ChartWrapper = styled.div`
  padding: 0;
  position: relative;

  > .chart {
    transition: border 0.5s;
  }

  h1 {
    color: ${theme.colors.bright};

    > span {
      margin-left: 0.5rem;
      color: ${theme.colors.light};
      font-size: 2rem;
      opacity: 0.8;
    }
  }
`;

const upAnim = keyframes`
  0% {
    transform: translateX(20px);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(0);
  }
`;

export const ChartHeading = styled.h1`
  &::before {
    content: '${props => props.changeAmount ? `+${props.changeAmount.toFixed(2)}` : ''}';
    background: ${props => props.changeColor};
    display: inline-block;
    color: ${theme.colors.dark};
    margin-right: 2rem;
    font-size: 2rem;
    animation: ${upAnim} 0.6s forwards;
    padding: ${props => props.changeAmount ? '0.3rem 0.5rem' : '0'};
    position: relative;
    bottom: 5px;
  }
`;

export const SeriesKey = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  width: 160px;
  padding: 0 50px 0 0;
`;
export const SeriesKeyLine = styled.div`
  white-space: nowrap;
  padding: 0.5rem 0;
  position: relative;
  font-size: 1.4rem;

  &::after {
    content: '';
    width: 40px;
    margin: 0;
    height: 1px;
    background: ${props => props.color};
    position: absolute;
    right: -50px;
    top: 13px;
  }
`;

export const Tag = styled.em`
  padding: 0.5rem;
  display: inline-block;
  background: ${theme.colors.dark2};
  color: ${theme.colors.bright};
  border: 1px solid ${theme.colors.dark2};
  margin: 0 0 0 1rem;
  font-style: normal;
  font-family: "Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace;
  list-style-type: none;
  cursor: pointer;

  &:hover {
    border-color: ${theme.colors.bright};
  }
`;
