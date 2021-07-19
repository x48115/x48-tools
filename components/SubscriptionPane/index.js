import React, { useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Router from "next/router";
import { useStore } from "../../components/StoreProvider/hooks";
import { observer } from "mobx-react";
import menuItems from "./menu.json";

const Wrapper = styled.div`
  border-right: 1px solid #44f1a6;
  padding: 30px 0px;
`;

const RootItem = styled.div`
  width: 100%;
  display: relative;
`;

const RootName = styled.div`
  padding-left: 10px;
  display: inline-block;
`;

const Topic = styled.div`
  padding: 5px 0px;
  opacity: ${(props) => (props.selected ? "1" : ".5")};
  padding-left: 15px;
  cursor: default;
  user-select: none;
  ${(props) =>
    props.selected &&
    `background-color: #444;
  `}
  &:hover {
    background-color: ${(props) => (props.selected ? "#444" : "#333")};
    opacity: 1;
  }
  &.root {
    text-transform: uppercase;
    right: 0px;
    &:hover {
      opacity: 1;
    }
  }
  &.child {
    text-transform: capitalize;
    padding-left: 45px;
    &:hover {
      background-color: ${(props) => (props.selected ? "#444" : "#333")};
    }
  }
`;

const ChildrenContainer = styled.div`
  overflow: hidden;
  height: ${(props) => (props.expanded ? "auto" : "0px")};
`;

const Arrow = styled.div`
  display: inline-block;
  padding-right: 8px;
  position: relative;
  top: ${(props) => (props.expanded ? "-1px" : "-3px")};
  padding: 0px;
  transform: ${(props) => (props.expanded ? "rotate(90deg)" : "inherit")};
`;

export default observer(() => {
  const store = useStore();
  const { asPath } = useRouter();
  const pathParts = asPath.split("/");
  pathParts.shift();
  const pathRoot = pathParts[0];
  const selectedTopic = pathParts[1];

  const initializeMenu = () => {
    store.setMenuSelection(pathRoot, selectedTopic);
  };
  useEffect(initializeMenu, []);

  const selectChild = (root, child, itemIdx) => {
    store.setMenuSelection(root, child);
    Router.push(`/${root}`, `/${root}/${child}`, { shallow: true });
    store.setCurrentTopic(root, child);
  };

  const selectParent = (root, itemIdx) => {
    store.toggleMenuState(root);
    store.setMenuSelection(root);
  };

  const renderMenu = () => {
    let itemIdx = 0;
    const menu = menuItems.map(({ root, children }, parentIdx) => {
      // Render children
      const renderChildren = () =>
        children.map((child, childIdx) => {
          itemIdx++;
          const dereferencedIdx = itemIdx.valueOf();
          const selected = dereferencedIdx == store.selectedMenuIdx;
          const childItem = (
            <Topic
              className="child"
              key={childIdx}
              idx={childIdx}
              selected={selected}
              onClick={() => selectChild(root, child, dereferencedIdx)}
            >
              {child}
            </Topic>
          );
          return childItem;
        });

      // Render parents
      const dereferencedIdx = itemIdx.valueOf();
      const selected = dereferencedIdx == store.selectedMenuIdx;
      const expanded = store.menuState[root];
      const rootItem = (
        <RootItem key={parentIdx}>
          <Topic
            className="root"
            selected={selected}
            expanded={expanded}
            onClick={() => selectParent(root, dereferencedIdx)}
          >
            <Arrow expanded={expanded}>▶</Arrow>
            <RootName>{root}</RootName>
          </Topic>
          <ChildrenContainer expanded={expanded}>
            {renderChildren()}
          </ChildrenContainer>
        </RootItem>
      );
      itemIdx++;
      return rootItem;
    });
    return <div>{menu}</div>;
  };
  const menu = renderMenu();

  return <Wrapper>{menu}</Wrapper>;
});
