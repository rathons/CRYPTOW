import {useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './RegisterPage.css';


const RegisterPage = ({history}) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [error, setError] = useState("");

    const registerHandler = async (e) => {
        e.preventDefault();

        const config ={
            headers: {"Content-Type": "apllication/json"}
        }

        if(password !== confirmedPassword) {
            setPassword("");
            setConfirmedPassword("");
            setTimeout(() => {
                setError("")
            }, 5000);
            return setError("Passwords do not match");
        }

        try{
            const {data} = await axios.post("/api/auth/register", {username, email, phone, password}, config);

            localStorage.setItem("authToken", data.token);
            history.push("/");
        }catch(error){
            setError(error.response.data.error);
            setTimeout(() => {
                setError("")
            }, 5000);
        }

    }

    return (
    <div className="register-page">
        <form onSubmit={registerHandler} className="register-form">
            <h3 className="register-form-title">Register</h3>
            {error && <span className="error-message">{error}</span>}
            <div className="form-group">
                <label htmlFor="name">Username:</label>
                <input type="text" required id="name" placeholder="Enter Username" value={username} 
                onChange={(props) => setUsername(props.currentTarget.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="text" required id="email" placeholder="Enter Email" value={email} 
                onChange={(props) => setEmail(props.currentTarget.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="number">Phone:</label>
                <input type="number" required id="phone" placeholder="Enter Phone Number" value={phone} 
                onChange={(props) => setPhone(props.currentTarget.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" required id="password" placeholder="Enter your Password" value={password} 
                onChange={(props) => setPassword(props.currentTarget.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="confirmedpassword">Confirm Password:</label>
                <input type="password" required id="confirmedpassword" placeholder="Confirm your Password" value={confirmedPassword} 
                onChange={(props) => setConfirmedPassword(props.currentTarget.value)}/>
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
            <span className="register-page-subtext">Already have an account? <Link to="/signin">Login</Link></span>
        </form>
    </div>
    )
}

export default RegisterPage;