import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  display: grid;
  grid-template-rows: 60px auto;
`;

export default function Index({ children }) {
  return <Wrapper>{children}</Wrapper>;
}
