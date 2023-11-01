import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
    const token = useSelector(selectCurrentToken);
    let isHead = false;
    let status = "Resident";

    console.log("useAuth");
    if (token) {
        const decoded = jwtDecode(token);
        const { username, roles, residentId } = decoded.ResidentInfo;

        isHead = roles.includes("Head");

        if (isHead) status = "Head";

        return { username, roles, status, isHead, residentId };
    }

    return { username: "", roles: [], isHead, status };
};

export default useAuth;
