import React from "react";
import { NavLink, useLocation, useHistory, Prompt } from "react-router-dom";

import Logo from "./logo.svg";

const Header: React.FC = () => {
  const [search, setSearch] = React.useState("");
  const [halfFilledForm, setHalfFilledForm] = React.useState(false);

  const location = useLocation();
  const history = useHistory();

  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setSearch(searchParams.get("search") || "");
  }, [location.search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let isHalfFilled = !!e.currentTarget.value.length;
    setHalfFilledForm(isHalfFilled)
    setSearch(e.currentTarget.value);
  };

  const handleSearchKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
        setHalfFilledForm(false)
      history.push(`/products?search=${search}`);
    }
  };

  return (
    <header className="header">
      <Prompt
        when={halfFilledForm}
        message="Are you sure you want to navigate away?"
      />
      <div className="search-container">
        <input
          type="search"
          placeholder="search"
          value={search}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeydown}
        />
      </div>
      <img src={Logo} className="header-logo" />
      <h1 className="header-title">React Shop</h1>
      <nav>
        <NavLink
          to="/products"
          className="header-link"
          activeClassName="header-link-active"
        >
          Products
        </NavLink>
        <NavLink
          to="/admin"
          className="header-link"
          activeClassName="header-link-active"
        >
          Admin
        </NavLink>
        <NavLink
          to="/contactus"
          className="header-link"
          activeClassName="header-link-active"
        >
          Contact Us
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
