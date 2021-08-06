import React, { useState } from "react";
import styled from "styled-components";

import { useAuthenticated } from "../../components/WebsocketProvider/hooks";
import { useStore } from "../../components/StoreProvider/hooks";
import {
  useAccount,
  useDisplayName,
} from "../../components/ConnectionProvider/hooks";
import Button from "../../components/Button";

const StyledButton = styled(Button)`
  width: 200px;
`;

const AuthenticateButton = ({ className }) => {
  const store = useStore();
  const websocket = store.websocket;
  const displayName = useDisplayName();
  const authenticated = useAuthenticated();
  const account = useAccount();

  const authenticate = async () => {
    const msgParams = [
      {
        type: "string",
        name: "Log in as",
        value: displayName,
      },
    ];

    var params = [msgParams, account];
    console.dir(params);
    var method = "eth_signTypedData";
    window.web3.currentProvider.sendAsync(
      {
        method,
        params,
        from: account,
      },
      function (err, result) {
        if (err) return console.dir(err);
        if (result.error) {
          alert(result.error.message);
        }
        if (result.error) return console.error(result);

        const sig = result.result;
        const auth = {
          data: msgParams,
          sig,
        };
        websocket.sendMessage({
          action: "authenticate",
          payload: auth,
        });
      }
    );
  };

  return (
    <StyledButton className={className} onClick={authenticate}>
      Sign
    </StyledButton>
  );
};

export default AuthenticateButton;
