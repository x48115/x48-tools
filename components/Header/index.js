import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import { useRouter } from "next/router";
import contractsConfig from "../../components/ConnectionProvider/contractsConfig";

import ActiveLink from "../ActiveLink";
import Adapter from "../../pages/adapters/[...adapterName]";

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
  const adapterContracts = contractsConfig.filter(
    (config) => config.type === "adapter"
  );
  const navItems = adapterContracts.map((config) => {
    return (
      <ActiveLink
        key={config.name}
        href={`/adapters/${config.name}`}
        activeClassName="active"
      >
        <a>{config.alias}</a>
      </ActiveLink>
    );
  });

  return (
    <Wrapper>
      <NavLinks>{navItems}</NavLinks>
      <hr />
    </Wrapper>
  );
}
