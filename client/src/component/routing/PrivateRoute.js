import {Redirect, Route} from 'react-router-dom';
import MainContainer from '../../pages/maincontainer/MainContainer';



const PrivateRoute = ({component:Component, ...rest}) => {
    return(
        <Route {...rest} 
        render = { (props) => 
            localStorage.getItem("authToken") ? 
            (<><Component {...props}/>                
                <MainContainer />
                </>  
                )   : 
            (<Redirect to="/signin"/>)
        }/>
    )
}

export default PrivateRoute;