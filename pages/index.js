import styled from "styled-components";
import { useState, useEffect } from "react";
import React from "react";

const v2RegistryAdapterAddress = "0xE75E51566C5761896528B4698a88C92A54B3C954";
const Logo = styled.div`
  text-align: center;
  margin-top: 170px;
  color: #e6db74;
`;

export default function Home() {
  return (
    <Logo>
      <pre>
        __________________________/<div className="h">\\\_</div>_______/
        <div className="h">\\\\\\\\\_</div>
        ____________________________________________________/
        <div className="h">\\\\\\</div>_________________
      </pre>
      <pre>
        ________________________/<div className="h">\\\\\_</div>_____/
        <div className="h">\\\/</div>//////<div className="h">\\\_</div>
        _________________________________________________
        <div className="h">\/</div>///<div className="h">\\\</div>
        _________________
      </pre>
      <pre>
        ______________________/<div className="h">\\\/\\\_</div>____
        <div className="h">\/\\\_</div>____<div className="h">\/\\\_</div>
        ___________/<div className="h">\\\</div>
        _____________________________________<div className="h">\/\\\</div>
        _________________
      </pre>
      <pre>
        __/<div className="h">\\\_</div>___/<div className="h">\\\_</div>_____/
        <div className="h">\\\/\/\\\_</div>____
        <div className="h">\///\\\\\\\\\/</div>__________/
        <div className="h">\\\\\\\\\\\_</div>____/
        <div className="h">\\\\\_</div>_______<div className="h">/\\\\\_</div>
        ______<div className="h">\/\\\</div>_____/
        <div className="h">\\\\\\\\\\</div>_
      </pre>
      <pre>
        _<div className="h">\/</div>//<div className="h">\\\/\\\/</div>_____/
        <div className="h">\\\/</div>__<div className="h">\/\\\_</div>_____/
        <div className="h">\\\/</div>//////<div className="h">\\\_</div>_______
        <div className="h">\/</div>///<div className="h">\\\/</div>///____/
        <div className="h">\\\/</div>//<div className="h">\\\_</div>___/
        <div className="h">\\\/</div>//<div className="h">\\\_</div>____
        <div className="h">\/\\\</div>____<div className="h">\/\\\/</div>/////__
      </pre>
      <pre>
        ___<div className="h">\/</div>//<div className="h">\\\/</div>_____/
        <div className="h">\\\\\\\\\\\\\\\\</div>__/
        <div className="h">\\\_</div>_____<div className="h">\/</div>/
        <div className="h">\\\_</div>_________<div className="h">\/\\\_</div>
        ______/<div className="h">\\\_</div>_<div className="h">\/</div>/
        <div className="h">\\\_</div>_/<div className="h">\\\_</div>_
        <div className="h">\/</div>/<div className="h">\\\_</div>___
        <div className="h">\/\\\</div>____<div className="h">\/\\\\\\\\\\</div>_
      </pre>
      <pre>
        ____/<div className="h">\\\/\\\_</div>__<div className="h">\/</div>
        //////////<div className="h">\\\/</div>/__<div className="h">\/</div>/
        <div className="h">\\\_</div>_____/<div className="h">\\\_</div>
        __________<div className="h">\/\\\_</div>/<div className="h">\\</div>__
        <div className="h">\/</div>/<div className="h">\\\_</div>_/
        <div className="h">\\\_</div>_<div className="h">\/</div>/
        <div className="h">\\\_</div>_/<div className="h">\\\_</div>____
        <div className="h">\/\\\</div>____<div className="h">\/</div>///////
        <div className="h">\\\</div>_
      </pre>
      <pre>
        __/<div className="h">\\\/\/</div>//<div className="h">\\\_</div>
        __________<div className="h">\/\\\_</div>____<div className="h">\/</div>
        //<div className="h">\\\\\\\\\/</div>____/<div className="h">\\\_</div>
        ___<div className="h">\/</div>/<div className="h">\\\\\_</div>___
        <div className="h">\/</div>//<div className="h">\\\\\/</div>____
        <div className="h">\/</div>//<div className="h">\\\\\/_</div>___
        <div className="h">/\\\\\\\\\</div>__/
        <div className="h">\\\\\\\\\\</div>_
      </pre>
      <pre>
        _<div className="h">\/</div>//____<div className="h">\/</div>
        //____________<div className="h">\/</div>//________
        <div className="h">\/</div>////////_____<div className="h">\/</div>
        //______<div className="h">\/</div>////_______
        <div className="h">\/</div>////________<div className="h">\/</div>
        ////_____<div className="h">\/</div>////////__
        <div className="h">\/</div>/////////__
      </pre>
    </Logo>
  );
}
