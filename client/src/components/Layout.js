import React, { useState } from "react";
import "../layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "antd";

function Layout({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const { user } = useSelector((state) => state.user);

    const location = useLocation();
    const navigate = useNavigate();
    const userMenu = [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "Appointments",
            path: "/appointments",
        },
    ];

    const psychiatristMenu = [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "Appointments",
            path: "/psychiatrist/appointments",
        },
        {
            name: "Profile",
            path: `/psychiatrist/profile/${user?._id}`,
        },
    ];

    const adminMenu = [
        {
            name: "Overview",
            path: "/admin/overview",
        },
        {
            name: "Patients",
            path: "/admin/userslist",

        },
        {
            name: "Psychiatrist",
            path: "/admin/psychiatristslist",
        }
    ];

    const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isPsychiatrist ? psychiatristMenu : userMenu;
    const role = user?.isAdmin ? "Logged as Admin" : user?.isPsychiatrist ? `Psychiatrist ${user?.name}` : "Patient";
    return (
        <div className="main">
            <div className="d-flex layout">
                <div className="sidebar">
                    <div className="sidebar-header">
                        <h1 className="logo">Psy <br/> Booking</h1>
                        <h1 className="role">{role}</h1>
                    </div>
                    
                    <div className="menu">
                        {menuToBeRendered.map((menu) => {
                            const isActive = location.pathname === menu.path;
                            return (
                                <div
                                    className={`d-flex menu-item ${isActive && "active-menu-item"
                                        }`}
                                >
                                
                                    {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                                </div>
                            );
                        })}
                        <div
                            className={`d-flex menu-item `}
                            onClick={() => {
                                localStorage.clear();
                                //add a refresh before going to login page
                                navigate("/login");
                            }}
                        >
                        
                            {!collapsed && <Link to="/login">Logout</Link>}
                        </div>
                    </div>
                </div>

                <div className="content">
                    <div className="header">
                        {collapsed ? (
                            <i
                                className="ri-menu-2-fill header-action-icon"
                                onClick={() => setCollapsed(false)}
                            ></i>
                        ) : (
                            <i
                                className="ri-close-fill header-action-icon"
                                onClick={() => setCollapsed(true)}
                            ></i>
                        )}

                        <div className="d-flex align-items-center px-4">
                            <Badge
                                count={user?.unseenNotifications.length}
                                onClick={() => navigate("/notifications")}
                            >
                                <i className="ri-notification-line header-action-icon px-3"></i>
                            </Badge>

                            <p className="anchorRole mx-2">
                                {user?.name}
                            </p>
                        </div>
                    </div>

                    <div className="body">{children}</div>
                </div>
            </div>
        </div>
    )
}

export default Layout;
//https://www.youtube.com/watch?v=FfZ8x2JkUuU