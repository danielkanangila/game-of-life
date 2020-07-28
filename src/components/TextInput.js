import React from "react";
import styled from "styled-components";
import { useTheme } from "../hooks/useTheme";

const TextInput = ({ handleChange, label, ...rest }) => {
  const theme = useTheme();

  return (
    <Wrapper theme={theme}>
      <label>{label}</label>
      <input {...rest} onChange={handleChange} placeholder={label} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  ${({ theme }) => `color: ${theme.borderColor}`};
  label {
    display: block;
    font-size: 0.8rem;
    width: 25%;
  }
  input {
    padding: 2px 10px;
    font-size: 0.8rem;
    ${({ theme }) => `border 2px solid ${theme.borderColor}`};
    border-radius: 4px;
    width: 60%;
    ${({ theme }) => `color: ${theme.borderColor}`};
    margin-left: 10px;
    transition: all 0.3s;
    &:focus {
      border-color: #0c7abf;
    }
  }
`;

export default TextInput;
