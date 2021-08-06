import styled from "styled-components";

const Button = styled.button`
  border: 2px solid #44f1a6;
  padding: 7px;
  color: #44f1a6;
  border-radius: 5px;
  background-color: transparent;

  justify-content: center;
  > a {
    color: #44f1a6;
  }
  &:hover {
    color: #000;
    background-color: #44f1a6;
  }
  &.active {
    color: #000;
    background-color: #44f1a6;
  }
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    &:hover {
      background-color: transparent;
      color: #44f1a6;
    }
  }
  outline: none;
  user-select: none;
`;

export default Button;
