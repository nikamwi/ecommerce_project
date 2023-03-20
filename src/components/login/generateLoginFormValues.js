export const generateLoginFormValues = () => {
    return {
        email: {
            value: "",
            required: true,
            error: null,
            validateInput: (email) =>
            email.includes("@gmail.com") ? null : "email is not valid",
        },
        password: {
            value: "",
            required: true,
            error: null,
            validateInput: (password) =>
            password.length > 6 ? null : "password should have at last 6 character",
        },
    };
};