import styled from 'styled-components';

import { theme, media, noise } from '../../styles/utils';

export const TimelineWrapper = styled.div`
  position: relative;
  background: ${theme.colors.light} ${noise} 0 0 repeat;
  background-size: 30px 30px;
`;
