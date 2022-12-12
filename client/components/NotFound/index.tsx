import React from 'react';
import styled from '@emotion/styled';
import { mainSectionStyle } from '../../styles/mixin';

export default function NotFound({ children }: React.PropsWithChildren) {
  return <Wrapper>{children}</Wrapper>;
}
export const Wrapper = styled.div`
  ${mainSectionStyle}
  text-align: center;
  justify-content: center;
`;
