import styled from "styled-components";
import { useRouter } from "next/router";
import SimulationsLogs from "../../components/SimulationLogs";
import SimulationCurveControl from "../../components/SimulationCurveControl";
import SimulationHarvestControl from "../../components/SimulationHarvestControl";

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 310px auto;
`;

export default function Adapters() {
  const { asPath } = useRouter();
  const page = asPath.split("/")[2];
  let control;
  if (page === "curve") {
    control = <SimulationCurveControl />;
  } else if (page === "harvest") {
    control = <SimulationHarvestControl />;
  }
  return (
    <Wrapper>
      {control}
      <SimulationsLogs />
    </Wrapper>
  );
}
