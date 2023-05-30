import {Routes, Route, Link, Outlet, useNavigate, useLocation} from 'react-router-dom';
import {useState} from 'react';
import './App.css';
import pic from './assets/profile.png';
import logo from './assets/logo.png';
import tick from './assets/tick.svg';
import pending from './assets/pending.png';
import {nanoid} from 'nanoid';

// const authorities: any = [

//   "Officer Saif Sheikh",
//   "Coordinator Zubair Rahim",
//   "HOD Rahman Zahid",
//   "HOD Tanveer Rahim",
//   "HOS Talha Fazal",
//   "Coordinator Rehman Ullah",
//   "DC-Incharge Yasir Ali"
// ]

const applications: any = [

  {
    docID: nanoid(),
    docType: "Course Withdrawal",
    applicantName: "Asim Zahid",
    applicantID: "19I-0432",
    department: "EE",
    applicationDate: "2023-04-24",
    description: "Need to withdraw programming course urgently.",
    authorityPosition: 0
  },

  {
    docID: nanoid(),
    docType: "Disciplinary Fine",
    applicantName: "Rohail Zabid",
    applicantID: "21I-1340",
    department: "Computing",
    applicationDate: "2023-03-17",
    description: "Submitted fine amount with requied documents.",
    authorityPosition: 1
  },

  {
    docID: nanoid(),
    docType: "Grade Change",
    applicantName: "Asif Khan",
    applicantID: "20I-4534",
    department: "FSM",
    applicationDate: "2023-05-01",
    description: "Application for change of grade.",
    authorityPosition: 3
  },

  {
    docID: nanoid(),
    docType: "Teacher Leave",
    applicantName: "Rahmanullah Gurbaz",
    applicantID: "E24352",
    department: "Computing",
    applicationDate: "2023-01-04",
    description: "Important Training Summit.",
    authorityPosition: 2
  },

  {
    docID: nanoid(),
    docType: "Course Withdrawal",
    applicantName: "Rafay Sheikh",
    applicantID: "22I-2311",
    department: "FSM",
    applicationDate: "2023-04-17",
    description: "Urgent.",
    authorityPosition: 0
  },

  {
    docID: nanoid(),
    docType: "Disciplinary Fine",
    applicantName: "Talha Tahir",
    applicantID: "18I-0532",
    department: "Computing",
    applicationDate: "2023-05-09",
    description: "Submitted fine amount.",
    authorityPosition: 3
  }
];

const tracks: any = [

  {
    trackID: nanoid(),
    title: "Course Withdrawal",
    expectedDays: 6,
    authorities: [
      "Officer Saif Sheikh",
      "Coordinator Zubair Rahim",
      "HOD Rahman Zahid"
    ]
  },

  {
    trackID: nanoid(),
    title: "Absence Justification",
    expectedDays: 12,
    authorities: [
      "Officer Saif Sheikh",
      "HOD Tanveer Rahim"
    ]
  },

  {
    trackID: nanoid(),
    title: "Teacher Leave",
    expectedDays: 5,
    authorities: [
      "Officer Saif Sheikh",
      "HOD Zubair Rahim",
      "HOS Talha Fazal"
    ]
  },

  {
    trackID: nanoid(),
    title: "Grade Change",
    expectedDays: 14,
    authorities: [
      "Officer Saif Sheikh",
      "Coordinator Rehman Ullah",
      "HOD Tanveer Rahim"
    ]
  },

  {
    trackID: nanoid(),
    title: "Disciplinary Fine",
    expectedDays: 7,
    authorities: [
      "Officer Saif Sheikh",
      "DC-Incharge Yasir Ali",
      "HOS Talha Fazal"
    ]
  }
]

export default function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="SubmitApplication" element={<SubmitApplication />} />
          <Route path="PendingApplications" element={<PendingApplications />} />
          <Route path="Track" element={<Track />} />
          <Route path="ViewTracks" element={<ViewTracks />} />
          <Route path="CreateTrack" element={<CreateTrack />} />
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
      <button className = "homeButtons">
      <Link to="/ViewTracks">View Tracks</Link>
      </button>
      <button className = "homeButtons">
      <Link to="/CreateTrack">Create Track</Link>
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
    description: "",
    attachment: null,
    authorityPosition: 0
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
        <input type="file" id="myFile" name="attachment"/>
        <button onClick = {handleClick}>Submit</button>
      </div>
    </div>
  );
}

