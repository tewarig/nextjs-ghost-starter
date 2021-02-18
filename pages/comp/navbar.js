import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import Link from "next/link";
import siteData from "../../site-info";
 
function NavBar() {
  
//  console.log(siteData["settings"]);
  return (
    <>
      <Navbar siteName={siteData["settings"].title}>
        <NavItemExternal icon={"🐦"} link={"https://twitter.com/"+siteData["settings"].twitter} />
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
          <DropdownItem leftIcon={"💡"}>Manga</DropdownItem>
          <DropdownItem leftIcon={"💡"}>Thoughts</DropdownItem>
          <DropdownItem leftIcon={"💡"}>Review</DropdownItem>
          <DropdownItem leftIcon={"💡"}>Meow Meow!</DropdownItem>
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



// export async function getStaticProps() {
//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library
//   const res = await fetch(allSettingUrl);
//   const posts = await res.json();

//   // By returning { props: posts }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       setting,
//     },
//   };
// }

export default NavBar;
