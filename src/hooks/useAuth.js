import { useSelector } from "react-redux";

export function useAuth(){
    const {email, password, username} = useSelector(state => state.user)

    return{
        isAuth: !!email,
        email,
        password,
        username
    }
}