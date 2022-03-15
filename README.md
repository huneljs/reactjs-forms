##Reactjs Forms
![](https://img.shields.io/github/v/release/huneljs/reactjs-forms)

[**Github**](https://github.com/huneljs/reactjs-forms "Github")
[**Demo**](https://codesandbox.io/s/admiring-brook-u0tx09 "Demo")
[**Discord**](https://discord.gg/BQffnte8 "Join Discord")

- [Reactjs Forms](#reactjs-forms)
- [Installation](#nstallation)
- [Guide](#guide)
  - [Extended Features](#extended-features)
  - [Primary Validations](#primary-validations)
  - [Custom Validations](#custom-validations)
  - [Extended Form Element and Multiple Select Element](#extended-form-element-and-multiple-select-element)
  - [Examples](#examples)
  
##Installation
`$ npm install reactjs-forms`

##Guide
reactjs-forms is a React package who contains a few  React components and hook system.
The components are almost the same as React syntactic form elements.So you can use all attributes which you can use on syntactic form elements on them.
### Extended Features
reactjs-forms contains Input,Select and Textarea components.that components have validation,customValidation,identity props.Validation prop is a PrimaryValidateObject typed object prop.Validation accepts an object which contains primary validations.(buit-in validations).CustomValidation accepts a function is that retuns object.That object has msg and result props.Msg is used to send a msg to ValidationResultObject  whenever  custom validation result is false.
###Primary Validations
|   descriptor | is value forced  | explanation | 
| ------------ | ------------ | ------------ |
|  required  |   No  |  value  cannot be empty  or undefined
| isEmail    |  No  |  value must be email address format
|  isAlpha  | No  | value must contain unicode letters
| isNumeric  |  No  | value can be numbers
|  isAlphaNumeric  | No  | value must contain letters and numbers
|  maxLen  | Yes   |  value must contain fewer characters than {{value}}
|  minLen  | Yes   |  value must contain more characters than {{value}}
|  max  |   Yes | value must be numeric that lower than {{value}}
|  min  |   Yes | value must be numeric that greater than {{value}}
*Primary validations are under development.You can help me to declare new features so you can be collaborator.Additionally you can access primary validation list under core/pipelines.ts*

###Custom Validations
You may declare custom validations.Custom validations accpet function with 2 parameters value and identity and returns an object that has result and msg props.
we have given an example see **Example - 2**

###Extended Form Element and Multiple Select Element
- Form element has validation results in submit handler via **e.currentTarget.validation**
- Primitive React Syntactic select elements cannot set values as array.You have to make an effort to get all selected options from HTMLSelectAttibutes but you don't need it when using reactjs-forms Select Component.So you can access all selected option values via **e.target.values** see **Example - 2**

### Examples
we have to wrap React compoents  with FormValidation Component that contains base context provider  
```jsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import FormValidation from "reactjs-forms";

ReactDOM.render(
    <FormValidation>
      <App />
    </FormValidation>,
  document.getElementById("root")
);
```
Or if you develope under NextJS;
*_app.jsx;*

###### Example - 1
```jsx
import type { AppProps } from "next/app";
import FormValidation from "reactjs-forms";

function MyApp({ Component, pageProps }) {
  return (
    <FormValidation>
      <Component {...pageProps} />
    </FormValidation>
  );
}

export default MyApp;
```
*any component;*
```jsx
import { useMemo, useState } from "react";
import { Form, Input, Textarea, useFormValidation } from "reactjs-forms";

const App = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});

  const validation = useFormValidation();
  const validationForAddress = useFormValidation("address"); // //you may send args to get only specific inputs errors

  const emailErrors = useMemo(
    () =>
      errors.email ? errors.email.map((v, i) => <li key={i}>{v.msg}</li>) : [],
    [errors]
  );

  const nameErrors = useMemo(
    () =>
      errors.name ? errors.name.map((v, i) => <li key={i}>{v.msg}</li>) : [],
    [errors]
  );

  const addressErrors = useMemo(
    () =>
      errors.address
        ? errors.address.map((v, i) => <li key={i}>{v.msg}</li>)
        : [],
    [errors]
  );

  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e.currentTarget.validation); //we have accessed to the validation results via submit event currentTarget
          setErrors(validation()); //get validation errors and set errors state for rendering
        }}
      >
        <label htmlFor="name">Email:</label>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          value={email} //we have to declare value attribute
          identity="email" //also we have to declare identity attribute because of that value is used to get validation results
          id="email"
          validation={{
            required: true,
            isEmail: true,
          }}
        />
        <br />
        {/* list all email erros*/}
        <ul>{emailErrors}</ul>
        <label htmlFor="name">Name:</label>
        <Input
          onChange={(e) => setName(e.target.value)}
          value={name}
          identity="name"
          id="name"
          validation={{
            isAlpha: {
              msg: "custom message", //you may or not declare a custom message
              value: true, //you dont have to declare value also
            },
          }}
        />
        {/* list all name erros*/}
        <ul>{nameErrors}</ul>
        <br />
        <label htmlFor="">Address:</label>
        <Textarea
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          identity="address"
          id="address"
          validation={{
            required: true,
          }}
          onBlur={() => {
            validationForAddress();
          }}
        />
        <ul>{addressErrors}</ul>
        <button>Send</button>
      </Form>
    </div>
  );
};

export default App;

```
###### Example - 2
In this example we will create a custom validator and also we will use a select form element with multiple selected attribute

```jsx
import { useMemo, useState } from "react";
import { Form, Input, Select, useFormValidation } from "reactjs-forms";

const Other = () => {
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [jobs, setJobs] = useState([]);
  const [errors, setErrors] = useState({});

  const validation = useFormValidation();

  const passwordErrors = useMemo(
    () =>
      errors.password
        ? errors.password.map((v, i) => <li key={i}>{v.msg}</li>)
        : [],
    [errors]
  );

  const passwordRepeatErrors = useMemo(
    () =>
      errors.passwordRepeat
        ? errors.passwordRepeat.map((v, i) => <li key={i}>{v.msg}</li>)
        : [],
    [errors]
  );

  const jobsErrors = useMemo(
    () =>
      errors.jobs ? errors.jobs.map((v, i) => <li key={i}>{v.msg}</li>) : [],
    [errors]
  );

  //we have created a custom validator function
  function isEqulPasswords(password) {
    return function (value, identity) {
      return {
        msg: "passwords dont match",
        result: password === value,
      };
    };
  }

  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          setErrors(validation());
        }}
      >
        <label htmlFor="password">Password:</label>
        <Input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          identity="password"
          id="password"
          validation={{
            required: true,
          }}
        />
        <br />
        <ul>{passwordErrors}</ul>
        <label htmlFor="password-repeat">Password-Repeat:</label>
        <Input
          onChange={(e) => setPasswordRepeat(e.target.value)}
          value={passwordRepeat}
          type="password"
          identity="passwordRepeat"
          id="passwordRepeat"
          validation={{
            required: true,
          }}
          customValidation={{
            isEqulPasswords: isEqulPasswords(password),
          }}
        />
        <br />
        <ul>{passwordRepeatErrors}</ul>
        <label htmlFor="name">Job:</label>
        <Select
          onChange={(e) => {
            setJobs(e.target.values); //we have accessed directly all the selected values and we have set jobs state
          }}
          identity="jobs"
          multiple
          value={jobs}
          validation={{
            isAlpha: true,
          }}
        >
          <option value="1">Fornt-end Developer</option>
          <option value="2">Back-end Developer</option>
          <option value="3">Pixel Artist</option>
          <option value="4">UX Designer</option>
        </Select>
        <ul>{jobsErrors}</ul>
        <button>Send</button>
      </Form>
    </div>
  );
};

export default Other;

```

Finally,if you want to ask any question you can join our [Discord](https://discord.gg/BQffnte8 "Discord") channel.
Also you can be contributor.