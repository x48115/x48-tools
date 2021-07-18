import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 100px;
  flex-direction: column;
  height: 100%;
  margin-top: 300px;
`;

export default function Index() {
  return (
    <Wrapper>
      <h2 className="glitch" data-text="ERROR_404">
        Error 404
      </h2>
    </Wrapper>
  );
}
