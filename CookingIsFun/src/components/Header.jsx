import { useState } from "react";
import hamMenu from "../assets/Hamburger.svg";
import { NavLink, useNavigate } from "react-router-dom";

import close from "../assets/Cross.svg";

const Header = () => {
  const [openHam, setOpenHam] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="header">
        <img
          src={hamMenu}
          alt="hamburger menu"
          onClick={() => setOpenHam(!openHam)}
        />
        <NavLink className="unstyled-link homelink" to={"/"}>
          MAT
        </NavLink>
        <div>
          <button onClick={() => navigate("/add-recipe")}>Lägg till</button>
        </div>
      </div>
      {openHam && (
        <div className="ham-menu ">
          <div className="link-container">
            <img
              src={close}
              alt="close tag"
              onClick={() => setOpenHam(!openHam)}
            />

            <NavLink
              className="unstyled-link"
              to={"/"}
              onClick={() => setOpenHam(!openHam)}
            >
              Home
            </NavLink>
            <NavLink
              className="unstyled-link"
              to={"/recipes"}
              onClick={() => setOpenHam(!openHam)}
            >
              Recept
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
