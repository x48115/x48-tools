import React from "react";
import styled from "styled-components";
import { useStore } from "../../components/StoreProvider/hooks";
import { observer } from "mobx-react";

const Wrapper = styled.div`
  border-left: 1px solid #44f1a6;
  height: 100%;
`;

export default observer(() => {
  const store = useStore();
  return <Wrapper></Wrapper>;
});
