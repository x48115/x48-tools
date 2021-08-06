import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import { useStore } from "../../components/StoreProvider/hooks";
import { observer } from "mobx-react";
import { shortenAddress } from "../../utilities/address";
import { useRouter } from "next/router";

// TODO: constants..
const governance = "0xFEB4acf3df3cDEA7399794D0869ef76A6EfAff52";
const gnosisProxy = "0x34CfAC646f301356fAa8B21e94227e3583Fe3F5F";
const multiSend = "0x40A2aCCbd92BCA938b02010E17A5b8929b49130D";

const Wrapper = styled.div`
  margin-top: 50px;
  width: 100%;
  position: relative;

  padding: 0px 50px;
  box-sizing: border-box;
`;

const DownloadLink = styled.a`
  display: none;
`;

const WrapperInternal = styled.div`
  box-sizing: border-box;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const StyledButton = styled(Button)`
  width: 140px;
`;

const Header = styled.div`
  text-decoration: underline;
  font-size: 20px;
  justify-self: center;
  margin-bottom: 47px;
`;

const Controls = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  grid-gap: 5px;
  flex-direction: row;
  > a {
    width: 120px;
  }
  &:last-child {
  }
  margin-bottom: 30px;
`;

const Link = styled.a``;
const Summary = styled.div`
  display: inline-flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 130px;
  bottom: 0px;
  overflow: scroll;
  left: 0;
  right: 0;
  padding: 0px 50px;
  padding-bottom: 30px;
`;

const Table = styled.table`
  table-layout: fixed;
  width: 100%;
  max-width: 800px;
`;

const Tr = styled.tr`
  > td:first-of-type {
    width: 140px;
    min-width: 140px;
  }
`;

const Ul = styled.ul`
  > li {
    margin-bottom: 5px;
  }
`;

const SimulationPendingWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 100px;
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
  }, [store.currentGnosisTransaction, store.currentGnosisSimulation]);

  const ownersAddresses = JSON.parse(
    JSON.stringify(store.currentGnosisOwners)
  ).map((owner) => owner.address.toLowerCase());

  const contracts = JSON.parse(
    JSON.stringify(store.currentGnosisSimulation.transaction.addresses || [])
  );

  // TODO: Move logic
  const filteredContracts = contracts
    .filter(
      (contract) =>
        !ownersAddresses.includes(contract.toLowerCase()) &&
        contract !== governance.toLowerCase() &&
        contract !== gnosisProxy.toLowerCase() &&
        contract !== multiSend.toLowerCase()
    )
    .map((contract) => {
      const matchingContract = JSON.parse(
        JSON.stringify(store.currentGnosisSimulation.contracts)
      ).find(
        (currentContract) => currentContract.address.toLowerCase() == contract
      );
      const contractName = matchingContract
        ? matchingContract.contract_name
        : null;
      return {
        address: contract,
        contractName,
      };
    });

  const contractsEls = filteredContracts.map((contract) => (
    <li key={contract.address}>
      <a
        href={`https://etherscan.io/address/${contract.address}`}
        target="_blank"
      >
        {contract.address}
      </a>
      {contract.contractName ? `(${contract.contractName})` : ""}
    </li>
  ));

  const logs = (
    store.currentGnosisSimulation.transaction.transaction_info.logs || []
  ).map((log, idx) => {
    const { inputs } = log;
    const inputNames = inputs.map((log) => log.soltype.name).join(",");
    return <li key={idx}>{`${log.name}(${inputNames})`}</li>;
  });

  const tokenTransfers = store.currentGnosisSimulation.transferLogs.map(
    (transfer, idx) => (
      <li key={idx}>
        {transfer.amount}{" "}
        <a
          target="_blanl"
          href={`https://etherscan.io/address/${transfer.tokenData.address}`}
        >
          {transfer.tokenData.symbol}
        </a>{" "}
        from{" "}
        <a
          target="_blanl"
          href={`https://etherscan.io/address/${transfer.from}`}
        >
          {shortenAddress(transfer.from, 3)}
        </a>{" "}
        to{" "}
        <a target="_blanl" href={`https://etherscan.io/address/${transfer.to}`}>
          {shortenAddress(transfer.to, 3)}
        </a>
      </li>
    )
  );

  const gasInEth =
    (store.currentGnosisSimulation.transaction.gas_used * store.gasPrice) /
    10 ** 9;

  const forkId = store.currentGnosisSimulation.simulation.fork_id;
  const simulationId = store.currentGnosisSimulation.simulation.id;
  const inspect = () => {
    const url = `https://dashboard.tenderly.co/yearn/yearn-web/fork/${forkId}/simulation/${simulationId}`;
    const win = window.open(url, "_blank");
    win.focus();
  };

  const download = () => {
    var dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(
        JSON.stringify(store.currentGnosisSimulation, null, 2)
      );
    var dlAnchorElem = document.getElementById("downloadAnchorElem");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `simulation_${forkId}.json`);
    dlAnchorElem.click();
  };

  if (store.simulationPending) {
    return (
      <SimulationPendingWrapper>
        Simulation in progress...
      </SimulationPendingWrapper>
    );
  }

  return (
    <Wrapper>
      <WrapperInternal>
        <Header>Simulation</Header>
        <Controls>
          <StyledButton onClick={download}>Download</StyledButton>
          <StyledButton onClick={inspect}>Inspect</StyledButton>
        </Controls>
        <Summary>
          <Table>
            <tbody>
              <Tr>
                <td>Submitted by</td>
                <td>
                  <a href="#">
                    {store.currentGnosisTransaction.senderDisplayName}
                  </a>
                </td>
              </Tr>
              <Tr>
                <td>To</td>
                <td>
                  <a href="#">{store.currentGnosisTransaction.to}</a>
                </td>
              </Tr>
              <Tr>
                <td>Input</td>
                <td>{store.currentGnosisTransaction.data}</td>
              </Tr>
              <Tr>
                <td>Transaction Hash</td>
                <td>
                  {store.currentGnosisTransaction.contractTransactionHash}
                </td>
              </Tr>
              <Tr>
                <td>Nonce</td>
                <td>{store.currentGnosisTransaction.nonce}</td>
              </Tr>
              <Tr>
                <td>Value</td>
                <td>{`${
                  store.currentGnosisTransaction.value / 10 ** 18
                } ETH`}</td>
              </Tr>
              <Tr>
                <td>Gas used</td>
                <td>{`${store.currentGnosisSimulation.transaction.gas_used.toLocaleString(
                  "en-US"
                )} (${gasInEth} ETH @ ${store.gasPrice} gwei)`}</td>
              </Tr>
              <Tr>
                <td>Token Transfers</td>
                <td>
                  <ul>{tokenTransfers}</ul>
                </td>
              </Tr>
              <Tr>
                <td>Events</td>
                <td>
                  <ul>{logs}</ul>
                </td>
              </Tr>
              <Tr>
                <td>Contracts</td>
                <td>
                  <Ul>{contractsEls}</Ul>
                </td>
              </Tr>
              <Tr>
                <td>Fork ID</td>
                <td>{`${forkId}`}</td>
              </Tr>
              <Tr>
                <td>RPC</td>
                <td>
                  https://rpc.tenderly.co/fork/389f939b-b6cc-45ce-9d0a-942ce873d38b
                </td>
              </Tr>
              <Tr>
                <td>API</td>
                <td>https://api.tenderly.co/api/v1/account/yearn/project/</td>
              </Tr>
            </tbody>
          </Table>
        </Summary>
        <DownloadLink id="downloadAnchorElem"></DownloadLink>
      </WrapperInternal>
    </Wrapper>
  );
});
