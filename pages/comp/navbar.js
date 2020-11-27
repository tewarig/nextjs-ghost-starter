import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import Link from "next/link";
import siteSettingUrl from "../../services/siteSetting";




export async function getStaticProps() {
  const res = await fetch(siteSettingUrl);
  const data = await res.json();
  
  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {data}, // will be passed to the page component as props
  }
}

 
function NavBar({data}) {
  console.log("yo");
  console.log(data);
  return (
    <>
      <Navbar siteName="Ghost CMS">
        <NavItemExternal icon={"🐦"} link="https://twitter.com/OyeTewari" />
        <NavItemExternal icon={"📷 "} />
        <NavItem icon={"💠"}>
          <DropdownMenu></DropdownMenu>
        </NavItem>
      </Navbar>
    </>
  );
};

function Navbar(props) {
  return (
    <nav className="navbar">
      <Link href="/">
        <a>
          <h2 className="navbar-main">{props.siteName}</h2>
        </a>
      </Link>

      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItemExternal(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a
        href={props.link}
        target="_blank"
        className="icon-button"
        onClick={() => setOpen(!open)}
      >
        {props.icon}
      </a>
      {open && props.children}
    </li>
  );
}
function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a
        href={props.link}
        className="icon-button"
        onClick={() => setOpen(!open)}
      >
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a
        href="#"
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem>About us</DropdownItem>
          <DropdownItem leftIcon={"🏷️"} goToMenu="settings">
            Tags
          </DropdownItem>
          <DropdownItem leftIcon="🖊️" goToMenu="animals">
            Authors
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "settings"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={"◀️"}>
            <h2>Tags</h2>
          </DropdownItem>
          <DropdownItem leftIcon={"💡"}>HTML</DropdownItem>
          <DropdownItem leftIcon={"💡"}>CSS</DropdownItem>
          <DropdownItem leftIcon={"💡"}>JavaScript</DropdownItem>
          <DropdownItem leftIcon={"💡"}>Awesome!</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "animals"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={"🖊️"}>
            <h2>Authors</h2>
          </DropdownItem>
          <DropdownItem leftIcon="🦘">Kangaroo</DropdownItem>
          <DropdownItem leftIcon="🐸">Frog</DropdownItem>
          <DropdownItem leftIcon="🦋">Horse?</DropdownItem>
          <DropdownItem leftIcon="🦔">Hedgehog</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}




export default NavBar;
