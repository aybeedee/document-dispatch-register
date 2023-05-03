import {Routes, Route, Link, Outlet, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import './App.css';
import pic from './assets/profile.png';
import logo from './assets/logo.png';
import {nanoid} from 'nanoid';

const applications = [];

export default function App() {
  // const [count, setCount] = useState(0)

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="SubmitApplication" element={<SubmitApplication />} />
          <Route path="PendingApplications" element={<PendingApplications />} />
        </Route>
      </Routes>
    </div>
  )
}

function Layout() {
  return (
    <div className="layout">
      <div className="navbar">
        <img className="logoPic" src={logo}></img>
        <div className="logo">
          <h3>Document Dispatch Register</h3>
        </div>
        <img className="profilePic" src={pic}></img>
        <div className="welcome">
          Welcome Ali!
        </div>
      </div>
      <Outlet />
      <div className="footer">
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className="home">
      <button className = "homeButtons">
      <Link to="/PendingApplications">Pending Applications</Link>
      </button>
      <button className = "homeButtons">
      <Link to="/SubmitApplication">Submit Application</Link>
      </button>
    </div>
  );
}

function SubmitApplication() {

  const [application, setApplication] = useState({

    docID: nanoid(),
    docType: "",
    applicantName: "",
    applicantId: "",
    department: "",
    applicationDate: "",
    description: ""
  });

  const navigate = useNavigate()

  const handleChange = (e: any) => {
    console.log(e)
    setApplication(prev => ({...prev, [e.target.name]: e.target.value}));
  };

  const handleClick = async (e: any) => {

    e.preventDefault()

    try{

        await applications.push(application);
        navigate("/");

    } catch(err){

        console.log(err)
    }
  }
  
  return (
    <div className="home">
      <div className = "form">
            <h1>Create Application</h1>
            <label>Document Type</label>
            <select onChange = {handleChange} name = "docType">
              <option value = "Course Withdrawal">Course Withdrawal</option>
              <option value = "Absence Justification">Absence Justification</option>
              <option value = "Teacher Leave">Teacher Leave</option>
              <option value = "Grade Change">Grade Change</option>
              <option value = "Disciplinary Fine">Disciplinary Fine</option>
              <option value = "Other">Other</option>
            </select>
            <label>Applicant Name</label>
            <input type = "text" placeholder = "Applicant Name" onChange = {handleChange} name = "applicantName"/>
            <label>Applicant ID</label>
            <input type = "text" placeholder = "Applicant ID" onChange = {handleChange} name = "applicantId"/>
            <label>Department</label>
            <select onChange = {handleChange} name = "department">
              <option value = "Accounts">Accounts</option>
              <option value = "Admin">Admin</option>
              <option value = "HR">HR</option>
              <option value = "Computing">Computing</option>
              <option value = "EE">EE</option>
              <option value = "FSM">FSM</option>
            </select>
            <label>Application Date</label>
            <input id = "applicationDate" type = "date" onChange = {handleChange} name = "applicationDate"/>
            <label>Description</label>
            <textarea name = "description" rows={4} cols={50}>Describe any details of the application here</textarea>
            <button onClick = {handleClick}>Admit</button>
        </div>
    </div>
  );
}

function PendingApplications() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}