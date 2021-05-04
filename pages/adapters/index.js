import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";

const Wrapper = styled.div``;

export default function Adapters() {
  return (
    <Wrapper>
      <Link href="/ironbank">
        <a>Iron Bank</a>
      </Link>
    </Wrapper>
  );
}
