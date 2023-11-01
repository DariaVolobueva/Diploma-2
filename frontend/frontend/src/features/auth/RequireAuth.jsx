import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation();
    const { roles } = useAuth();
    console.log(roles);

    const t = roles.some((role) => {
        allowedRoles.includes(role);
        console.log(`Current role: ${role}`);
    });
    console.log(t);

    const content = roles.some((role) => allowedRoles.includes(role)) ? (
        <Outlet></Outlet>
    ) : (
        // <Navigate to="/login" state={{ from: location }} replace></Navigate>
        console.log("redirect")
    );

    return content;
};

export default RequireAuth;
