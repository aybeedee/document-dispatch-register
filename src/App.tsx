import {Routes, Route, Link, Outlet} from 'react-router-dom';
import './App.css'
import pic from './assets/profile.png'

export default function App() {
  // const [count, setCount] = useState(0)

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </div>
  )
}

function Layout() {
  return (
    <div className="layout">
      <div className="navbar">
        <div className="logo">
          Document Dispatch Register
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
      <Link to="/">Pending Applications</Link>
      </button>
      <button className = "homeButtons">
      <Link to="/">Submit Application</Link>
      </button>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
