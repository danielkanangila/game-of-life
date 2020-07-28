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

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 80%;
  left: 10%;
  height: 50px;

  @media (min-width: 750px) {
    width: 30%;
    left: 35%;
  }
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#45484d+0,000000+100;Black+3D+%231 */
  background: #45484d; /* Old browsers */
  background: -moz-linear-gradient(
    top,
    #45484d 0%,
    #000000 100%
  ); /* FF3.6-15 */
  background: -webkit-linear-gradient(
    top,
    #45484d 0%,
    #000000 100%
  ); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(
    to bottom,
    #45484d 0%,
    #000000 100%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#45484d', endColorstr='#000000',GradientType=0 ); /* IE6-9 */

  display: flex;
  align-items: center;
  span {
    text-transform: uppercase;
    padding: 18px 20px;
    color: #fff;
    height: 100%;
    &:nth-child(1) {
      font-size: 0.8rem;
      font-weight: bold;
      border-right: 1px solid #f1f1f1;
    }
    &:nth-child(2) {
      text-align: center;
      width: 100%;
    }
  }
`;

export default Display;
