import { useState, useEffect } from 'react';
import axios from 'axios';
import "./PrivatePage.css";

const PrivatePage = ({history}) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");

  useEffect(() => {
    if(!localStorage.getItem("authToken")){
      history.push("/signin")
    }

    const fetchPrivateData = async () => {
      const config = {
        headers:{
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("authToken")}`
        }
      }

      try {
        const {data} = await axios.get("api/private", config);
        setPrivateData(data.data)        
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized! Please Login first")
        setTimeout(function() {
          history.push("/signin")}, 1000);        
      }
    }
    fetchPrivateData();
  }, [history]);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    history.push("/signin")
  }
  return error ? (
    <span className="d-flex justify-content-center alert alert-danger">{error}</span>
  ) : (
    <>
    <div style={{position:"fixed", top:"0", right:"0", textAlign:"right" }}>
    <span className="badge bg-primary text-wrap"><i className="bi bi-person-fill"></i> {privateData}</span>
    <button className="btn btn-secondary btn-sm" onClick={logoutHandler}>Logout</button>
    </div>
  </>
  );
};

export default PrivatePage;