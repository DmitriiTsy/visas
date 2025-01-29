export interface LeadFormData {
  firstName: string;
  lastName: string;
  email: string;
  countryOfResidence: string;
  linkedin: string;
  visaCategories: string[];
  additionalInfo: string;
  resume: string | null;
}

export interface FormErrors {
  visaCategories?: string;
  helpText?: string;
  resume?: string;
}

export const leadFormSchema = {
  type: "object",
  properties: {
    firstName: {
      type: "string",
      minLength: 1,
      title: "First Name",
    },
    lastName: {
      type: "string",
      minLength: 1,
      title: "Last Name",
    },
    email: {
      type: "string",
      format: "email",
      title: "Email",
    },
    countryOfResidence: {
      type: "string",
      minLength: 1,
      title: "Country of Residence",
    },
  },
  required: ["firstName", "lastName", "email", "countryOfResidence"],
};

export const uiSchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/firstName",
    },
    {
      type: "Control",
      scope: "#/properties/lastName",
    },
    {
      type: "Control",
      scope: "#/properties/email",
    },
    {
      type: "Control",
      scope: "#/properties/countryOfResidence",
    },
  ],
};
