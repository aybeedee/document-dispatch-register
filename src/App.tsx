import {Routes, Route, Link, Outlet, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import './App.css';
import pic from './assets/profile.png';
import logo from './assets/logo.png';
import {nanoid} from 'nanoid';

const applications: any = [

  {
    docID: nanoid(),
    docType: "Course Withdrawal",
    applicantName: "Asim Zahid",
    applicantID: "19I-0432",
    department: "EE",
    applicationDate: "2023-04-24",
    description: "Need to withdraw programming course urgently."
  },

  {
    docID: nanoid(),
    docType: "Disciplinary Fine",
    applicantName: "Rohail Zabid",
    applicantID: "21I-1340",
    department: "Computing",
    applicationDate: "2023-03-17",
    description: "Submitted fine amount with requied documents."
  }
];

export default function App() {

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
    applicantID: "",
    department: "",
    applicationDate: "",
    description: ""
  });

  const navigate = useNavigate()

  const handleChange = (e: any) => {

    setApplication(prev => ({...prev, [e.target.name]: e.target.value}));
  };

  const handleClick = async (e: any) => {

    e.preventDefault()

    try{

        await applications.push(application);
        navigate("/");
        console.log(applications);

    } catch(err){

        console.log(err)
    }
  }
  
  return (
    <div className="submit-application">
      <h1>Create Application</h1>
      <div className = "form">
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
        <input type = "text" placeholder = "Applicant ID" onChange = {handleChange} name = "applicantID"/>
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
        <textarea name = "description" rows={4} cols={50} defaultValue="Describe any details of the application here." onChange = {handleChange}/>
        <button onClick = {handleClick}>Submit</button>
      </div>
    </div>
  );
}

function PendingApplications() {
  return (
    <div>
      <div className="content">
          <div className="container">
              <h2>Applications</h2>
              <div>
                  <table className="table custom-table">
                  <thead>
                      <tr>  
                      <th scope="col">Document Type</th>
                      <th scope="col">Department</th>
                      <th scope="col">Name</th>
                      <th scope="col">Applicant ID</th>
                      <th scope="col">Submission Date</th>
                      <th scope="col">Action</th>
                      </tr>
                  </thead>
                  <tbody>
                      {
                          applications.map((application: any) => (
                              <tr key={application.docID}>
                                  <td>{application.docType}</td>
                                  <td>{application.department}</td>
                                  <td>{application.applicantName}</td>
                                  <td>{application.applicantID}</td>
                                  <td>{application.applicationDate}</td>
                                  <td>
                                  <button><Link to = {`/track/${application.docID}`}>Track</Link></button>
                                  <button><Link to = {`/update/${application.docID}`}>Update</Link></button>
                                  </td>
                                  <td colSpan={100}></td>
                              </tr>
                          ))
                      }
                  </tbody>
                  </table>
              </div>
          </div>
      </div>
    </div>
  );
}