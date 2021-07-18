import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Router from "next/router";
import { useStore } from "../../components/StoreProvider/hooks";
import { observer } from "mobx-react";

export default observer(() => {
  const store = useStore();
  const { asPath } = useRouter();
  const selectedTopic = asPath.replace("/redis/", "");
  const [topicSelected, setTopicSelected] = useState(false);

  const Wrapper = styled.div`
    border-right: 1px solid #44f1a6;
    padding: 30px 15px;
  `;

  const Topic = styled.div`
    padding: 5px 0px;
    &:first-of-type {
      padding-top: 0px;
    }
    opacity: ${(props) => (props.selected ? "1" : "0.5")};
    &:hover {
      opacity: 1;
    }
    cursor: default;
  `;

  const selectTopic = (subscriptionTopic) => {
    if (selectedTopic != subscriptionTopic) {
      const previousTopic = store.currentTopic;
      store.setCurrentTopic(subscriptionTopic);
      if (previousTopic) {
        store.websocket.unsubscribe(previousTopic);
      }
      store.websocket.subscribe(subscriptionTopic);
      Router.push("/redis", `/redis/${subscriptionTopic}`, { shallow: true });
    }
  };

  const topics = store.subscriptionTopics.map((subscriptionTopic, idx) => {
    const selected = selectedTopic == subscriptionTopic;
    return (
      <Topic
        selected={selected}
        key={idx}
        onClick={() => selectTopic(subscriptionTopic)}
      >
        {subscriptionTopic}
      </Topic>
    );
  });

  return <Wrapper>{topics}</Wrapper>;
});
