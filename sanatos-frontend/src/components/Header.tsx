import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";

const Header = () => {
  return (
    <header className="bg-ct-white-100 h-20 border-b border-black relative">
      <nav className="h-full flex justify-between container items-center">
        <div className="flex items-center">
          <Link to="/" className="text-4xl text-ct-blue-200 pr-20">
            <img
              className="float-left"
              src={Logo}
              alt=""
              style={{ height: "2rem" }}
            />
            SanatOS
          </Link>
        </div>
        
      </nav>
    </header>
  );
};

export default Header;


