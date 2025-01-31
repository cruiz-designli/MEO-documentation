---
sidebar_position: 3
---

# Components

This section provides an overview of the key UI components used in the frontend.

## Button

The **Button** component is a reusable UI element for triggering actions. It can be customized with different styles, sizes, and types (e.g., primary, secondary).

### Example

```jsx
<Button type="primary">Save</Button>
<Button type="secondary">Visit</Button>
```

---

## Primary Button

### Normal State

![Primary Button - Normal](/img/button-primary-MEOCONTINUITY.png)

### Hover State

![Primary Button - Hover](/img/button-primary-hover-MEOCONTINUITY.png)

---

## Secondary Button

### Normal State

![Secondary Button - Normal](/img/button-secondary-MEOCONTINUITY.png)

### Hover State

![Secondary Button - Hover](/img/button-secondary-hover-MEOCONTINUITY.png)

---

## Props

| Prop        | Type        | Description                                            |
| ----------- | ----------- | ------------------------------------------------------ |
| `type`      | `string`    | The type of the button (e.g., `primary`, `secondary`). |
| `onClick`   | `function`  | Callback function when the button is clicked.          |
| `disabled`  | `boolean`   | Whether the button is disabled.                        |
| `className` | `string`    | Additional CSS class names for styling.                |
| `children`  | `ReactNode` | The content inside the button (e.g., text, icons).     |

---

# InputField

The **InputField** component is a reusable form input field that integrates with **React Hook Form** and **Ant Design**. It supports various input types, validation rules, and customization options.

## Example Usage

First, import `useForm` from **React Hook Form**:

```tsx
import { useForm } from "react-hook-form";
import InputField from "./InputField"; // Adjust the import path as needed

const MyForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        name="email"
        label="Email Address"
        type="email"
        defaultValue=""
        rules={{ required: "Email is required" }}
        errors={errors}
        control={control}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
```

---

## Props

| Prop                   | Type                   | Description                                                                |
| ---------------------- | ---------------------- | -------------------------------------------------------------------------- |
| `name`                 | `string`               | **(Required)** The unique name of the input field.                         |
| `type`                 | `string`               | Input type (e.g., `text`, `email`, `password`). Defaults to **"text"**.    |
| `defaultValue`         | `any`                  | The initial value of the input field.                                      |
| `rules`                | `any`                  | Validation rules for **React Hook Form**.                                  |
| `label`                | `string`               | The text label for the input field.                                        |
| `options`              | `any`                  | Additional options (if applicable).                                        |
| `errors`               | `any`                  | Object containing validation errors.                                       |
| `styles`               | `React.CSSProperties`  | Custom inline styles for the input field.                                  |
| `register`             | `UseFormRegister<any>` | **(Required)** React Hook Form's `register` function for input validation. |
| `control`              | `any`                  | Controller object for controlled components.                               |
| `errorMessage`         | `string`               | Custom error message to display if validation fails.                       |
| `tag`                  | `string`               | HTML tag override for rendering custom elements.                           |
| `selectOptions`        | `any`                  | Used when the input field is a **select dropdown**.                        |
| `inputContainerStyles` | `string`               | Additional class names for the input's container.                          |
| `children`             | `React.ReactNode`      | Any child elements inside the input field container.                       |
| `spaceBetween`         | `boolean`              | If `true`, adds spacing between label and input.                           |
| `disabled`             | `boolean`              | If `true`, disables the input field.                                       |
| `decorator`            | `string`               | Used for adding extra styling elements.                                    |

---

# InputField Variants

The **InputField** component supports multiple input types. Below are the different variants and how they look when rendered.

---

## **Text Input**

A standard text input field for general text entry.

```tsx
<InputField name="fullName" label="Name" type="text" control={control} />
```

### Rendered:

![Text Input](/img/input-type-text-MEOCONTINUITY.png)

---

## **Number Input**

Accepts only numeric values.

```tsx
<InputField name="age" label="Age" type="number" control={control} />
```

<!-- ### Rendered:

![Number Input](/img/input-number.png) -->

---

## **Email Input**

Used for entering email addresses with built-in validation.

