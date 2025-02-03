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

| Prop        | Type                                                 | Description                                               |
| ----------- | ---------------------------------------------------- | --------------------------------------------------------- |
| `type`      | `string`                                             | The type of the button (e.g., `primary`, `secondary`).    |
| `htmlType`  | <code>"button" &#124; "submit" &#124; "reset"</code> | Specifies the HTML button type. Defaults to **"button"**. |
| `onClick`   | `function`                                           | Callback function when the button is clicked.             |
| `disabled`  | `boolean`                                            | Whether the button is disabled.                           |
| `className` | `string`                                             | Additional CSS class names for styling.                   |
| `children`  | `ReactNode`                                          | The content inside the button (e.g., text, icons).        |

---

# InputField

The **InputField** component is a reusable form input field that integrates with **React Hook Form** and **Ant Design**. It supports various input types, validation rules, and customization options.

## Example Usage

First, import `useForm` from **React Hook Form**:

```tsx
import { useForm } from "react-hook-form";
import { Button, InputField } from "../components"; // Adjust the import path as needed

const MyForm = () => {
  const {
    handleSubmit,
    control,
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
        rules={{ required: "Email is required" }}
        errors={errors}
        control={control}
      />
      <Button htmlType="submit">Submit</Button>
    </form>
  );
};
```

---

## Props

| Prop                   | Type                   | Description                                                                      |
| ---------------------- | ---------------------- | -------------------------------------------------------------------------------- |
| `name`                 | `string`               | **(Required)** The unique name of the input field.                               |
| `label`                | `string`               | **(Required)** The text label for the input field.                               |
| `type`                 | `string`               | Input type (e.g., `text`, `email`, `password`). Defaults to **"text"**.          |
| `defaultValue`         | `any`                  | The initial value of the input field.                                            |
| `rules`                | `RegisterOptions`      | Validation rules for **React Hook Form**.                                        |
| `control`              | `any`                  | **(Required)** React Hook Form's `control` function for controlled components.   |
| `register`             | `UseFormRegister<any>` | React Hook Form's `register` function (only applicable for uncontrolled inputs). |
| `errors`               | `any`                  | Object containing validation errors.                                             |
| `errorMessage`         | `string`               | Custom error message to display if validation fails.                             |
| `tag`                  | `string`               | HTML tag override for rendering custom elements.                                 |
| `selectOptions`        | `any`                  | Used when the input field is a **select dropdown**.                              |
| `options`              | `any`                  | Additional options (if applicable).                                              |
| `disabled`             | `boolean`              | If `true`, disables the input field.                                             |
| `spaceBetween`         | `boolean`              | If `true`, adds spacing between label and input.                                 |
| `decorator`            | `string`               | Used for adding extra styling elements.                                          |
| `children`             | `React.ReactNode`      | Any child elements inside the input field container.                             |
| `styles`               | `React.CSSProperties`  | Custom inline styles for the input field.                                        |
| `inputContainerStyles` | `string`               | Additional class names for the input's container.                                |

---

# InputField Variants

The **InputField** component supports multiple input types. Below are the different variants and how they look when rendered.

---

## **Standard Input**

A standard text input field for general text entry. This component supports various HTML input types and also provides built-in frontend validation for `number` and `email` fields.

```tsx
<InputField name="fullName" label="Name" type="text" control={control} />
<InputField name="age" label="Age" type="number" control={control} />
<InputField name="email" label="Email" type="email" control={control} />
<InputField name="dob" label="Date of Birth" type="date" control={control} />
```

### Rendered:

![Standard Input](/img/standard-input-types-MEOCONTINUITY.png)

---

## **Select Dropdown**

Provides a dropdown menu for selecting options.

```tsx
<InputField
  name="location"
  label="Select Location"
  type="select"
  selectOptions={[
    { label: "Call Center", value: "CallCenter" },
    { label: "Contract Manufacturer", value: "ContractManufacturer" },
    { label: "Data Center", value: "DataCenter" },
    { label: "External Location", value: "ExternalLocation" },
    {
      label: "Finished Goods Warehouse",
      value: "FinishedGoodsWarehouse",
    },
    { label: "Manufacturing", value: "Manufacturing" },
    { label: "Office", value: "Office" },
  ]}
  control={control}
/>
```

