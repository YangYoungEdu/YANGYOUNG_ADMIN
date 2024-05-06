import React, { useState } from "react";
import styled from "styled-components";

// Styled components for the dropdown
const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  font-size: 16px;
  border: none;
  cursor: pointer;

  /* Apply rounded corners only to the top-left and top-right when isOpen is true */
  border-top-left-radius: ${props => (props.isOpen ? "10px" : "0")};
  border-top-right-radius: ${props => (props.isOpen ? "10px" : "0")};
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;

  ${DropdownContainer}:hover & {
    display: block;
  }

  border-top-left-radius: 0; /* Square top-left corner */
  border-top-right-radius: 10px; /* Rounded top-right corner */
  border-bottom-right-radius: 10px; /* Rounded bottom-right corner */
  border-bottom-left-radius: 10px; /* Rounded bottom-left corner */
`;

const DropdownItem = styled.div`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;

  &:hover {
    background-color: #f1f1f1;
  }
`;

// Dropdown component
const Dropdown = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <DropdownContainer>
      <DropdownButton isOpen={isOpen} onClick={toggleDropdown}>
        {isOpen ? "Close" : "Open"} Dropdown
      </DropdownButton>
      <DropdownContent>
        {isOpen &&
          options.map((option, index) => (
            <DropdownItem key={index}>{option}</DropdownItem>
          ))}
      </DropdownContent>
    </DropdownContainer>
  );
};

// Usage
const DropdownExample = () => {
  const options = ["Option 1", "Option 2", "Option 3"];

  return <Dropdown options={options} />;
};

export default DropdownExample;
