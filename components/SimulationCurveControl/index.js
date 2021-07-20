import React from "react";
import styled from "styled-components";
import { useStore } from "../../components/StoreProvider/hooks";
import Button from "../../components/Button";
import { observer } from "mobx-react";

const Wrapper = styled.div`
  padding-top: 50px;
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  text-decoration: underline;
  font-size: 20px;
  margin-bottom: 50px;
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
  width: 100%;
`;

const StyledInput = styled.input``;

const ConfigurationWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
`;

const Configuration = styled.div`
  display: inline-flex;
  flex-direction: column;
  width: 80%;
`;

const Label = styled.label`
  display: inline-block;
  margin-top: 15px;
  opacity: 0.8;
`;

export default observer(() => {
  const store = useStore();
  return (
    <Wrapper>
      <ConfigurationWrapper>
        <Header>Curve voting simulator</Header>
        <Configuration>
          <Label htmlFor="tuningFactor">IB Override:</Label>
          <input id="tuningFactor" />
        </Configuration>
        <Configuration>
          <Label htmlFor="tuningFactor">Tuning Factor:</Label>
          <input id="tuningFactor" />
          <StyledButton
            onClick={() => {
              alert("Not yet");
            }}
          >
            Simulate
          </StyledButton>
        </Configuration>
      </ConfigurationWrapper>
    </Wrapper>
  );
});
