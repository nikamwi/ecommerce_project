import { useState } from "react";

export const useForm = ({ defaultFormValues }) => {
    const [formValues, setFormValues] = useState(defaultFormValues);
    const onInputChange = (e) => {
        const inputName = e.target.name;
        const { validateInput } = formValues[inputName];
        setFormValues((prevFormValues) => {
            return {
                ...prevFormValues,
                [inputName] : {
                    ...prevFormValues[inputName],
                    value: e.target.value,
                    error: validateInput ? validateInput(e.target.value) : "",
                },
            };
        });
    };

    const checkButtonDisable = (values) => {
        for (const [key, objValue] of Object.entries(values)) {
            if (objValue.required && (objValue.error || !objValue.value)) {
                return true;
            }
        }
    };

    const clearForm = (obj) => {
        setFormValues(obj);
    };

    return {
        formValues,
        setFormValues,
        onInputChange,
        clearForm,
        checkButtonDisable,
    };
};