### Rendered:

![Select Input](/img/input-type-select-MEOCONTINUITY.png)

---

## **Text Area**

Used for multi-line text input.

```tsx
<InputField
  name="bio"
  label="Short Bio"
  type="textArea"
  control={control}
  className="max-w-150"
/>
```

### Rendered:

![Text Area Input](/img/input-type-text-area-MEOCONTINUITY.png)

---

## **Money Input**

Formats input as currency.

```tsx
<InputField name="salary" label="Salary" type="money" control={control} />
```

### Rendered:

![Money Input](/img/input-type-money-MEOCONTINUITY.png)

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

### Rendered:

![Boolean Input](/img/input-type-boolean-MEOCONTINUITY.png)

---

## **Link Input**

For entering and validating URLs.

```tsx
<InputField
  name="website"
  label="Website"
  type="link"
  control={control}
  errors={errors}
  className="max-w-[350px]"
/>
```

### Rendered:

![Link Input](/img/input-type-link-MEOCONTINUITY.png)

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

### Rendered:

![Percentage Input](/img/input-type-percentage-MEOCONTINUITY.png)

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

### Rendered:

![Time Input](/img/input-type-time-MEOCONTINUITY.png)

---

## Decorator

Especially useful for time inputs, this feature allows you to specify a unit in a clean and visually appealing way.

```tsx
<InputField
  name="meetingTime"
  label="Meeting Time"
  type="time"
  control={control}
  decorator="hours"
/>
```

### Rendered:

![Decorator](/img/input-type-decorator-MEOCONTINUITY.png)

---

## Error Handling

If validation fails, an error message will be displayed:

```tsx
<InputField
  name="name"
  label="Name"
  type="text"
  rules={{ required: true }}
  errors={errors}
  control={control}
/>
```

### Rendered:

![Validation](/img/input-validation-MEOCONTINUITY.png)

You can also provide a custom message:

```tsx
<InputField
  name="name"
  label="Name"
  type="text"
  rules={{ required: "Please fill out this field" }}
  errors={errors}
  control={control}
/>
```

### Rendered:

![Validation](/img/input-validation-custom-MEOCONTINUITY.png)

### Defining Validation Rules in React Hook Form

Rules are defined using the `rules` prop in **React Hook Form**, typically based on the `RegisterOptions` type from the `react-hook-form` library.

#### Basic Type Definition

```tsx
type RegisterOptions = {
  required?: boolean | string;
  minLength?: { value: number; message?: string };
  maxLength?: { value: number; message?: string };
  min?: { value: number; message?: string };
  max?: { value: number; message?: string };
  pattern?: { value: RegExp; message?: string };
  validate?:
    | { [key: string]: (value: any) => boolean | string }
    | ((value: any) => boolean | string);
};
```

#### Example Usage

When defining validation rules, you can use various options like:

```tsx
rules={{
  required: 'This field is required',
  minLength: { value: 4, message: 'Minimum 4 characters' },
  pattern: { value: /^[A-Za-z]+$/, message: 'Only letters allowed' },
  validate: {
    positive: (value) => value > 0 || 'Must be positive',
    lessThanTen: (value) => value < 10 || 'Must be less than 10'
  }
}}
```

This setup allows you to enforce multiple validation rules while providing user-friendly error messages. 🚀

---

This component is designed to work seamlessly with **React Hook Form**, ensuring proper form validation and state management. 🚀

## **Automated Form**

The `AutomatedForm` component dynamically generates a complete form based on a configuration file (`formFields.ts`). It utilizes the previously mentioned `InputField` component for rendering individual form fields. This approach ensures consistency and reusability while reducing manual form creation.

If a `currentRecord` is provided, the form fields will be pre-filled with the corresponding values, as long as they match the properties defined in the `formFields.ts` configuration.

