import { useState } from "react";
import styled from "styled-components";
import { MainDiv } from "../../style/CommonStyle";

const StudentSearch = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <MainDiv>
      <DropdownContainer>
        <DropdownButton isOpen={isOpen} onClick={toggleDropdown}>
            학생 검색하기
        </DropdownButton>
        <DropdownContent>
          {isOpen &&
            options.map((option, index) => (
              <DropdownItem key={index}>{option}</DropdownItem>
            ))}
        </DropdownContent>
      </DropdownContainer>
    </MainDiv>
  );
};

// Usage
const DropdownExample = () => {
  const options = ["Option 1", "Option 2", "Option 3"];

  return <StudentSearch options={options} />;
};

const Div = styled.div`
  width: 1050px;
  background: beige;
`;

// Styled components for the dropdown
const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.div`
  width: 1050px;
  height: 58px;
  box-sizing: border-box;
  line-height: 58px;
  display: flex;
  justify-content: space-between;
  padding-left: 34px;
  padding-right: 34px;
  margin-top: 60px;
  border-radius: 100px;
  border: 1px solid ${(props) => props.theme.colors.primary_normal};
  border-top-left-radius: ${(props) => (props.isOpen ? "10px" : "100px")};
  border-top-right-radius: ${(props) => (props.isOpen ? "10px" : "100px")};
  border-bottom-left-radius: ${(props) => (props.isOpen ? "0px" : "100px")};
  border-bottom-right-radius: ${(props) => (props.isOpen ? "0px" : "100px")};
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  width: 1050px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;

  ${DropdownContainer}:hover & {
    display: block;
  }

  border-top-left-radius: 0; /* Square top-left corner */
  border-top-right-radius: 0px; /* Rounded top-right corner */
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
export default DropdownExample;
