import decode from "jwt-decode";

export const checkTokenValidity = (token) => {
    const expirationDate = decode(token).exp;
    const isExpired = expirationDate * 1000 < new Date().getTime();
    return isExpired;
};

export const isUserAdmin = (user) => {
    return user?.role?.includes("admin");
}