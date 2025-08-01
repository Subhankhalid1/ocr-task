import type { ReactNode } from 'react';
import styled from 'styled-components';

const FullWidth = styled.div`
  height: 60vh;
`;

export const Content = ({ children }: { children: ReactNode }) => {
  return (
    <FullWidth>
      <div>{children}</div>
    </FullWidth>
  );
};
