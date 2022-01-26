import React from "react";
import styled from "styled-components";
import { useStore } from "../../components/StoreProvider/hooks";
import { observer } from "mobx-react";

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 40px auto;
  justify-content: center;
  margin-top: 20px;
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;

const Table = styled.table`
  margin-bottom: 40px;
`;

const Td = styled.td`
  &:last-of-type {
    text-align: right;
  }
`;

export default observer(() => {
  const store = useStore();
  const lastUpdate = store.tokens.timestamp || store.currentTimestamp;
  let updated = Math.floor((store.currentTimestamp - lastUpdate) / 1000);
  if (updated < 0) {
    updated = 0;
  }
  const loading = store.tokens.tokens.length == 0;
  if (loading) {
    return <Loading>Simulating gas usage and oracle queries...</Loading>;
  }

  const tokensRows = store.tokens.tokens.map((token) => {
    return (
      <tr key={token.address}>
        <td>{token.address}</td>
        <td>{token.symbol}</td>
        <td>{token.gasUsed}</td>
        <Td>{token.price}</Td>
      </tr>
    );
  });

  const tokensTable = (
    <Table>
      <thead>
        <tr>
          <th>address</th>
          <th>symbol</th>
          <th>gas</th>
          <th>price</th>
        </tr>
      </thead>
      <tbody>{tokensRows}</tbody>
    </Table>
  );
  return (
    <Wrapper>
      <div>updated: {updated} seconds ago</div>
      {tokensTable}
    </Wrapper>
  );
});
