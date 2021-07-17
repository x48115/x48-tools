import styled from "styled-components";
import ActiveLink from "../ActiveLink";

const Wrapper = styled.div``;

const NavLinks = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  grid-gap: 20px;
`;

export default function Home() {
  return (
    <Wrapper>
      <NavLinks>
        <ActiveLink href={`/gnosis`} activeClassName="active">
          Gnosis
        </ActiveLink>
        <ActiveLink href={`/redis`} activeClassName="active">
          Redis
        </ActiveLink>
      </NavLinks>
      <hr />
    </Wrapper>
  );
}
