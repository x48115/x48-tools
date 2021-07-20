import React from "react";
import styled from "styled-components";
import { useStore } from "../../components/StoreProvider/hooks";
import { observer } from "mobx-react";

const Wrapper = styled.div``;

export default observer(() => {
  const store = useStore();
  return <Wrapper></Wrapper>;
});
