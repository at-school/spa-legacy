import { Button } from "antd";
import { css, StyleSheet } from "aphrodite";
import React from "react";
import { graphql } from "react-apollo";
import ReactDOMServer from 'react-dom/server';
import { getStudentsQuery } from "../../../../../queries";
import PDFTemplate from "./PDFTemplate/index";
import PDFstyle from './style/index'

class Reports extends React.Component<any> {

	public state = {
		classroomData: {
			"Headers": {
				"Course-name": "Mathematics Specialist",
				"Semester": "2",
				"Teacher": "Mr. Smith",
				"Type": "Assignment",
				"Weighting": "30%",
			},
			"Questions": {
				"description": "",
				"total marks": ""
			},
			"Scores": [
				{"id": "", "scores": {"total": 10}},
				{"id": "", "scores": {"total": 15}},
				{"id": "", "scores": {"total": 24}},
				{"id": "", "scores": {"total": 18}},
				{"id": "", "scores": {"total": 34}},
				{"id": "", "scores": {"total": 16}},
				{"id": "", "scores": {"total": 20}},
				{"id": "", "scores": {"total": 35}},
				{"id": "", "scores": {"total": 28}},
				{"id": "", "scores": {"total": 29}},
				{"id": "", "scores": {"total": 12}},
				{"id": "", "scores": {"total": 14}},
				{"id": "", "scores": {"total": 23}},
				{"id": "", "scores": {"total": 8}},
				{"id": "", "scores": {"total": 19}},
				{"id": "", "scores": {"total": 21}},
				{"id": "", "scores": {"total": 12}},
			],
			"Total-marks": 40,
		}
	}

	public componentDidMount() {
		this.getScores()
	}

	public getScores = async () => {
		const scores = await fetch(process.env.REACT_APP_LOCAL_URI + "getscores", {
			body: JSON.stringify({
				"students": this.getStudentsData()
			}),
			headers: {
				"Content-Type": "application/json"
			},
			method: "POST"
		}).then(res => res.json())
		const classData = this.state.classroomData
		classData.Scores = scores.scores
		// this.setState({ classroomData: classData })
	}

	public downloadPDF = async () => {
		const PDF = await fetch(process.env.REACT_APP_LOCAL_URI + "makepdf", {
			body: JSON.stringify({
				"css": PDFstyle,
				"html": ReactDOMServer.renderToString(<PDFTemplate data={this.state.classroomData} />) as any
			}),
			headers: {
				"Content-Type": "application/json"
			},
			method: "POST"
		}).then(res => res.json())
		if (PDF.response === 'ok') {
			window.location.replace(process.env.REACT_APP_LOCAL_URI + "download")
		}
	}

	public getStudentsData = () => {
		if (this.props.getStudents.loading) {
			return []
		}

		if (this.props.getStudents.classroom
			&& this.props.getStudents.classroom.length
			&& this.props.getStudents.classroom[0]
			&& this.props.getStudents.classroom[0].students)
		{
			return [...this.props.getStudents.classroom[0].students]
		}
		return []
	}

	public render() {
		console.log(this.getStudentsData())
		return (
			<div style={{ width: "100%" }}>
				<ClassReport download={this.downloadPDF} />
				<AttendancesReport />
				<PDFTemplate data={this.state.classroomData} />
			</div>
		)
	}
}

const ClassReport = (props: any) => {
	return (
		<div className={css(styles.reportContainer)}>
			<h2>Class Reports</h2>
			<p>
				Class Report has all the information related to how the students are
				doing in a class, their marks, their attendaces.
			</p>
			<Button type="primary" size="large" onClick={props.download}>
				Download now
			</Button>
		</div>
	);
};

const AttendancesReport = (props: any) => {
	return (
		<div className={css(styles.reportContainer)}>
			<h2>Attendances Reports</h2>
			<p>
				Class Report has all the information related to how the students are
				doing in a class, their marks, their attendaces.
	  </p>
			<Button type="primary" size="large">
				Download now
	  </Button>
		</div>
	);
};

const styles = StyleSheet.create({
	reportContainer: {
		width: "100%",
		padding: "20px",
		border: "2px solid #f1f1f1",
		marginBottom: "20px"
	}
});

export default graphql(getStudentsQuery, {
	options: (props: any) => {
		return {
			variables: {
				Id: props.classId
			}
		}
	},
	name: "getStudents"
})(Reports);;
