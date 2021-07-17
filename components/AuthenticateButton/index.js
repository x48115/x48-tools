import React, { useState } from "react";
import styled from "styled-components";

import {
  useWebsocket,
  useAuthenticated,
} from "../../components/WebsocketProvider/hooks";
import {
  useAccount,
  useDisplayName,
} from "../../components/ConnectionProvider/hooks";
import Button from "../../components/Button";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0px;
`;

const StyledButton = styled(Button)`
  width: 200px;
`;

const AuthenticateButton = () => {
  const websocket = useWebsocket();
  const [connecting, setConnecting] = useState();
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
        websocket.send(
          JSON.stringify({
            action: "authenticate",
            payload: auth,
          })
        );
        setTimeout(() => setConnecting(true), 50);
      }
    );
  };

  return <StyledButton onClick={authenticate}>Authenticate</StyledButton>;
};

export default AuthenticateButton;
