import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import { useRouter } from "next/router";

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
        <ActiveLink href="/" activeClassName="active">
          <a>Vaults</a>
        </ActiveLink>
        <ActiveLink href="/ironbank" activeClassName="active">
          <a>Iron Bank</a>
        </ActiveLink>
      </NavLinks>
      <hr />
    </Wrapper>
  );
}
