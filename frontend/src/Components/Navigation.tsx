import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import logo from "../images/fire-icon.png";
import "./Navigation.css";

export const Navigation = () => {
	return (
		<Menu mode="horizontal" theme="dark" title="lol">
			<Menu.Item key="logo" className="logo-container">
				<Link to="/">
					<img src={logo} className="logo-image" alt="logo-image" />
					<span className="logo-text">
						BurnAfterReading
					</span>
				</Link>
			</Menu.Item>
			<Menu.Item key="home">
				<Link to="/">
					Home page
				</Link>
			</Menu.Item>
			<Menu.Item key="contact">
				<Link to="/contact">
					Contact
				</Link>
			</Menu.Item>
		</Menu>
	);
};