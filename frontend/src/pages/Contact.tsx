import { Card, Col, Row } from "antd";
import React  from "react";

export const Contact = () => {
	return (
		<Row className="text-center" style={{ marginBottom: "55vh" }}>
			<Col xs={22} lg={16} className="m-auto">
				<Card>
					<p>If you find any bugs or want to get in touch use the following email:</p>
					<strong>
						<a href="mailto:burnafterreading.xyz@gmail.com">burnafterreading.xyz@gmail.com</a>
					</strong>
				</Card>
			</Col>
		</Row>
	);
};