Unlike the `StandaloneForm`, this component is primarily designed to be used within a table context. It focuses solely on rendering the form and handling submission or deletion events. The actual GraphQL operations (create, update, delete) are not managed by this component. Instead, it is typically utilized within a `Table` component, which will be detailed later.

### **Usage**

```tsx
<AutomatedForm fields={formFields} onSubmit={() => {}} />
```

### **Props**

| Prop            | Type                                                                                                                                                                                                                        | Description                                                  |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `fields`        | `{ label: string; key: string; type?: string; options?: { label: string; value: string }[]; tag?: string; defaultValue?: string \| number \| boolean; isRequired?: boolean; decoratorWord?: string; hidden?: boolean; }[]\` | Configuration for creating the form fields.                  |
| `editFields`    | Same as `fields`                                                                                                                                                                                                            | Fields specifically for edit mode.                           |
| `currentRecord` | `BaseRecord \| null`                                                                                                                                                                                                        | The currently selected record for editing.                   |
| `onSubmit`      | `SubmitHandler<any>`                                                                                                                                                                                                        | Callback function to handle form submission.                 |
| `onDelete`      | `() => void` (optional)                                                                                                                                                                                                     | Callback function to handle record deletion.                 |
| `canDelete`     | `boolean` (default: `true`)                                                                                                                                                                                                 | Determines whether the delete option is available.           |
| `isMatrix`      | `boolean` (default: `false`)                                                                                                                                                                                                | Indicates whether the form is used in a matrix-based layout. |
| `formInstance`  | `UseFormReturn<any>` (optional)                                                                                                                                                                                             | Provides an existing form instance if needed.                |

### **Example Configuration (`formFields.ts`)**

```tsx
export const formFields = [
  { label: "Full Name", key: "fullName", type: "text", isRequired: true },
  { label: "Age", key: "age", type: "number", isRequired: true },
  { label: "Email", key: "email", type: "email", isRequired: true },
  {
    label: "Meeting Time",
    key: "meetingTime",
    type: "time",
    decoratorWord: "hours",
  },
  {
    label: "Status",
    key: "status",
    type: "select",
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ],
  },
];
```

### **Rendered:**

![Automated Form](/img/automated-form-MEOCONTINUITY.png)

## **Standalone Form**

The `StandaloneForm` component builds upon the `AutomatedForm` by not only rendering a form but also managing GraphQL operations for creating, updating, and deleting records. It is independent of tables and can be used anywhere a self-contained form with backend integration is required.

### **Props**

| Prop            | Type                                                                                                                                                                                                                        | Description                                                  |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `fields`        | `{ label: string; key: string; type?: string; options?: { label: string; value: string }[]; tag?: string; defaultValue?: string \| number \| boolean; isRequired?: boolean; decoratorWord?: string; hidden?: boolean; }[]\` | Configuration for creating the form fields.                  |
| `editFields`    | Same as `fields`                                                                                                                                                                                                            | Fields specifically for edit mode.                           |
| `currentRecord` | `BaseRecord \| null`                                                                                                                                                                                                        | The currently selected record for editing.                   |
| `onSubmit`      | `SubmitHandler<any>`                                                                                                                                                                                                        | Callback function to handle form submission.                 |
| `onDelete`      | `() => void` (optional)                                                                                                                                                                                                     | Callback function to handle record deletion.                 |
| `canDelete`     | `boolean` (default: `true`)                                                                                                                                                                                                 | Determines whether the delete option is available.           |
| `isMatrix`      | `boolean` (default: `false`)                                                                                                                                                                                                | Indicates whether the form is used in a matrix-based layout. |
| `formInstance`  | `UseFormReturn<any>` (optional)                                                                                                                                                                                             |

### **Usage Example**

```tsx
export const formFields = [
  { label: "Full Name", key: "fullName", type: "text", isRequired: true },
  { label: "Age", key: "age", type: "number", isRequired: true },
  { label: "Email", key: "email", type: "email", isRequired: true },
  {
    label: "Meeting Time",
    key: "meetingTime",
    type: "time",
    decoratorWord: "hours",
  },
  {
    label: "Status",
    key: "status",
    type: "select",
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ],
  },
];

