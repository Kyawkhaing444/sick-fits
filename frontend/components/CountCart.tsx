import styled from 'styled-components';

const CountCartStyle = styled.div`
  padding: 0.5rem;
  border-radius: 50%;
  background: var(--red);
  color: white;
`;
export function CountCart({ count }: { count: number }) {
  return <CountCartStyle>{count}</CountCartStyle>;
}
