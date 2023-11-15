import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
    const token = useSelector(selectCurrentToken);
    let isHead = false;
    let status = "Resident";

    if (token) {
        const decoded = jwtDecode(token);
        const { username, roles, id } = decoded.ResidentInfo;

        isHead = roles.includes("Head");

        if (isHead) status = "Head";

        return { username, roles, id, status, isHead };
    }

    return { username: "", id: "", roles: [], isHead, status };
};

export default useAuth;