function PendingApplications() {

  const [searchTerms, setSearchTerms] = useState({

    applicantName: "",
    applicantID: "",
    startDate: "",
    endDate: "",
    department: "All"
  })

  const filteredApplications = applications.filter(
    (application : any) => {

      if (searchTerms.startDate && searchTerms.endDate) {

        if (searchTerms.department === "All") {

          return (
            application.applicantName.toLowerCase().includes(searchTerms.applicantName.toLowerCase()) &&
            application.applicantID.toLowerCase().includes(searchTerms.applicantID.toLowerCase()) &&
            ((application.applicationDate >= searchTerms.startDate) && (application.applicationDate <= searchTerms.endDate))
          );
        }

        else {

          return (
            application.applicantName.toLowerCase().includes(searchTerms.applicantName.toLowerCase()) &&
            application.applicantID.toLowerCase().includes(searchTerms.applicantID.toLowerCase()) &&
            (application.department === searchTerms.department) &&
            ((application.applicationDate >= searchTerms.startDate) && (application.applicationDate <= searchTerms.endDate))
          );
        }
      } 
      
      else if (searchTerms.startDate) {

        if (searchTerms.department === "All") {

          return (
            application.applicantName.toLowerCase().includes(searchTerms.applicantName.toLowerCase()) &&
            application.applicantID.toLowerCase().includes(searchTerms.applicantID.toLowerCase()) &&
            (application.applicationDate >= searchTerms.startDate)
          );
        }

        else {

          return (
            application.applicantName.toLowerCase().includes(searchTerms.applicantName.toLowerCase()) &&
            application.applicantID.toLowerCase().includes(searchTerms.applicantID.toLowerCase()) &&
            (application.department === searchTerms.department) &&
            (application.applicationDate >= searchTerms.startDate)
          );
        }
      } 
      
      else if (searchTerms.endDate) {

        if (searchTerms.department === "All") {

          return (
            application.applicantName.toLowerCase().includes(searchTerms.applicantName.toLowerCase()) &&
            application.applicantID.toLowerCase().includes(searchTerms.applicantID.toLowerCase()) &&
            (application.applicationDate <= searchTerms.endDate)
          );
        }

        else {

          return (
            application.applicantName.toLowerCase().includes(searchTerms.applicantName.toLowerCase()) &&
            application.applicantID.toLowerCase().includes(searchTerms.applicantID.toLowerCase()) &&
            (application.department === searchTerms.department) &&
            (application.applicationDate <= searchTerms.endDate)
          ); 
        }
      } 
      
      else {

        if (searchTerms.department === "All") {

          return (
            application.applicantName.toLowerCase().includes(searchTerms.applicantName.toLowerCase()) &&
            application.applicantID.toLowerCase().includes(searchTerms.applicantID.toLowerCase())
          );
        }

        else {

          return (
            application.applicantName.toLowerCase().includes(searchTerms.applicantName.toLowerCase()) &&
            application.applicantID.toLowerCase().includes(searchTerms.applicantID.toLowerCase()) &&
            (application.department === searchTerms.department)
          );
        }
      }
    }
  );

  const handleChange = (e: any) => {

    setSearchTerms(prev => ({...prev, [e.target.name]: e.target.value}));
  };

  return (
    <div>
      <div className="content">
          <div className="container">
              <h2>Applications</h2>
              <div className = "searchParams">
                <input type = "text" placeholder = "Applicant Name" onChange = {handleChange} name = "applicantName"/>
                <input type = "text" placeholder = "Applicant ID" onChange = {handleChange} name = "applicantID"/>
                <div>
                  <label>Start Date:  </label>
                  <input id = "startDate" type = "date" onChange = {handleChange} name = "startDate"/>
                </div>
                <div>
                  <label>End Date:  </label>
                  <input id = "endDate" type = "date" onChange = {handleChange} name = "endDate"/>
                </div>
                <select onChange = {handleChange} name = "department">
                  <option selected value = "All"> -- All Departments -- </option>
                  <option value = "Accounts">Accounts</option>
                  <option value = "Admin">Admin</option>
                  <option value = "HR">HR</option>
                  <option value = "Computing">Computing</option>
                  <option value = "EE">EE</option>
                  <option value = "FSM">FSM</option>
                </select>
              </div>
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
                          filteredApplications.map((application: any) => (
                              <tr key={application.docID}>
                                  <td>{application.docType}</td>
                                  <td>{application.department}</td>
                                  <td>{application.applicantName}</td>
                                  <td>{application.applicantID}</td>
                                  <td>{application.applicationDate}</td>
                                  <td>
                                  <button><Link to = {`/Track/?docID=${application.docID}`}>Track</Link></button>
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

function ViewTracks() {

  return (
    <div>
      <div className="content">
          <div className="container">
              <h2>Tracks</h2>
              <div>
                  <table className="table custom-table">
                  <thead>
                      <tr>  
                        <th scope="col">Track Title</th>
                        <th scope="col">Expected Duration</th>
                        <th scope="col">Authorities</th>
                      </tr>
                  </thead>
                  <tbody>
                      {
                          tracks.map((track: any) => (
                              <tr key={track.trackID}>
                                  <td>{track.title}</td>
                                  <td>{track.expectedDays}</td>
                                  <td>{track.authorities.map(
                                    (authority: string) =>
                                      (
                                        <p>{authority} </p>
                                      )
                                  )}</td>
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

function CreateTrack() {

  const [track, setTrack] = useState({

    trackID: nanoid(),
    title: "",
    expectedDays: 0,
    authorities: []
  });

  const navigate = useNavigate()

  const handleChange = (e: any) => {

    setTrack(prev => ({...prev, [e.target.name]: e.target.value}));
  };

  const handleClick = async (e: any) => {

    e.preventDefault()

    try{

        await tracks.push(track);
        await
        navigate("/");

    } catch(err){

        console.log(err)
    }
  }
  
  return (
    <div className="submit-application">
      <h1>Create Track</h1>
      <div className = "form">
        {/* <div> */}
          <label>Track Title</label>
          <input type = "text" placeholder = "Track Title" onChange = {handleChange} name = "title"/>
          <label>Expected Das</label>
          <input type = "number" placeholder = "Expected Days" onChange = {handleChange} name = "expectedDays"/>
        {/* </div> */}
        {/* <div>
          {
            authorities.map(
              (authority: any) =>
              (
                <label>
                  <input type = "checkbox" checked = {value} onChange = {}/>
                  {authority}
                </label>
              )
            )
          }
        </div> */}
        <button onClick = {handleClick}>Submit</button>
      </div>
    </div>
  );
}

function Track() {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const documentID = queryParams.get("docID");
  const application = applications.find((application: any) => (application.docID === documentID))
  const track = tracks.find((track: any) => (track.title === application.docType))
  
  return (
    <div className = "trackDiv">
      <h1>Track</h1>
      <div className = "listBlock">
        <div className = "listValues">
          <h3>Track Title:</h3>
          <p>{track.title}</p>
        </div>
        <div className = "listValues">
          <h3>Document ID:</h3>
          <p>{application.docID}</p>
        </div>
        <div className = "listValues">
          <h3>Track ID:</h3>
          <p>{track.trackID}</p>
        </div>
        <div className = "listValues">
          <h3>Expected Days:</h3>
          <p>{track.expectedDays} Days</p>
        </div>
      </div>
      <div className = "trackAuthorities">
        {
          track.authorities.map((authority: string, index: number) => (
            <div className = "trackAuthority">
              <h3>Authority:</h3>
              <h4>{authority}</h4>
              <img className = "statusIcon" src = {(index < (application.authorityPosition)) ? tick : pending}/>
              <p>{(index < (application.authorityPosition)) ? "approved" : "pending"}</p>
              <br/>
            </div>
          ))
        }
      </div>
    </div>
  );
}