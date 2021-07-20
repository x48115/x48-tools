import React from "react";
import styled from "styled-components";
import { useStore } from "../../components/StoreProvider/hooks";
import { observer } from "mobx-react";

const Wrapper = styled.div`
  padding-top: 50px;
  width: 100%;
  text-align: center;
`;

const Header = styled.div`
  text-decoration: underline;
`;

export default observer(() => {
  const store = useStore();
  return (
    <Wrapper>
      <Header>Strategy harvest simulator</Header>
    </Wrapper>
  );
});
