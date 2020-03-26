import React from "react";

export interface IValues {
  [key: string]: any;
}

export interface IFieldProps {
  name: string;
  label: string;
  type?: "text" | "email" | "select" | "textarea";
  options?: string[];
}

export interface IFormProps {
  defaultValue: IValues;
  validationRules : IValidationProp

}

export type Validator = (
  fieldName: string,
  values: IValues,
  args?: any
) => string;

export const required: Validator = (
  fieldName: string,
  values: IValues,
  args?: any
): string =>
  values[fieldName] === undefined ||
  values[fieldName] === null ||
  values[fieldName] === ""
    ? "This must be populated"
    : "";

export const minLength : Validator = (
  fieldName,
  values,
  length : number
) : string =>
  values[fieldName].length < length 
  ? `This must be atleast ${length} characters`
  : ""

interface IValidation {
  validator : Validator,
  arg ?: any
}

interface IValidationProp{
  [key : string] : IValidation | IValidation[]
}

export interface IForm extends React.FC<IFormProps> {
  Field: React.FC<IFieldProps>;
}

interface IState {
  values: IValues;
}

interface IFormContext extends IState {
  setValue?: (fieldName: string, value: any) => void;
}

const FormContext = React.createContext<IFormContext>({ values: {} });

const Form: IForm = props => {
  const [state, setState] = React.useState<IState>({
    values: { ...props.defaultValue }
  });

  const setValue = (fieldName: string, value: any) => {
    setState({ values: { ...state.values, [fieldName]: value } });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const context: IFormContext = { ...state, setValue };

  return (
    <FormContext.Provider value={context}>
      <form className="form" noValidate={true}>
        {props.children}
        <button onClick={handleSubmit}>submit</button>
      </form>
    </FormContext.Provider>
  );
};

const Field: React.FC<IFieldProps> = props => {
  const { name, label, type = "text", options } = props;
  const context = React.useContext(FormContext);
  const { values } = context;

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
    context: IFormContext
  ) => {
    if (context.setValue) {
      context.setValue(props.name, e.currentTarget.value);
    }
  };

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      {(type === "text" || type === "email") && (
        <input
          type={type.toLowerCase()}
          id={name}
          value={values[name]}
          onChange={e => handleChange(e, context)}
        />
      )}
      {type === "textarea" && (
        <textarea
          id={name}
          value={values[name]}
          onChange={e => handleChange(e, context)}
        />
      )}

      {type === "select" && (
        <select
          defaultValue={values[name]}
          onChange={e => handleChange(e, context)}
        >
          {options &&
            options.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
        </select>
      )}
    </div>
  );
};

Form.Field = Field;

export default Form;
