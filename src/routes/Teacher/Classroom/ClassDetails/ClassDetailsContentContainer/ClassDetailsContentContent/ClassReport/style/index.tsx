import { StyleSheet } from 'aphrodite';

const PDFstyles = StyleSheet.create({
	axisNumbers: {
		bottom: "0",
		fontSize: '11px',
		left: "0",
		position: "absolute",
		width: "100%"
	},
	column: {
		bottom: "0",
		float: "left",
		position: 'relative',
	},
	columnBar: {
		borderTopLeftRadius: '5px',
		borderTopRightRadius: '5px',
	},
	columns: {
		borderBottom: "1px solid black",
		// borderLeft: "1px solid black",
		bottom: "0",
		display: "inline-block",
		height: "400px",
		width: "100%",
	},
	containPDF: {
		margin: "auto",
		width: "80%"
	},
	downloadPDF: {
		display: "block",
		fontSize: '30px',
		textAlign: "center",
		width: "100%",
	},
	first: {
		marginLeft: 0,
	},
	graphContain: {
		height: "450px",
		margin: "auto",
		position: "relative",
		textAlign: "center",
		width: "70%",
	},
	info: {
		marginLeft: "10%"
	},
	last: {
		marginRight: 0,
	},
	outerContainer: {
		height: "100%",
		width: "100%",
	},
	xAxis: {
		borderRight: "1px solid black",
		height: "5px",
		width: "100%",
	},
})

export default PDFstyles
