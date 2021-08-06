import styled from "styled-components";
import { useDisplayName } from "../../components/ConnectionProvider/hooks";
import { useStore } from "../../components/StoreProvider/hooks";
import { useRouter } from "next/router";
import { observer } from "mobx-react";

const Wrapper = styled.div`
  display: ${(props) => (props.rootPage ? "none" : "inherit")};
  border-bottom: 1px solid #44f1a6;
`;

const BlockNumber = styled.div`
  display: flex;
  align-items: center;
  padding-left: 30px;
`;

const NavLinks = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  align-items: center;
  grid-gap: 12px;
`;

const Account = styled.div`
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 30px;
`;

const BlockText = styled.div`
  user-select: none;
`;

const Left = styled.div`
  flex-direction: row;
  grid-gap: 5px;
  align-items: center;
  display: flex;
`;

export default observer(function Header() {
  const displayName = useDisplayName();
  const { asPath } = useRouter();
  const rootPage = asPath == "/";
  const store = useStore();

  return (
    <Wrapper rootPage={rootPage}>
      <NavLinks>
        <Left>
          <BlockNumber>
            <BlockText>Block:&nbsp;</BlockText>
            {store.blockNumber}
            <BlockText>
              &nbsp;({String(store.lastBlockTimestampDelta).padStart(2, "0")}{" "}
              seconds ago)
            </BlockText>
          </BlockNumber>
          <div>|</div>
          <div>Gas: {store.gasPrice}</div>
        </Left>
        <Account>{displayName}</Account>
      </NavLinks>
    </Wrapper>
  );
});
