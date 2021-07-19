import styled from "styled-components";
import { useRouter } from "next/router";

const Wrapper = styled.div`
  margin-top: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Path0 = styled.div`
  font-size: 20px;
  text-transform: uppercase;
  margin-bottom: 25px;
`;

const Path1 = styled.div`
  margin-bottom: 5px;
  font-size: 28px;
  font-weight: bold;
  text-transform: capitalize;
`;

const NotYet = styled.div`
  margin-top: 100px;
`;

export default function Adapters() {
  const { asPath } = useRouter();
  const root = asPath.split("/")[1];
  const page = asPath.split("/")[2];
  return (
    <Wrapper>
      <Path0>{root}</Path0>
      <Path1>{page}</Path1>
      <NotYet>Not yet...</NotYet>
    </Wrapper>
  );
}