<StandaloneForm fields={formFields} />;
```

### **Rendered:**

![Automated Form](/img/automated-form-MEOCONTINUITY.png)

**Key Differences Between AutomatedForm and StandaloneForm:**

- AutomatedForm only renders a form and manages submit/delete events. It is mainly used within tables and it is integrated in the `Table` component.
- StandaloneForm extends AutomatedForm by handling GraphQL mutations (`createGQL`, `updateGQL`, `deleteGQL`).
- If a `currentRecord` is provided, both forms will be pre-filled based on the properties defined in formFields.ts.

## Modal

The `AntModal` component is a wrapper around Ant Design's `Modal` component, providing additional customization options like custom headers, body styling, and more. It is used to display a modal dialog with dynamic content.

### **Props:**

| Prop        | Type                              | Description                                   |
| ----------- | --------------------------------- | --------------------------------------------- |
| `openModal` | `boolean`                         | Controls whether the modal is open.           |
| `onCancel`  | `() => void`                      | Function to execute when the modal is closed. |
| `title`     | `string`                          | The title displayed in the modal header.      |
| `width`     | `number` (optional)               | The width of the modal (default: 650px).      |
| `height`    | `number` (optional)               | The height of the modal (default: 480px).     |
| `children`  | `React.ReactNode`                 | The content inside the modal.                 |
| `footer`    | `ModalProps['footer']` (optional) | Custom footer content (default: `null`).      |

### **Example Usage:**

```tsx
<AntModal
  openModal={isModalOpen}
  onCancel={() => setIsModalOpen(false)}
  title={`${currentRecord ? "Edit" : "Add"} Locations`}
>
  <StandaloneForm fields={formFields} currentRecord={currentRecord} />
