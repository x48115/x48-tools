import React from "react";
import styled from "styled-components";
import { useStore } from "../../components/StoreProvider/hooks";
import { shortenAddress } from "../../utilities/address";
import { observer } from "mobx-react";
import Button from "../../components/Button";
import SignButton from "../../components/SignButton";

const Wrapper = styled.div`
  border-right: 1px solid #44f1a6;
  padding-top: 50px;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-content: center;
`;

const Header = styled.div`
  text-decoration: underline;
  font-size: 20px;
  margin: 0 auto;
  margin-bottom: 47px;
`;

const OwnersList = styled.div`
  margin: 0 auto;
  display: grid;
  width: 180px;
  margin-bottom: 20px;
`;

const Signers = styled.div`
  font-size: 18px;
  margin: 0 auto;
  margin-bottom: 20px;
`;

const StyledSignButton = styled(SignButton)`
  margin-top: 20px;
`;

const ExecuteButton = styled(Button)`
  margin-top: 5px;
`;

const Loading = styled.div`
  margin: 0 auto;
`;

const Owner = styled.div`
  padding: 3px;
  display: inline-block;
  text-decoration: underline;
`;

export default observer(() => {
  const store = useStore();
  const owners = store.currentGnosisOwners.map((owner) => (
    <div key={owner.address}>
      ✓
      <a href={`https://etherscan.io/address/${owner.address}`} target="_blank">
        <Owner>{shortenAddress(owner.displayName, 4)}</Owner>
      </a>
    </div>
  ));

  let signatures;
  if (owners.length) {
    signatures = (
      <>
        <Signers>Signatures (0/6)</Signers>
        <OwnersList>
          {owners}
          <StyledSignButton>Sign</StyledSignButton>
          <ExecuteButton disabled>Execute</ExecuteButton>
        </OwnersList>
      </>
    );
  } else {
    signatures = <Loading>Loading...</Loading>;
  }
  return (
    <Wrapper>
      <Header>Transaction</Header>
      {signatures}
    </Wrapper>
  );
});
