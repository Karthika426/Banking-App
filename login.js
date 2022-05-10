import React,{useState} from 'react';
import './login.css';
import logo from '../logo.png';
import { Button,Form,Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Axios from 'axios'

function Login (){

    let history=useHistory();

  const [validated, setValidated] = useState(false);
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [loginstatus, setloginstatus] = useState("");
  const[loginstatusShow,setloginstatusShow]=useState(false);


    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
       
      }else{
        login();
      }
      setValidated(true);
    };
    
    const login=()=>{
        if(username !== "" && password !== ""){
          Axios.post('http://localhost:3001/login',{
          userid:username,
          password:password,
        }).then((response)=>{
            if(response.data.message){
              setloginstatus(response.data.message);
              setloginstatusShow(true);
            } else{
              setloginstatusShow(false);
              window.$name=response.data[0].Username;
              window.username = response.data[0].Username;
              window.userid = response.data[0].UserID;
              window.user_id = response.data[0].id;
              history.push({pathname:'/main',
                        state: { detail: response.data[0].UserID+ "^" + response.data[0].Username }
                          })
            }
        console.log(response);
        })
      }
    }

      return (<div className='maindiv'>
      {/* Logo */}
            <img src={logo} className='Page-logo' alt="logo"></img>

            {/* Page Text Content */}
            <div className='Page-testContents'>
            Welcome to <br/> <span className='Page-textContent2'>Crystal Delta </span><br/> Banking
            </div>
            {/* Login cardView */}
            <div className='Login-cardView'>
              <h4>Login to your account</h4>
              <br/>
            

              <Form noValidate validated={validated} >
              <div className="d-grid gap-3">
              <label for="formBasicCustomerID">Customer ID</label>
              <Form.Group className="mb-2" controlId="formBasicCustomerID">
              <Form.Control  size="lg" type="text" placeholder="Enter the Customer ID" onChange={(e)=>{setusername(e.target.value)}} required />
              <Form.Control.Feedback type="invalid">
                    Please provide a valid Customer ID.
              </Form.Control.Feedback>
              </Form.Group>
              <label for="formBasicPassword">Password</label>
              <Form.Group className="mb-2" controlId="formBasicPassword">
              <Form.Control  size="lg" type="password" placeholder="Enter the Password" onChange={(e)=>{setpassword(e.target.value)}} required/>
              <Form.Control.Feedback type="invalid">
                Please provide a valid Password.
              </Form.Control.Feedback>
              </Form.Group>
              
              <Button size="lg"  Button color="info" onClick={handleSubmit}>Login</Button>
              </div>

              {loginstatusShow && 
                        <Alert variant="danger" show={loginstatusShow} onClose={() => setloginstatusShow(false)} dismissible>
                          <Alert.Heading>Login Error!</Alert.Heading>
                          <p>
                            {loginstatus}
                          </p>
                        </Alert>
              } 
              </Form>
            </div>
            
      </div>);
}
export default Login;
