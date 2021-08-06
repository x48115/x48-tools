import styled from "styled-components";
import { observer } from "mobx-react";
import { useStore } from "../../../../components/StoreProvider/hooks";
import GnosisTransactionDetails from "../../../../components/GnosisTransactionDetails";
import GnosisTransactionSummary from "../../../../components/GnosisTransactionSummary";
import GnosisQueueList from "../../../../components/GnosisQueueList";

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 230px auto;
`;

const NoTransactions = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  margin-top: 100px;
  text-align: center;
`;

const NoTransactionsHeader = styled.div`
  font-size: 25px;
  margin-bottom: 30px;
`;

const GnosisTransactionLayout = styled.div`
  display: grid;
  grid-template-columns: 270px auto;
`;

export default observer(function Component() {
  const store = useStore();
  const hasTransactions = store.gnosisTransactions.length;
  let content;
  if (hasTransactions) {
    content = (
      <GnosisTransactionLayout>
        <GnosisTransactionSummary />
        <GnosisTransactionDetails />
      </GnosisTransactionLayout>
    );
  } else {
    content = (
      <NoTransactions>
        <NoTransactionsHeader>No transactions yet</NoTransactionsHeader>
        <div>
          Submit a transaction using{" "}
          <a href="https://github.com/banteg/ape-safe" target="_blank">
            Ape Safe
          </a>
        </div>
      </NoTransactions>
    );
  }
  return (
    <Wrapper>
      <GnosisQueueList />
      {content}
    </Wrapper>
  );
});
