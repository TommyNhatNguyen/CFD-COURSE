import styled from "styled-components";

export const StyledButtonModal = styled.a`
  &:hover {
    opacity: 1 !important;
  }
  span {
    transition: ${(props) => props.theme.transition};
    -webkit-transition: ${(props) => props.theme.transition};
    -moz-transition: ${(props) => props.theme.transition};
    -ms-transition: ${(props) => props.theme.transition};
    -o-transition: ${(props) => props.theme.transition};
    &:hover {
      opacity: 0.8;
    }
  }
`;
