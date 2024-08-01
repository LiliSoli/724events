import { fireEvent, render, screen } from "@testing-library/react";
import Field, { FIELD_TYPES } from "./index";

describe("When a field is created", () => {
  it("a name is set on the field", () => {
    render(<Field name="field-name" />);
    const fieldElement = screen.getByTestId("field-name");
    expect(fieldElement).toBeInTheDocument();
    expect(fieldElement.name).toEqual("field-name");
  });

  it("a placeholder is set on the field", () => {
    render(<Field placeholder="field-placeholder" name="field-placeholder" />);
    const fieldElement = screen.getByTestId("field-placeholder");
    expect(fieldElement.placeholder).toEqual("field-placeholder"); 
  });

  it("a label is set with field", () => {
    render(<Field placeholder="field-placeholder" label="field_label" name="test" />);
    const labelElement = screen.getByText(/field_label/);
    expect(labelElement).toBeInTheDocument();
  });

  describe("and its valued changed", () => {
    it("a onChange value is executed", () => {
      const onChange = jest.fn();
      render(<Field onChange={onChange} name="field-onchange" />);
      const fieldElement = screen.getByTestId("field-onchange");
      fireEvent(
        fieldElement,
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        })
      );
    });
  });

  describe("and its type is set to FIELD_TYPES.INPUT_TEXT", () => {
    it("a text input is rendered", () => {
      window.console.error = jest.fn().mockImplementation(() => null);
      render(<Field type={FIELD_TYPES.INPUT_TEXT} name="field-input-text" />);
      const fieldElement = screen.getByTestId("field-input-text");
      expect(fieldElement.type).toEqual("text");
    });
  });

  describe("and its type is set to FIELD_TYPES.TEXTAREA", () => {
    it("a textarea is rendered", () => {
      window.console.error = jest.fn().mockImplementation(() => null); 
      render(<Field type={FIELD_TYPES.TEXTAREA} name="field-textarea" />);
      const fieldElement = screen.getByTestId("field-textarea");
      expect(fieldElement.tagName).toEqual("TEXTAREA");
    });
  });

  describe("and its type is set to a wrong value", () => {
    it("a text input is rendered", () => {
      window.console.error = jest.fn().mockImplementation(() => null); 
      render(<Field type="wrong-type" name="field-wrong-type" />);
      const fieldElement = screen.getByTestId("field-wrong-type");
      expect(fieldElement.type).toEqual("text");
    });
  });
});
