import React, {useState} from "react";
import {useNavigate} from "react-router-dom"
import api from "../api"

interface RegisterBody{
    username :string;
    email :string;
    password : string;
    fullname : string;

}
interface AuthResponse {
    token :string
}

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[fullname, setFullname] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const handleRegister = async (e:React.FormEvent) => {
        e.preventDefault;
        setLoading(true);
        setError("");

        const body : RegisterBody  = {
            username,
            email,
            password,
            fullname

        }
        try {
            const response = await api.post<AuthResponse>("/auth/register", body)
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
    return (
        <form onSubmit = {handleRegister}>
            <input type = "text"  placeholder = "Nombre de usuario" value = {username} onChange={(e) => setUsername(e.target.value)} />
            <input type = {email} placeholder = "Correo Electronico" value = {email} onChange={(e) => setEmail(e.target.value)} />
            <input type = {password} placeholder="contraseña" value = {password} onChange = {(e) => setPassword(e.target.value)} />
            <input type = "text" placeholder="Nombre Completo" value={fullname} onChange = {(e) => setFullname(e.target.value)} />
            <button type = "submit" disabled = {loading}>
                {loading ? 'Registrando...' : 'Registrarse'}
            </button>
            {error && <p>{error}</p>}
        </form>
    )
}
export default Register