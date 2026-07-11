import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

import api from "../api"

interface LoginBody {
    username :string;
    password:string;

}

interface AuthResponse {
    token : string;
}

const Login =  () => {
    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const handleLogin = async (e:React.FormEvent) => {
        e.preventDefault;
        setLoading(true)
        const body : LoginBody = {username, password}
        try {
            const response = await api.post<AuthResponse>("/auth/login", body)
            const token = response.data.token;
            localStorage.setItem("token", token);
            navigate("/dashboard");      
        } catch (err:any){
            const msg = err.response?.status;
            if (msg === 400){
                setError("BadRequest")
            } else if( msg === 409){
                setError("Datos Duplicados");
            } else {
                setError("sERVER eRROR")
            } 
        } finally {
            setLoading(false)
        }
    }
}
