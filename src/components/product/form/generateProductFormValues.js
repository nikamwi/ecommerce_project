export const generateProductFormValues = (selectedProduct) => {
    return {
        name: {
            value: selectedProduct?.name || "",
            required: true,
            error: "",
            validateInput: (name) =>
            name.length > 1 ? null : "name should have at last 2 character",
        },
        description: {
            value: selectedProduct?.description || "",
            required: true,
            error: "",
            validateInput: (description) =>
            description.length > 1 ? null : "description should have at last 2 character",
        },
        category: {
            value: selectedProduct?.category || "",
            required: true,
            error: "",
            validateInput: (category) =>
            category.length > 1 ? null : "category should have at last 2 character",
        },
        brand: {
            value: selectedProduct?.brand || "",
            required: true,
            error: "",
            validateInput: (brand) =>
            brand.length > 1 ? null : "brand should have at last 2 character",
        },
        price: {
            value: selectedProduct?.price || "",
            required: true,
            error: "",
            validateInput: (price) =>
            price > 0 ? null : "price should be positive number",
        },
    };
};