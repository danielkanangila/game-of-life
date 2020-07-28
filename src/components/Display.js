import React from "react";
import styled from "styled-components";

const Display = ({ generations }) => {
  return (
    <Wrapper className="gen-display">
      <span>Generations</span>
      <span>{generations}</span>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Display;
