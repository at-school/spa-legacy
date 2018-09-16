import React from "react";

const SuccessProbability = () => (
	<div className="success-probability">
	<div className="title">Probability of Success</div>
	<div className="success-probability-item">
		<table className='success-table'>
			<thead>
				<tr>
					<th>Project aspect</th>
					<th>value</th>
					<th>Resources</th>
					<th>Team Members</th>
					<th>% of success</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Database configuration and management</td>
					<td>10%</td>
					<td>MLab</td>
					<td>Anh</td>
					<td>70%</td>
				</tr>
				<tr>
					<td>Web App UX design</td>
					<td>5% </td>
					<td>Scss, Adobe XD</td>
					<td>Anh/Charl</td>
					<td>80%</td>
				</tr>
				<tr>
					<td>Web App functionality</td>
					<td>10%</td>
					<td>Typescript, React</td>
					<td>Anh/Charl</td>
					<td>80%</td>
				</tr>
				<tr>
					<td>Web App UI design</td>
					<td>5%</td>
					<td>Photoshop, Illustrator</td>
					<td>Anh/Charl</td>
					<td>50%</td>
				</tr>
				<tr>
					<td>Web App email integration</td>
					<td>10%</td>
					<td>Google APIs, Flask, Oauth2client, Smtplib</td>
					<td>Charl</td>
					<td>80%</td>
				</tr>
				<tr>
					<td>Autonomous Authentication</td>
					<td>20%</td>
					<td>Typescript, React</td>
					<td>Anh</td>
					<td>75%</td>
				</tr>
				<tr>
					<td>Landing website/blog documentation</td>
					<td>2%</td>
					<td>React, Scss, Github pages</td>
					<td>Anh/Charl*</td>
					<td>75%</td>
				</tr>
				<tr>
					<td>Security</td>
					<td>15%</td>
					<td>N.A</td>
					<td>N.A</td>
					<td>10%</td>
				</tr>
				<tr>
					<td>Autonomous marking analytics</td>
					<td>10%</td>
					<td>Unsupervised learning, Python</td>
					<td>Charl</td>
					<td>75%</td>
				</tr>
				<tr>
					<td>Server</td>
					<td>3%</td>
					<td>Python, Flask</td>
					<td>Anh/Charl/Stephan</td>
					<td>95%</td>
				</tr>
				<tr>
					<td>Deployment</td>
					<td>10%</td>
					<td>something</td>
					<td>Anh</td>
					<td>30%</td>
				</tr>
			</tbody>
		</table>
		<h2>Estimated Probability of success: ∑(importance of outcome * probability of success)</h2>
		<h2 style={{ fontWeight: 'bold' }}>EPS: 60.85%</h2>
		</div>
		</div>
);

export default SuccessProbability;
