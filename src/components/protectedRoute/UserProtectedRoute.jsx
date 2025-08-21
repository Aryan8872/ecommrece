import { Navigate } from "react-router-dom";
import { useFirst } from "../../context/FirstContext";

const ProtectAuthRoute = ({ children }) => {
    const { isAuthenticated } = useFirst();

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default ProtectAuthRoute;
