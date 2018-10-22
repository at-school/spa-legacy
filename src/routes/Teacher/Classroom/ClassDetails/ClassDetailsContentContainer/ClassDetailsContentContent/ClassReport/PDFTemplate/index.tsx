import { css } from 'aphrodite';
import React from 'react';
import PDFstyle from '../style/index'

const colors = [
	'rgba(255, 0, 0, 0.6)',
	'rgba(255, 0, 0, 0.6)',
	'rgba(255, 48, 0, 0.6)',
	'rgba(255, 48, 0, 0.6)',
	'rgba(255, 102, 0, 0.6)',
	'rgba(255, 102, 0, 0.6)',
	'rgba(255, 154, 0, 0.6)',
	'rgba(255, 205, 0, 0.6)',
	'rgba(255, 255, 0, 0.6)',
	'rgba(203, 255, 0, 0.6)',
	'rgba(203, 255, 0, 0.6)',
	'rgba(203, 255, 0, 0.6)',
	'rgba(150, 255, 0, 0.6)',
	'rgba(94, 255, 0, 0.6)',
	'rgba(94, 255, 0, 0.6)',
	'rgba(94, 255, 0, 0.6)',
	'rgba(0, 255, 0, 0.6)',
	'rgba(0, 255, 0, 0.6)',
	'rgba(255, 0, 0, 0.6)',
	'rgba(255, 0, 0, 0.6)',
	'rgba(255, 48, 0, 0.6)',
	'rgba(255, 48, 0, 0.6)',
	'rgba(255, 102, 0, 0.6)',
	'rgba(255, 102, 0, 0.6)',
	'rgba(255, 154, 0, 0.6)',
	'rgba(255, 205, 0, 0.6)',
	'rgba(255, 255, 0, 0.6)',
	'rgba(203, 255, 0, 0.6)',
	'rgba(203, 255, 0, 0.6)',
	'rgba(203, 255, 0, 0.6)',
	'rgba(150, 255, 0, 0.6)',
	'rgba(94, 255, 0, 0.6)',
	'rgba(94, 255, 0, 0.6)',
	'rgba(94, 255, 0, 0.6)',
	'rgba(0, 255, 0, 0.6)',
	'rgba(0, 255, 0, 0.6)'
]

const PDFTemplate = (props: any) => {
	console.log("PDFTemplate loaded")
	console.log("PDFTemplate:", props.data)
	console.log("PDFTemplate scores:", props.data.Scores)
	return (
		<div className={css(PDFstyle.outerContainer)}>
			<div className={css(PDFstyle.containPDF)}>
				<Headers data={props.data} />
				<Histogram data={props.data} />
			</div>
		</div>
	)
}

const Headers = (props: any) => (
	<div>
		<div className={css(PDFstyle.downloadPDF)}>
			<h1>{props.data.Headers['Course-name']}</h1>
		</div>
		<div className={css(PDFstyle.info)}>
			{
				Object.keys(props.data.Headers).map((_, i) =>
					<div key={i}>{_}: {props.data.Headers[_]}</div>
				)
			}
		</div>
	</div>
)

const getHeight = (data: any, i:number) => {
	const total = data.Scores[i].scores.total
	const totalMarks = data["Total-marks"]
	const height = ( total / totalMarks ) * 400
	return Math.round(height)
}

const getRoundedHeight = (data: any, i: number) => {
	console.log("THE DATA", data)
	let height = getHeight(data, i) as any
	height = height.toString() + "px"
	return height
}

const getRoundedMargin = (data: any, i: number) => {
	let height = getHeight(data, i) as any
	height = 400 - height
	return height.toString() + "px"
}

const Histogram = (props: any) => (
	<div className={css(PDFstyle.graphContain)}>
		<div className={css(PDFstyle.columns)}>
			{
				props.data.Scores.map((data: any, i: number) =>
					<div key={i} className={css(PDFstyle.column)}>
						<div
							className={css(
								PDFstyle.columnBar,
								i === 0 && PDFstyle.first,
								i + 1 === props.data.Scores.length && PDFstyle.last
							)}
							style={{
								marginLeft: (4 / props.data.Scores.length).toString() + "%",
								marginRight: (4 / props.data.Scores.length).toString() + "%",
								width: ((100 / ( props.data.Scores.length) - (4 / props.data.Scores.length) * 2)).toString() + "%",
								backgroundColor: colors[i],
								height: getRoundedHeight(props.data, i),
								marginTop: getRoundedMargin(props.data, i)
							}}
						/>
						<div className={css(PDFstyle.xAxis)} />
						<div style={{ height: "10px", paddingRight: (50 / props.data.Scores.length).toString() + "%", }} >
							<span className={css(PDFstyle.axisNumbers)}>
								{props.data.Scores[i].scores.total}
							</span>
						</div>
					</div>
				)
			}
		</div>
		<div style={{ paddingTop: "15px" }}>
			Line
		</div>
	</div>
)

export default PDFTemplate;

