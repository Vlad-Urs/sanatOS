import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useStore from "../store";
import Spinner from "./Spinner";
import Logo from "../assets/logo.svg";
const Header = () => {
  const store = useStore();
  const user = store.authUser;
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      store.setRequestLoading(true);
      const VITE_SERVER_ENDPOINT = import.meta.env.VITE_SERVER_ENDPOINT;
      const response = await fetch(`${VITE_SERVER_ENDPOINT}/api/auth/logout`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw await response.json();
      }

      store.setRequestLoading(false);
      store.setAuthUser(null);
      navigate("/login");
    } catch (error: any) {
      store.setRequestLoading(false);
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      if (error?.message === "You are not logged in") {
        navigate("/login");
      }

      toast.error(resMessage, {
        position: "top-right",
      });
    }
  };

  return (
    <>
      <header className="bg-ct-dark-300 h-20">
        <nav className="h-full flex justify-between container items-center">
          <div>
            <Link to="/" className="text-4xl text-ct-red-600 pr-20 float-right">
              <img
                className="float-left"
                src={Logo}
                alt=""
                style={{ height: "2rem" }}
              />
              SanatOS
            </Link>
          </div>
          <ul className="flex items-center gap-4">
            {!user && (
              <>
                <li>
                  <Link to="/login" className="text-ct-red-600">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="text-ct-red-600">
                    Register
                  </Link>
                </li>
              </>
            )}
            {user && (
              <>
                <li>
                  <Link to="/profile" className="text-ct-red-600">
                    Profile
                  </Link>
                </li>
                <li className="cursor-pointer" onClick={handleLogout}>
                  Logout
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <div className="pt-4 pl-2 bg-ct-dark-300 fixed">
        {store.requestLoading && <Spinner color="text-ct-yellow-600" />}
      </div>
    </>
  );
};

export default Header;
