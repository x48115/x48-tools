import { useRouter } from "next/router";
import Link from "next/link";
import React from "react";
import Button from "../Button";

const ActiveLink = ({ children, activeClassName, ...props }) => {
  const { asPath } = useRouter();
  const className =
    asPath.startsWith(props.href) || asPath === props.as
      ? `${props.className} ${activeClassName}`.trim()
      : props.className;

  return (
    <Link href={props.href}>
      <a>
        <Button className={className}>{children}</Button>
      </a>
    </Link>
  );
};

export default ActiveLink;