</AntModal>
```

### Rendered:

![Modal Component](/img/modal-MEOCONTINUITY.png)

---

## Table

The `TableV3` component is one of the most critical components in the system, as a great extend of the system revolves around tables. This component is a **generic, powerful, and highly flexible table** that supports:

- **Normal tables**
- **Matrix-based structures**
- **CRUD operations with built-in GraphQL integration** (create, update, delete)
- **Searching**
- **Inline editing**
- **Excel-related functionalities**:
  - Exporting tables to Excel
  - Downloading templates
  - Uploading bulk data using templates

With `TableV3`, you can quickly create a fully functional **CRUD table** by simply passing the necessary props. This component leverages previously mentioned components such as:

- `AutomatedForm` (for handling forms within the table)
- `AntModal` (for displaying forms or confirmations)

Additionally, if you need to **extend basic actions like create, update, or delete**, `TableV3` provides customization options to include additional actions.

---

### **Props**

```tsx
type EditableOptionsType = {
  create?: boolean;
  update?: boolean;
  delete?: boolean;
};
```

| Prop                     | Type                                                                                      | Description                                                                |
| ------------------------ | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `title`                  | `string` (optional)                                                                       | Title of the table.                                                        |
| `data`                   | `any`                                                                                     | The dataset to be displayed in the table.                                  |
| `loading`                | `boolean` (optional)                                                                      | Whether the table is in a loading state.                                   |
| `columns`                | <code>ColumnsType&lt;any&gt;</code>                                                       | Column configuration for the table.                                        |
| `editable`               | `boolean` (default: false)                                                                | Enables inline editing in the table.                                       |
| `formFields`             | `any` (optional)                                                                          | Configuration for form fields used in row creation.                        |
| `editFormFields`         | `any` (optional)                                                                          | Configuration for form fields used in row editing.                         |
| `createGQL`              | `any` (optional)                                                                          | GraphQL mutation for creating a record.                                    |
| `updateGQL`              | `any` (optional)                                                                          | GraphQL mutation for updating a record.                                    |
| `deleteGQL`              | `any` (optional)                                                                          | GraphQL mutation for deleting a record.                                    |
| `summary`                | `any` (optional)                                                                          | Defines a summary row for the table.                                       |
| `modifyVariables`        | <code>(args: ModifyVariablesArgs) =&gt; GraphQLVariables</code>                           | Function to modify variables before sending GraphQL mutations.             |
| `extendActions`          | <code>(record?: any) =&gt; JSX.Element \| null</code>                                     | Custom actions beyond basic CRUD.                                          |
| `editableOptions`        | `EditableOptionsType`                                                                     | Defines which CRUD operations are available.                               |
| `forceSubmit`            | `boolean` (optional)                                                                      | Forces form submission externally.                                         |
| `forceSubmitRecordIndex` | <code>string \| null \| undefined</code>                                                  | Specifies which record to force submit.                                    |
| `customStyles`           | `string` (optional)                                                                       | Custom class names for styling.                                            |
| `useBorderedSection`     | `boolean` (default: true)                                                                 | Enables or disables bordered sections.                                     |
| `inlineEditing`          | `boolean` (default: false)                                                                | Enables inline editing in the table.                                       |
| `isMatrix`               | `boolean` (default: false)                                                                | Indicates if the table is matrix-based.                                    |
| `matrixConfig`           | `any` (optional)                                                                          | Configuration object for matrix-related features.                          |
| `isMitigation`           | `boolean` (optional)                                                                      | Indicates if mitigation logic should be applied.                           |
| `mitigatedLocations`     | `any` (optional)                                                                          | Data for mitigation locations.                                             |
| `matrixType`             | <code>'location' \| 'processAreas' \| 'processes' \| 'suppliers' \| 'applications'</code> | Defines the matrix type if applicable.                                     |
| `scroll`                 | <code>TableProps&lt;AnyObject&gt;['scroll']</code>                                        | Scroll settings for the table.                                             |
| `percentageValidation`   | `boolean` (optional)                                                                      | Enables validation for percentage inputs.                                  |
| `childrenColumnName`     | `string` (optional)                                                                       | Specifies the column name for nested child rows.                           |
| `rowkey`                 | `string` (optional)                                                                       | Defines a custom row key for children (**Ant Design** expects `children`). |
| `exportExcelColumns`     | `ExportColumn[]` (optional)                                                               | Configuration for exporting data to Excel.                                 |
| `templateColumns`        | `any[]` (optional)                                                                        | Defines the template structure for bulk data upload.                       |
| `templateUploadConfig`   | `any` (optional)                                                                          | Configuration for bulk data upload behavior.                               |
| `onRefresh`              | <code>() =&gt; void</code> (optional)                                                     | Callback function to refresh the table.                                    |
| `rowSelection`           | `any` (optional)                                                                          | Selection settings for rows.                                               |
| `selectedRows`           | `any` (optional)                                                                          | Stores selected rows.                                                      |
| `multiSelectComponent`   | `any` (optional)                                                                          | Custom component for multi-selection.                                      |
| `formInstance`           | <code>UseFormReturn&lt;any&gt;</code> (optional)                                          | Instance of React Hook Form for advanced form handling.                    |
| `extendOptions`          | <code>JSX.Element \| null</code> (optional)                                               | Additional options to extend table functionalities.                        |
| `tableSize`              | <code>'small' \| 'middle' \| 'large'</code> (optional)                                    | Defines the table size.                                                    |

---

## **Example Usage: Creating a Fully Functional CRUD Table**

The following example demonstrates how to set up a **Supplier Management Table** using `TableV3`. This example covers:

- **Fetching data from the Backend** using GraphQL queries.
- **Formatting data** to match the expected structure.
- **Defining table columns** with sorting and custom renderers.
- **Handling CRUD operations** via GraphQL mutations.
- **Integrating the table with GraphQL and React Hook Form**.

---

### **1. Fetching Data Using GraphQL**

We first define the **Supplier** type and use Apollo Client’s `useQuery` to fetch supplier data.

```tsx
type SupplierType = {
key: string;
approxAnualSpend: number;
availableAlternatives: string;
city: string;
country: string;
qualifiedAlternatives: string;
sourcingStatus: string \| null;
state: string;
street: string;
supplierAddress: string;
supplierName: string;
supplierRecoveryTime: number;
timeToReplaceSupplier: number;
uuid: string;
zipCode: string;
bcpUploaded: boolean;
bcpUpdatedAt: string;
};

