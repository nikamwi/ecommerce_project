import { CircularProgress } from "@mui/material"

const Loading = () => {
    return <CircularProgress/>;
};

export const LoadingWrapper = ({isLoading, children}) => {
    if (isLoading) {
        return <Loading />;
    }
    return children;
};