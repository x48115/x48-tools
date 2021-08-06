import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useStore } from "../../components/StoreProvider/hooks";
import { observer } from "mobx-react";
import { shortenAddress } from "../../utilities/address";
import Router from "next/router";

const Wrapper = styled.div`
  padding-top: 50px;
  width: 100%;
  border-right: 1px solid #44f1a6;
  text-align: center;
  position: relative;
`;

const Header = styled.div`
  text-decoration: underline;
  font-size: 20px;
  margin-bottom: 50px;
`;

const List = styled.select`
  color: #44f1a6;
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  outline: none;
  padding: 0px;
  top: 80px;
  background-color: transparent;
  border: 0px;
  width: 100%;
  margin-top: 30px;
`;

const Option = styled.option`
  padding: 7px 0px;
  text-align: center;
  border: none;
  outline: none;
  &:hover {
    background-color: #333;
  }
  ::after {
    content: attr(data-text);
    color: #44f1a6;
  }
  &:checked {
    background: linear-gradient(0deg, #44f1a6 0%, #44f1a6 100%);
    outline: none;
    color: black;
    ::after {
      content: attr(data-text);
      color: black;
    }
  }
`;

export default observer(() => {
  const store = useStore();
  const websocket = store.websocket;
  const { asPath } = useRouter();
  const safeAddress = asPath.split("/")[2];
  const pathParts = asPath.split("/");
  const initialize = () => {
    if (!store.gnosisTransactions.length) {
      websocket.gnosis("getTransactionsList", {
        safeAddress,
      });
      websocket.gnosis("getOwners", {
        safeAddress,
      });
    }
  };
  useEffect(initialize, []);

  const transactionHash = pathParts[4];

  const [selectedTransaction, setSelectedTransaction] =
    useState(transactionHash);

  const selectTransaction = (newHash) => {
    setSelectedTransaction(newHash);
    Router.push(`/gnosis/${safeAddress}/queue/${newHash}`);
  };

  const renderTransaction = (transaction, idx) => {
    const fullHash = transaction.contractTransactionHash;
    const shortHash = shortenAddress(fullHash, 3);
    const checkMark = transaction.executed ? "☑" : "☐";

    return (
      <Option
        data-text={`${checkMark} Nonce ${transaction.nonce} (${shortHash})`}
        key={fullHash}
        value={fullHash}
      />
    );
  };
  const options =
    store.gnosisTransactions.length &&
    store.gnosisTransactions.map(renderTransaction);
  return (
    <Wrapper>
      <Header>Gnosis Queue</Header>
      <List
        multiple
        value={[selectedTransaction]}
        onChange={(evt) => selectTransaction(evt.target.value)}
      >
        {options}
      </List>
    </Wrapper>
  );
});
