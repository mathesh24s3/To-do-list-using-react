import React from "react";
import "./Header.css";
import headerLogo from "../../assets/checkbox.png"

export default class Header extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <header>
        <img src={headerLogo} alt="checkbox" className="header-logo" />
        <h1 className="header-title">To Do</h1>
      </header>
    );
  }
}
