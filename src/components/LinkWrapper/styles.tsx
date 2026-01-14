import styled from '@emotion/styled'

export const Wrapper = styled.div`
  position: fixed;
  z-index: 1100; // bigger than leaflet
  top: var(--medium);
  right: var(--medium);
  cursor: pointer;

  svg {
    color: var(--white);
    transition: color 0.3s ease-in-out;
  }

  &:hover {
    svg {
      color: var(--highlight);
    }
  }
`
