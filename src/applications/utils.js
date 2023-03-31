import decode from "jwt-decode";

export const checkTokenValidity = (token) => {
    const expirationDate = decode(token).exp;
    const isExpired = expirationDate * 1000 < new Date().getTime();
    return isExpired;
};

export const isUserAdmin = (user) => {
    return user?.role?.includes("admin");
};

export const getUserInitials = (firstName, lastName) => {
    if (!firstName || !lastName) {
        return "";
    }
    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
    return initials.toUpperCase();
}