import React from "react";
import styled from "styled-components";
import { useStore } from "../../components/StoreProvider/hooks";
import { observer } from "mobx-react";

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  margin: 20px 0px;
`;

const Input = styled.input``;

const Redis = () => {
  return <Wrapper>test</Wrapper>;
};

export default observer(Redis);
