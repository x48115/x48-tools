import React from "react";
import styled from "styled-components";
import AuthenticateButton from "../../components/AuthenticateButton";
import Button from "../../components/Button";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0px;
`;

const Redis = () => {
  return (
    <Wrapper>
      <AuthenticateButton />
    </Wrapper>
  );
};

export default Redis;
