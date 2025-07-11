"use client";

import {
  Form,
  FormGroup,
  FormItem,
  Label,
  Input,
  ComboBox,
  ComboBoxItem,
  Select,
  Option,
  Button,
} from "@ui5/webcomponents-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const formFields = [
  { name: "input", label: "Text Input", required: true, type: "Input" },
  {
    name: "select",
    label: "Select",
    required: true,
    type: "Select",
    options: [
      { value: undefined, label: "" },
      { value: "select1", label: "Select 1" },
      { value: "select2", label: "Select 2" },
      { value: "select3", label: "Select 3" },
    ],
  },
  {
    name: "combobox",
    label: "Combo Box",
    required: true,
    type: "ComboBox",
    options: [
      { value: undefined, label: "" },
      { value: "combo1", label: "Combo 1" },
      { value: "combo2", label: "Combo 2" },
      { value: "combo3", label: "Combo 3" },
    ],
  },
];

export default function ReactHookForm() {
  const [submittedData, setSubmittedData] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form data:", data);
    setSubmittedData(data);
  };

  const renderField = (field) => {
    const { name, type, required, options = [] } = field;
    const props = register(name, { required });
    const hasError = !!errors[name];
    const errorMessage =
      errors[name]?.message && typeof errors[name]?.message === "string"
        ? errors[name]?.message
        : "This field is required";

    console.log(errors[name]?.message);

    switch (type) {
      case "Select":
        return (
          <Select
            {...props}
            valueState={hasError ? "Negative" : undefined}
            valueStateMessage={
              hasError ? <span>{errorMessage}</span> : undefined
            }
          >
            {options.map(({ value, label }) => (
              <Option key={value ?? ""} value={value}>
                {label}
              </Option>
            ))}
          </Select>
        );
      case "ComboBox":
        return (
          <ComboBox
            {...props}
            valueState={hasError ? "Negative" : undefined}
            valueStateMessage={
              hasError ? <span>{errorMessage}</span> : undefined
            }
          >
            {options.map(({ value, label }) => (
              <ComboBoxItem key={value ?? ""} text={label} />
            ))}
          </ComboBox>
        );
      case "Input":
      default:
        return (
          <Input
            {...props}
            valueState={hasError ? "Negative" : undefined}
            valueStateMessage={
              hasError ? <span>{errorMessage}</span> : undefined
            }
          />
        );
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Form>
          <FormGroup headerText="Group 1">
            {formFields.map((field) => (
              <FormItem
                key={field.name}
                labelContent={<Label showColon>{field.label}</Label>}
              >
                {renderField(field)}
              </FormItem>
            ))}
          </FormGroup>
        </Form>
        <Button
          type="Submit"
          style={{
            width: "100%",
          }}
        >
          Submit
        </Button>
      </form>
      {submittedData && (
        <section style={{ marginBlockStart: "1rem" }}>
          <h3>Submitted Data</h3>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </section>
      )}
    </>
  );
}
