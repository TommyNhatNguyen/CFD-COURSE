import styled from "styled-components";

export const StyledHeader = styled.header`
  &.--bgblackopacity {
    z-index: 1;
    background-color: ${(props) => props.theme.blackOpacityBg};
  }
`;
