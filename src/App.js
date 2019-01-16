import React, { Component } from 'react'

class App extends Component {

	state = {
		activeColor: 'red',
		passiveColor: 'lightgrey',
		list: [
			{
				id: 0, rows:
					[{ id: 0, color: 'lightgrey' }, { id: 1, color: 'lightgrey' }, { id: 2, color: 'lightgrey' }]
			},
			{
				id: 1, rows:
					[{ id: 0, color: 'lightgrey' }, { id: 1, color: 'lightgrey' }, { id: 2, color: 'lightgrey' }]
			},
			{
				id: 2, rows:
					[{ id: 0, color: 'lightgrey' }, { id: 1, color: 'lightgrey' }, { id: 2, color: 'lightgrey' }]
			}
		],
		maxCols: 3,
		maxRows: 3
	}

	colorElem = (colId, rowId) => {
		console.log("Enter square: " + colId + " " + rowId)
		let currentArray = [...this.state.list];
		let col = this.state.maxCols
		let row = this.state.maxRows

		if (currentArray[colId].rows[rowId].color != this.state.activeColor) {
			currentArray[colId].rows[rowId].color = this.state.activeColor;
			console.log("CHANGE COLOR")
		} else {
			if (!currentArray[colId + 1]) {
				currentArray.push({
					id: currentArray.length,
					rows: []
				})
				for (let i = 0; i < row; i++) {
					currentArray[colId + 1].rows.push({
						id: i, color: this.state.passiveColor
					})
				}
				console.log("PUSH ARRAY")
				currentArray[colId + 1].rows[rowId].color = this.state.activeColor

			} else if (currentArray[colId].rows[rowId].color === this.state.activeColor
				&& currentArray[colId + 1].rows[rowId].color === this.state.passiveColor) {

				currentArray[colId + 1].rows[rowId].color = this.state.activeColor

			} else if (currentArray[colId].rows[rowId].color === this.state.activeColor
				&& currentArray[colId + 1].rows[rowId].color === this.state.activeColor) {

				if (!currentArray[colId].rows[rowId + 1] && this.state.list[colId + 1].rows[rowId].color === this.state.activeColor) {
					for (let i = 0; i < col; i++) {
						currentArray[i].rows.push({
							id: currentArray[i].rows.length,
							color: this.state.passiveColor
						})
					}
					currentArray[colId].rows[rowId + 1].color = this.state.activeColor

				} else if (currentArray[colId].rows[rowId].color === this.state.activeColor
					&& currentArray[colId + 1].rows[rowId].color === this.state.activeColor
					&& currentArray[colId].rows[rowId + 1].color === this.state.passiveColor) {

					currentArray[colId].rows[rowId + 1].color = this.state.activeColor

				} else

					if (currentArray[colId - 1]
						&& currentArray[colId].rows[rowId].color === this.state.activeColor
						&& currentArray[colId + 1].rows[rowId].color === this.state.activeColor
						&& currentArray[colId].rows[rowId + 1].color === this.state.activeColor
						&& currentArray[colId - 1].rows[rowId].color === this.state.passiveColor
					) {
						currentArray[colId - 1].rows[rowId].color = this.state.activeColor
					}
					else if (currentArray[colId].rows[rowId - 1]
						&& currentArray[colId].rows[rowId].color === this.state.activeColor
						&& currentArray[colId + 1].rows[rowId].color === this.state.activeColor
						&& currentArray[colId].rows[rowId + 1].color === this.state.activeColor
						&& (currentArray[colId - 1]
							&& currentArray[colId - 1].rows[rowId].color === this.state.activeColor
							|| !currentArray[colId - 1])
						&& currentArray[colId].rows[rowId - 1].color === this.state.passiveColor
					) {
						currentArray[colId].rows[rowId - 1].color = this.state.activeColor
					}
			}
		}

		col = currentArray.length
		row = currentArray[0].rows.length

		this.setState({ list: currentArray, maxCols: col, maxRows: row })
		console.log(this.state.list)
		console.log(this.state.maxCols + " " + this.state.maxRows)
	}

	render() {

		return (
			<div className="App">
				<div className="list" style={{ display: 'flex' }}>
					{
						this.state.list.map(elem => {
							return (
								<div key={elem.id}>
									{
										elem.rows.map(item => {
											return (
												<div className="item"
													key={item.id}
													style={{ margin: 20, width: 80, height: 80, border: 'solid 2px ' + item.color }}
													onClick={() => this.colorElem(elem.id, item.id)}
												>
												</div>
											)
										})
									}
								</div>
							)
						})
					}
				</div>
			</div>
		);
	}
}

export default App