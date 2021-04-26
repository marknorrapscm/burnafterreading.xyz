import React from "react";
import { Layout, Row } from "antd";
import "./LayoutWrapper.css";
import { Navigation } from "./Navigation";
import { Link } from "react-router-dom";

type Props = {
	children: React.ReactNode
}

export const LayoutWrapper = (props: Props) => {
	return (
		<Layout>
			<Layout.Header>
				<Navigation />
			</Layout.Header>
			<Layout.Content className="site-content">
				{props.children}
			</Layout.Content>
			<Layout.Footer className="footer">
				<Row className="justify-content-center">
					<div className="link">
						<Link to="/privacy">
							Privacy
						</Link>
					</div>
					<div className="spacer">|</div>
					<div className="link">
						<Link to="/contact">
							Contact
						</Link>
					</div>
				</Row>
				<Row className="justify-content-center mt-1">
					&copy; {new Date().getFullYear()}
				</Row>
			</Layout.Footer>
		</Layout>
	);
};

