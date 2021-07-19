import styled from "styled-components";
import ActiveLink from "../ActiveLink";
import { useDisplayName } from "../../components/ConnectionProvider/hooks";
import { useStore } from "../../components/StoreProvider/hooks";
import { useRouter } from "next/router";
import { observer } from "mobx-react";

const Wrapper = styled.div`
  display: ${(props) => (props.rootPage ? "none" : "inherit")};
  border-bottom: 1px solid #44f1a6;
`;

const BlockNumber = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  left: 30px;
  height: 59px;
`;

const NavLinks = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  align-items: center;
  grid-gap: 12px;
`;

const Account = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  right: 30px;
  height: 59px;
`;

const BlockText = styled.div`
  user-select: none;
`;

export default observer(function Header() {
  const displayName = useDisplayName();
  const { asPath } = useRouter();
  const rootPage = asPath == "/";
  const store = useStore();

  return (
    <Wrapper rootPage={rootPage}>
      <NavLinks>
        <BlockNumber>
          <BlockText>Block:&nbsp;</BlockText>
          {store.blockNumber.toLocaleString("en-US")}
          <BlockText>
            &nbsp;({store.lastBlockTimestampDelta} seconds ago)
          </BlockText>
        </BlockNumber>
        <ActiveLink href={`/gnosis`} activeClassName="active">
          Gnosis
        </ActiveLink>
        <ActiveLink href={`/firehose`} activeClassName="active">
          Firehose
        </ActiveLink>
        <Account>{displayName}</Account>
      </NavLinks>
    </Wrapper>
  );
});
