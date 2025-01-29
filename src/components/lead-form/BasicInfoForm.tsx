import React from "react";
import { JsonForms } from "@jsonforms/react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import { JsonFormsCore } from "@jsonforms/core";
import { leadFormSchema, uiSchema, LeadFormData } from "./types";

interface BasicInfoFormProps {
  data: Partial<LeadFormData>;
  showValidation: boolean;
  onChange: (state: Pick<JsonFormsCore, "data" | "errors">) => void;
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({
  data,
  showValidation,
  onChange,
}) => {
  return (
    <JsonForms
      schema={leadFormSchema}
      uischema={uiSchema}
      data={data}
      renderers={materialRenderers}
      cells={materialCells}
      onChange={onChange}
      validationMode={showValidation ? "ValidateAndShow" : "NoValidation"}
    />
  );
};

export default BasicInfoForm;
