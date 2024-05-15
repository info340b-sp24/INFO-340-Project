import React, {useEffect, useState} from 'react';
import { NavLink } from "react-router-dom";
import '../CSS/Header.css'
import { CSSTransition } from "react-transition-group";
import { FaUser, FaHome, FaPen  } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { GiFruitBowl } from "react-icons/gi";
import { IoEyeSharp } from "react-icons/io5";

function NavigationBar() {
    const[isMobile, setIsMobile] = useState(false);
    const [expand, setExpand] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 576);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return() => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const togglExpand = () => {
        setExpand(!expand);
    };

    const closeExpand = () => {
        setExpand(false);
    };

    return (
        <Navbar>
            <NavItem text="NutriGenius" route="/" tooltip="Home Navigation" closeExpand={closeExpand} />

            {!isMobile && (<>
                <NavItem text="Diet" route="/Diet" tooltip="Diet Navigation" closeExpand={closeExpand} />
                <NavItem text="Learn" route="/Learn" tooltip="Learn Navigation" closeExpand={closeExpand} />
                <NavItem text="Discovery" route="/Discovery" tooltip="Discovery Navigation" closeExpand={closeExpand} /></>
            )}

            {isMobile && (
                <NavExpandItem
                    icon={<RiArrowDropDownLine />}
                    expand={expand}
                    togglExpand={togglExpand}
                    tooltip="More"
                >
                    <DropdownMenu closeExpand={closeExpand} />
                </NavExpandItem>
            )}

            <NavItem route="/Login" tooltip="Home Navigation" logo= {<FaUser />} closeExpand={closeExpand} />
        </Navbar>
    )

}

function Navbar(props) {
    return (
        <nav className="navbar">
            <ul className="navbar-nav">{props.children}</ul>
        </nav>
    );
}

function NavItem(props) {
    const { text, route, tooltip, logo} = props;

    return (
        <li className="nav-item" onClick={props.closeExpand}>
            <NavLink to={route}>
                <div
                    className={"text-content" + (tooltip ? " tooltip" : "")}
                    data-tooltip={tooltip}
                >
                    {logo ? (
                        <div className="nav-logo">{logo}</div>
                    ) : (
                        <div className={"text-content" + (tooltip ? " tooltip" : "")} data-tooltip={tooltip}>
                            {text}
                        </div>
                    )}
                </div>
            </NavLink>
        </li>
    );
}

function NavExpandItem(props) {
    return (
        <li className="nav-item nav-expand">
            <div className="icon-button" onClick={props.togglExpand}>
                {props.icon}
            </div>
            {props.expand && props.children}
        </li>
    );
}

function DropdownMenu(props) {
    const [activeMenu, setActiveMenu] = useState("main");
    // const [menuHeight, setMenuHeight] = useState(0);
    //
    // function getHeight(elem) {
    //     const height = elem.offsetHeight;
    //     console.log(height);
    //     console.log("can you see me ");
    //     setMenuHeight(height);
    // }

    function DropdownItem(props) {
        return (
            <a
                href={props.url}
                target="_blank"
                rel="noopener noreferrer"
                className="menu-item"
            >
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}
            </a>
        );
    }

    return (
        // <div className="dropdown" style={{ height: `${menuHeight}px` }}>
        <div className="dropdown">
            <CSSTransition
                in={activeMenu === "main"}
                unmountOnExit
                timeout={200}
                classNames="menu-primary"
                // onEnter={getHeight}
            >
                <div className="main">
                    <NavLink to="/" onClick={props.closeExpand}>
                        <DropdownItem leftIcon={<FaHome />}>Home</DropdownItem>
                    </NavLink>
                    <NavLink to="/Diet" onClick={props.closeExpand}>
                        <DropdownItem leftIcon={<GiFruitBowl />}>
                            Diet
                        </DropdownItem>
                    </NavLink>
                    <NavLink to="/Learn" onClick={props.closeExpand}>
                        <DropdownItem leftIcon={<FaPen />}>Learn</DropdownItem>
                    </NavLink>
                    <NavLink to="/Discovery" onClick={props.closeExpand}>
                        <DropdownItem leftIcon={<IoEyeSharp />}>Join Now</DropdownItem>
                    </NavLink>
                </div>
            </CSSTransition>
        </div>
    );
}


export default NavigationBar;