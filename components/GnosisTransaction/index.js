import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useStore } from "../../components/StoreProvider/hooks";
import { observer } from "mobx-react";
import { useRouter } from "next/router";

const Wrapper = styled.div`
  padding: 20px;
  font-size: 13px;
`;

export default observer(() => {
  const store = useStore();
  const { asPath } = useRouter();
  const safeAddress = asPath.split("/")[2];
  const pathParts = asPath.split("/");
  const transactionHash = pathParts[4];
  const [currentTransaction, setCurrentTransaction] = useState("");

  useEffect(() => {
    store.websocket.gnosis("getTransaction", {
      safeAddress,
      transactionHash,
    });
  }, [transactionHash]);

  useEffect(() => {
    setCurrentTransaction(
      JSON.stringify(store.currentGnosisTransaction, null, 2)
    );
    console.log(JSON.stringify(store.currentGnosisTransaction, null, 2));
  }, [store.currentGnosisTransaction]);

  return (
    <Wrapper>
      <pre>{currentTransaction}</pre>
    </Wrapper>
  );
});
