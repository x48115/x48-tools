import React from "react";
import styled from "styled-components";
import { useStore } from "../../components/StoreProvider/hooks";
import { observer } from "mobx-react";

const Input = styled.input`
  width: 100%;
  top: 0px;
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  position: relative;
  display: none;
  width: 400px;
  height: 60px;
  top: 15px;
`;

const Options = styled.div`
  background-color: #272822;
  width: 100%;
  position: relative;
  top: -1px;
  border: 1px solid #3bf0a1;
  border-top: 0px;
  height: 400px;
  box-sizing: border-box;
`;

export default observer(() => {
  const store = useStore();
  return (
    <Wrapper>
      <Input autoFocus></Input>
      <Options />
    </Wrapper>
  );
});
