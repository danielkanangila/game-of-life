import React from "react";
import styled from "styled-components";

const Icon = ({ name }) => {
  return <Wrapper className="material-icons">{name}</Wrapper>;
};

const Wrapper = styled.span``;

export default Icon;
