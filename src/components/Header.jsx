import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { adminlogout, adminreset } from "../features/auth/admin/adminSlice";



function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const { admin } = useSelector((state) => state.admin);
  

  const isAdminPath = location.pathname.startsWith("/admin");
  const onlogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  const profile = () => {
    navigate("/profile");
  };
  const users = () => {
    navigate("/admin/users");
  };

  const dashboard = () => {
    navigate("/");
  };
  const Admindashboard = () => {
    navigate("/admin/admindashboard");
  };
  const createUser = () => {
    navigate("/register");
  };

  const adminLogout = () => {
    dispatch(adminlogout());
    dispatch(adminreset());
    navigate("/");
  };
  return (
    <div>
      <header className="header">
        <div className="logo">
          <Link to="/"></Link>
        </div>

        {isAdminPath ? (
          <>
            {" "}
            <ul>
              {admin ? (
                <>
               
                  <li>
                    <button className="btn" onClick={Admindashboard}>
                      {" "}
                      Dashboard
                    </button>
                  </li>
                  <li>
                    <button className="btn" onClick={createUser}>
                      {" "}
                      Create User
                    </button>
                  </li>
                  <li>
                    <button className="btn" onClick={adminLogout}>
                      <FaSignOutAlt />
                      logout
                    </button>
                  </li>
                  
                </>
              ) : (
                <>
                  <li>
                    <Link to="/admin/adminlogin">
                      <FaSignInAlt />
                      Admin login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register">
                      <FaUser />
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </>
        ) : (
          <>
            {" "}
            <ul>
              {user ? (
                <>
                  <li>
                    <button className="btn" onClick={dashboard}>
                      {" "}
                      Dashboard
                    </button>
                  </li>
                  <li>
                    <button className="btn" onClick={profile}>
                      {" "}
                      Profile
                    </button>
                  </li>
                  <li>
                    <button className="btn" onClick={onlogout}>
                      <FaSignOutAlt />
                      logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">
                      <FaSignInAlt />
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register">
                      <FaUser />
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/adminlogin">
                      <FaSignInAlt />
                      Admin login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </>
        )}
      </header>
    </div>
  );
}

export default Header;
