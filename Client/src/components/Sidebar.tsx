import React, { useState } from "react";
import { Nav, Navbar, NavbarBrand, NavItem, NavLink, Dropdown, Row, Col } from "react-bootstrap";
import { FaAngleDown, FaThLarge, FaBox, FaBuilding, FaFileAlt, FaUsers, FaShippingFast, FaComments, FaCalendarAlt, FaAngleLeft, FaAngleRight, FaUserTie, FaSuitcase } from "react-icons/fa";
import { Link } from "react-router-dom";

import "../css/Sidebar.css"; // import background image CSS file

const items = [
  { label: "Dashboard", link: "/", icon: FaThLarge },
  {
    label: "Inventory",
    link: "/inventory",
    icon: FaBox,
    dropdownItems: [
      { label: "Category", link: "/Category" },
      { label: "SubCategory", link: "/SubCategory" },
      { label: "Stock", link: "/Stock" },
      { label: "Asset", link: "/Asset" },
      { label: "Employee Request", link: "/EmployeeRequest" },
      { label: "Assign", link: "/Assign" },
      { label: "Inventory Dashboard", link: "/InventoryDashboard" },
      { label: "Item", link: "/inventory/building2" },
    ],
  },
  {
    label: "Facility",
    icon: FaBuilding,
    link: "/facility",
    dropdownItems: [
      { label: "Building", link: "/BuildingFloor" },
      { label: "Facility Stock", link: "/FacilityStock" },
      { label: "Facility Asset", link: "/FacilityAsset" },
      { label: "Facility Dashboard", link: "/FacilityDashboard" },
      { label: "Assign Asset", link: "/AssignAsset" },
      
      { label: "Building 2", link: "/facility/building2" },
    ],
  },
  { label: "Reports", link: "/report", icon: FaFileAlt },
  { label: "Users", link: "/user", icon: FaUsers },
  { label: "Employees", link: "/employee", icon: FaUserTie },
  { label: "Departments", link: "/department", icon: FaSuitcase },
  { label: "Supply", link: "/supplier", icon: FaShippingFast,
  dropdownItems: [
    { label: "Suppliers", link: "/supplier" },
    { label: "Supply Orders", link: "/supply-orders" },
    { label: "Supply Chain", link: "/supply-chain" },
   
  ], },
  {
    label: "Support",
    icon: FaComments,
    link: "/support",
    dropdownItems: [
      { label: "Tickets", link: "/Tickets" },     
      { label: "Teams", link: "/Teams" },
      { label: "Agents", link: "/Agents" },
      { label: "Issues", link: "/Issues" },
      { label: "My Tickets", link: "/MyTickets" },
      { label: "IT Dashboard", link: "/ITDashboard" },
    ],
  },
  { label: "Notification Center", link: "/Notifications", icon: FaCalendarAlt },
];

interface SidebarProps {
  active: string;
  theme: string;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  const toggle = (key: string) => {
    setOpenKey(openKey === key ? null : key);
  };

  const isMobile = () => {
    return window.innerWidth < 768;
  };

  const collapseSideBar = (collapsed: boolean) => {
    const sidebarCol = document.getElementsByClassName("sidebar-col")[0];
    const comp_sidebar_col = document.getElementsByClassName("comp-sidebar-col")[0];
    const comp_collapse_col = document.getElementsByClassName("comp-collapse-col")[0];
    const contentCol = document.getElementsByClassName("content-col")[0];
    if (collapsed) {
      sidebarCol.className = "sidebar-col col-3";
      contentCol.className = "content-col col-8";
      comp_sidebar_col.className = "comp-sidebar-col col-10";
      comp_collapse_col.className = "comp-collapse-col col-2";
    } else {
      sidebarCol.className = "sidebar-col col-1";
      contentCol.className = "content-col col-10";
      comp_sidebar_col.className = "comp-sidebar-col col-8";
      comp_collapse_col.className = "comp-collapse-col col-4";
    }
    setCollapsed(!collapsed);
  };

  return (
    <Row>
      <Col md={10} className="comp-sidebar-col">
        <Navbar bg={props.theme === "dark" ? "dark" : "light"} expand="lg" className="sidebar">
          <div className="sidebar-logo">
            <img
              className="logo-img"
              src="/img/favicon.png"
              alt="Logo"
              width={collapsed || isMobile() ? "70" : "100"}
              style={{ paddingLeft: collapsed || isMobile() ? "10px" : "0px" }}
            />
          </div>
          <div className="sidebar-nav-padding"></div>
          <Nav className="sidebar-nav flex-column">
            {items.map((item) => {
              if (item.dropdownItems) {
                return (
                  <div className="nav-item" key={item.label}>
                    <div
                      className={`${
                        collapsed || isMobile()
                          ? "side-link-collapsed"
                          : "side-link"
                      } nav-link ${props.active === item.link ? "active" : ""}`}
                      onClick={() => toggle(item.label)}
                    >
                      <item.icon fontSize="1.2em" className="side-item mr-2" />
                      <span className={collapsed || isMobile() ? "hidden" : ""}>
                        {item.label}
                      </span>
                      <FaAngleDown className="dropdown-icon" style={{ float: "right" }} />
                    </div>
                    {openKey === item.label && (
                      <div className="dropdown-collection">
                        {item.dropdownItems.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.link}
                            to={dropdownItem.link}
                            className="nav-link sidenav dropdown-item"
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              } else {
                return (
                  <NavItem key={item.link}>
                    <Link
                      className={`${
                        collapsed || isMobile()
                          ? "side-link-collapsed"
                          : "side-link"
                      } nav-link ${props.active === item.link ? "active" : ""}`}
                      to={item.link}
                    >
                      <item.icon fontSize="1.2em" className="side-item mr-2" />
                      <span className={collapsed || isMobile() ? "hidden" : ""}>
                        {item.label}
                      </span>
                    </Link>
                  </NavItem>
                );
              }
            })}
          </Nav>
        </Navbar>
      </Col>
      <Col md={2} className="comp-collapse-col">
        <div className="collapse-button-container">
          <button
            className="collapse-button"
            onClick={() => {
              collapseSideBar(collapsed);
            }}
          >
            {collapsed ? <FaAngleRight /> : <FaAngleLeft />}
          </button>
        </div>
      </Col>
    </Row>
  );
};

export default Sidebar;