const { data, loading, error } = useQuery<{
findAllSupplier: SupplierType[];
}>(FETCH_SUPPLIERS);

const formattedData: SupplierType[] = formatSupplierData(
data?.findAllSupplier ?? []
);
```

---

### **2. Defining GraphQL Mutations for CRUD Operations**

We define `create`, `update`, and `delete` mutations for managing suppliers, ensuring that data is **refetched** upon modification.

```tsx
const [createSupplier, { loading: createSupplierLoading }] = useMutation(
  CREATE_SUPPLIER,
  {
    refetchQueries: ["GetSuppliers"],
  }
);

const [editSupplier, { loading: editSupplierLoading }] = useMutation(
  EDIT_SUPPLIER,
  {
    refetchQueries: ["GetSuppliers"],
  }
);

const [deleteSupplier, { loading: deleteSupplierLoading }] = useMutation(
  DELETE_SUPPLIER,
  {
    refetchQueries: ["GetSuppliers"],
  }
);

const loadingStates =
  loading ||
  createSupplierLoading ||
  editSupplierLoading ||
  deleteSupplierLoading;
```

---

### **3. Data Structure Retrieved from Backend**

The API returns an array of supplier objects:

```tsx
[
{
"__typename": "Supplier",
"approxAnualSpend": 0,
"availableAlternatives": "2+",
"city": "",
"country": "USA",
"qualifiedAlternatives": "2+",
"sourcingStatus": "Multi-Sourced",
"state": "",
"street": "",
"supplierAddress": ", , , , USA",
"supplierName": "Advanced Machine",
"supplierRecoveryTime": 0,
"timeToReplaceSupplier": 0,
"uuid": "cm16us2qr00002bnkxyohdnj4",
"zipCode": "",
"bcpUpdatedAt": null,
"bcpUploaded": false
},
...
]
```

---

### **4. Defining Table Columns**

The `columns` configuration defines sorting behavior and custom renderers.

```tsx
const columns: TableColumnsType<SupplierType> = [
  {
    title: "Supplier",
    dataIndex: "supplierName",
    key: "supplierName",
    width: 200,
    align: "left",
    sorter: (a, b) =>
      tableSortingMethods.string(a.supplierName, b.supplierName),
    render: (text) => <span className="custom-table--column">{text}</span>,
  },
  {
    title: "Address",
    dataIndex: "supplierAddress",
    key: "supplierAddress",
    width: 150,
    align: "left",
    sorter: (a, b) =>
      tableSortingMethods.string(a.supplierAddress, b.supplierAddress),
    render: (text) => (
      <span className="custom-table--column">
        {removeEmptyCommas(text) || (
          <div className="placeholder-text text-sm">Address Not Provided</div>
        )}
      </span>
    ),
  },
  {
    title: (
      <div>
        Recovery Time
        <br />
        (months)
      </div>
    ),
    dataIndex: "supplierRecoveryTime",
    key: "supplierRecoveryTime",
    width: 100,
    align: "right",
    sorter: (a, b) =>
      tableSortingMethods.number(
        a.supplierRecoveryTime,
        b.supplierRecoveryTime
      ),
    render: (text) =>
      text !== undefined && text !== null ? (
        <div className="custom-table--column">{text}</div>
      ) : (
        <span className="placeholder-text text-sm">Not Provided</span>
      ),
  },
  {
    title: "Source Status",
    dataIndex: "sourcingStatus",
    key: "sourcingStatus",
    align: "center",
    width: 150,
    sorter: (a, b) =>
      tableSortingMethods.string(a.sourcingStatus, b.sourcingStatus),
    render: (text) => <span className="custom-table--column">{text}</span>,
  },
  {
    title: "Available Alternatives",
    dataIndex: "availableAlternatives",
    key: "availableAlternatives",
    width: 100,
    align: "right",
    sorter: (a, b) =>
      tableSortingMethods.number(
        Number(removePlusSignSuffix(a.availableAlternatives)),
        Number(removePlusSignSuffix(b.availableAlternatives))
      ),
    render: (text) => <span className="custom-table--column">{text}</span>,
  },
  {
    title: "Qualified Alternatives",
    dataIndex: "qualifiedAlternatives",
    key: "qualifiedAlternatives",
    width: 100,
    align: "right",
    sorter: (a, b) =>
      tableSortingMethods.number(
        Number(removePlusSignSuffix(a.qualifiedAlternatives)),
        Number(removePlusSignSuffix(b.qualifiedAlternatives))
      ),
    render: (text) => <span className="custom-table--column">{text}</span>,
  },
  {
    title: "Supplier BCP Added",
    dataIndex: "bcpUploaded",
    key: "bcpUploaded",
    width: 100,
    align: "center",
    sorter: (a, b) => tableSortingMethods.boolean(a.bcpUploaded, b.bcpUploaded),
    render: (text) => (
      <span className="custom-table--column">{text ? "Yes" : "No"}</span>
    ),
  },
];
```

---

### **5. Formatting Data for Backend**

To ensure the backend receives correctly formatted data, we implement a **formatter function**.

```tsx
const suppliersFormatter = (data: SupplierType) => {
  const approxAnualSpend = parseFloat(data?.approxAnualSpend?.toString());
  const supplierRecoveryTime = parseInt(data?.supplierRecoveryTime?.toString());
  const timeToReplaceSupplier = parseInt(
    data?.timeToReplaceSupplier?.toString()
  );
  const availableAlternatives = parseInt(data?.availableAlternatives);
  const qualifiedAlternatives = parseInt(data?.qualifiedAlternatives);

  const customData = {
    supplierName: data.supplierName,
    street: data.street,
    city: data.city,
    state: data.state,
    zipCode: data?.zipCode.toString(),
    country: data.country,
    sourcingStatus: startCase(data?.sourcingStatus ?? "")
      .split(" ")
      .join(""),
    approxAnualSpend: approxAnualSpend || 0,
    supplierRecoveryTime,
    timeToReplaceSupplier: timeToReplaceSupplier || 0,
    availableAlternatives: availableAlternatives || 0,
    qualifiedAlternatives: qualifiedAlternatives || 0,
  };

  return cleanUpObject(customData);
};

