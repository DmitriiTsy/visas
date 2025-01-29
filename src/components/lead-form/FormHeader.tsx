import React from "react";
import { BiCube } from "react-icons/bi";
import {
  IconHeaderContainer,
  Icon,
  SectionHeader,
  SectionDescription,
} from "./styles";

const FormHeader: React.FC = () => {
  return (
    <>
      <IconHeaderContainer>
        <Icon>
          <BiCube size={40} />
        </Icon>
        <SectionHeader>Want to understand your visa options?</SectionHeader>
      </IconHeaderContainer>
      <SectionDescription>
        Submit the form below and our team of experienced attorneys will review
        your information and send a preliminary assessment of your case based on
        your goals
      </SectionDescription>
    </>
  );
};

export default FormHeader;
