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
            header: {"Content-Type": "application/json"}
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
                <label htmlFor="name">Full Name:</label>
                <input type="text" required id="name" placeholder="Enter your name" value={username} 
                onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="text" required id="email" placeholder="Enter Email" value={email} 
                onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="number">Phone:</label>
                <input type="tel" required id="phone" placeholder="Enter Phone Number" value={phone} 
                onChange={(e) => setPhone(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" required id="password" placeholder="Enter your Password" value={password} 
                onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="confirmedpassword">Confirm Password:</label>
                <input type="password" required id="confirmedpassword" placeholder="Confirm your Password" value={confirmedPassword} 
                onChange={(e) => setConfirmedPassword(e.target.value)}/>
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
            <span className="register-page-subtext">Already have an account? <Link to="/signin">Login</Link></span>
        </form>
    </div>
    )
}

export default RegisterPage;