import styled from "styled-components";
import ActiveLink from "../ActiveLink";
import { useDisplayName } from "../../components/ConnectionProvider/hooks";
import { useRouter } from "next/router";

const Wrapper = styled.div`
  display: ${(props) => (props.rootPage ? "none" : "inherit")};
`;

const NavLinks = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  align-items: center;
  margin: 12px auto;
  grid-gap: 12px;
`;

const Line = styled.div`
  width: 100%;
  border-top: 1px solid #44f1a6;
`;

const Account = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  right: 30px;
  height: 100%;
`;

export default function Header() {
  const displayName = useDisplayName();
  const { asPath } = useRouter();
  const rootPage = asPath == "/";

  return (
    <Wrapper rootPage={rootPage}>
      <NavLinks>
        <ActiveLink href={`/gnosis`} activeClassName="active">
          Gnosis
        </ActiveLink>
        <ActiveLink href={`/redis`} activeClassName="active">
          Redis
        </ActiveLink>
        <Account>{displayName}</Account>
      </NavLinks>
      <Line />
    </Wrapper>
  );
}