```tsx
<InputField name="email" label="Email" type="email" control={control} />
```

<!-- ### Rendered:

![Email Input](/img/input-email.png) -->

---

## **Date Input**

Allows users to select a date.

```tsx
<InputField name="dob" label="Date of Birth" type="date" control={control} />
```

<!-- ### Rendered:

![Date Input](/img/input-date.png) -->

---

## **Select Dropdown**

Provides a dropdown menu for selecting options.

```tsx
<InputField
  name="country"
  label="Select Country"
  type="select"
  selectOptions={[
    { label: "USA", value: "us" },
    { label: "Canada", value: "ca" },
  ]}
  control={control}
/>
```

<!-- ### Rendered:

![Select Input](/img/input-select.png) -->

---

## **Text Area**

Used for multi-line text input.

```tsx
<InputField name="bio" label="Short Bio" type="text_area" control={control} />
```

<!-- ### Rendered:

![Text Area Input](/img/input-textarea.png) -->

---

## **Money Input**

Formats input as currency.

```tsx
<InputField name="salary" label="Salary" type="money" control={control} />
```

<!-- ### Rendered:

![Money Input](/img/input-money.png) -->

---

## **Phone Input**

Accepts phone numbers.

```tsx
<InputField name="phone" label="Phone Number" type="phone" control={control} />
```

<!-- ### Rendered:

![Phone Input](/img/input-phone.png) -->

---

## **Boolean (Checkbox)**

Renders a checkbox for true/false values.

```tsx
<InputField
  name="subscribe"
  label="Subscribe to newsletter"
  type="boolean"
  control={control}
/>
```

<!-- ### Rendered:

![Boolean Input](/img/input-boolean.png) -->

---

## **Link Input**

For entering and validating URLs.

```tsx
<InputField name="website" label="Website" type="link" control={control} />
```

<!-- ### Rendered:

![Link Input](/img/input-link.png) -->

---

## **Percentage Input**

Formats the input as a percentage.

```tsx
<InputField
  name="taxRate"
  label="Tax Rate"
  type="percentage"
  control={control}
/>
```

<!-- ### Rendered:

![Percentage Input](/img/input-percentage.png) -->

---

## **Time Input**

Allows users to select a time.

```tsx
<InputField
  name="meetingTime"
  label="Meeting Time"
  type="time"
  control={control}
/>
```

<!-- ### Rendered:

![Time Input](/img/input-time.png) -->

---

## Error Handling

If validation fails, an error message will be displayed:

```tsx
<InputField
  name="email"
  label="Email"
  type="email"
  rules={{ required: "Email is required" }}
  errors={errors}
  control={control}
/>
```

---

This component is designed to work seamlessly with **React Hook Form**, ensuring proper form validation and state management. 🚀

## Modal

The **Modal** component is used for displaying pop-up dialog windows. It is useful for confirming actions, collecting input, or showing additional information without navigating away from the current screen.

### Example

```tsx
<Modal title="Add Locations" visible={visible} onCancel={handleClose}>
  <p>Please select the locations you want to add.</p>
  <Button onClick={handleConfirm}>Confirm</Button>
  <Button onClick={handleClose}>Cancel</Button>
</Modal>
```

### Rendered:

![Modal Component](/img/modal-MEOCONTINUITY.png)

---

### Props

| Prop       | Type        | Description                                 |
| ---------- | ----------- | ------------------------------------------- |
| `title`    | `string`    | The title of the modal window.              |
| `visible`  | `boolean`   | Whether the modal is visible or hidden.     |
| `onCancel` | `function`  | Callback function when the modal is closed. |
| `footer`   | `ReactNode` | Custom footer content for the modal.        |

## Table

The **Table** component is used for displaying tabular data. It supports sorting, pagination, and customizable columns.

### Example

```jsx
<Table columns={columns} dataSource={data} />
```

### Props

| Prop         | Type      | Description                                       |
| ------------ | --------- | ------------------------------------------------- |
| `columns`    | `array`   | The column configuration (headers and rendering). |
| `dataSource` | `array`   | The data to be displayed in the table.            |
| `pagination` | `boolean` | Whether pagination controls are shown.            |
