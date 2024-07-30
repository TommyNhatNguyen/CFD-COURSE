import styled from "styled-components";

export const StyledAccordion = styled.div`
  .accordion__content {
    .accordion__content-text {
      white-space: pre-line;
    }
    &.active {
      &:first-child {
        .accordion__content-text {
          display: block;
        }
      }
    }
    &:first-child {
      .accordion__content-text {
        display: none;
      }
    }
  }
`;
