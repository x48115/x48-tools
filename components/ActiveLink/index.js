import { useRouter } from "next/router";
import Link from "next/link";
import React, { Children } from "react";
import styled from "styled-components";

const ActiveLink = ({ children, activeClassName, ...props }) => {
  const { asPath } = useRouter();

  const Wrapper = styled.div`
    border: 2px solid #44f1a6;
    padding: 7px;
    color: #44f1a6;
    border-radius: 5px;
    > a {
      color: #44f1a6;
    }
    &:hover {
      color: #000;
      background-color: #44f1a6;
    }
    &.active {
      color: #000;
      background-color: #44f1a6;
    }
  `;

  const className =
    asPath === props.href || asPath === props.as
      ? `${props.className} ${activeClassName}`.trim()
      : props.className;

  return (
    <Link href={props.href}>
      <a>
        <Wrapper className={className}>{children}</Wrapper>
      </a>
    </Link>
  );
};

export default ActiveLink;