const modifyVariables = ({ values }: ModifyVariablesArgs) => {
  return suppliersFormatter(values);
};
```

---

### **6. Rendering the Table Component**

Finally, we pass everything into `TableV3` to create a **fully functional CRUD table**.

```tsx
<TableV3
  title="Suppliers"
  columns={columns}
  data={formattedData}
  loading={loadingStates}
  editable
  formFields={formFields}
  createGQL={createSupplier}
  updateGQL={editSupplier}
  deleteGQL={deleteSupplier}
  modifyVariables={modifyVariables}
/>
```

### Rendered Table:

![Table Component](/img/table-component-MEOCONTINUITY.png)

### Add Record Support:

![Table Component](/img/table-component-add-MEOCONTINUITY.png)

### Edit/Delete Record Support:

![Table Component](/img/table-component-edit-MEOCONTINUITY.png)

---

### **Key Features:**

- **Auto CRUD:** Define GraphQL mutations and get full CRUD operations out of the box.
- **Inline Editing:** Supports direct row editing without separate forms.
- **Matrix Support:** Allows rendering data in matrix-style tables.
- **Searching** Allows to search for an specifid record based on different columns content.
- **Excel Integration:**
  - **Export table data to Excel.**
  - **Download a structured template for bulk data input.**
  - **Upload an Excel file to populate table data automatically.**
- **Customization & Extensibility:**
  - Extend the default actions (create, update, delete).
  - Customize styles, row selections, and table behaviors.

---
