import React, { Component } from 'react'
import Item from './item';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import Target from './target';

class App extends Component {

	state = {
		list: [
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0]
		]
	}

	colorElem = (rowId, colId) => {
		console.log("Enter square: " + colId + " " + rowId)
		let list = [...this.state.list]

		if (list[rowId][colId] === 0) {
			list[rowId][colId] = 1
		} else if (list[rowId - 1] && list[rowId - 1][colId] === 0) {
			list[rowId - 1][colId] = 1
		} else if (list[rowId][colId + 1] === 0) {
			list[rowId][colId + 1] = 1
		} else if (!list[rowId][colId + 1]) {
			console.log(list[rowId][colId + 1])
			for (let i = 0; i < list.length; i++) {
				list[i].push(0)
			}
			list[rowId][colId + 1] = 1
		} else if (!list[rowId + 1]) {
			list.push([])
			for (let i = 0; i < list[0].length; i++) {
				list[list.length - 1].push(0)
			}
			list[rowId + 1][colId] = 1
		} else if (list[rowId + 1] && list[rowId + 1][colId] === 0) {
			list[rowId + 1][colId] = 1
		} else if (list[rowId][colId - 1] === 0) {
			list[rowId][colId - 1] = 1
		}

		this.setState({ list })
		console.log(this.state)
	}

	render() {
		console.log('render')
		return (
			<div className="App" style={{ display: 'flex', height: '100vh', width: '100vw' }}>
				<div style={{ borderRight: 'solid 3px black', height: '100%' }}>
					<Item />
				</div>
				<div className="target" style={{ backgroundColor: 'lightgrey', width: '100%' }}>
					<div style={{ fontSize: 24, backgroundColor: 'black', color: 'white', padding: 5, paddingLeft: '40%' }}>Drag'n'Drop App</div>
					<div className="list" style={{ display: 'flex', flexDirection: 'column', marginLeft: 40, marginTop: 40 }}>
						{this.state.list.map((elem, i) => {
							return (
								<div key={i} style={{ display: 'flex', flexDirection: 'row' }}>
									{elem.map((item, j) => {
										return (

											<Target key={j}
												colorElem={this.colorElem}
												i={i}
												j={j}
												item={item}
												style={{
													margin: 20,
													width: 80,
													height: 80,
													//	border: `solid 2px lightgrey`
												}}
											/>

											// <div className="item"
											// 	key={j}
											// 	style={{
											// 		margin: 20,
											// 		width: 80,
											// 		height: 80,
											// 		border: `solid 2px ${item !== 1 ? 'lightgrey' : 'red'}`
											// 	}}
											// 	colorElem = {this.colorElem}
											// 	i = {i}
											// 	j = {j}
											// 	item = {item}
											// 	onClick={() => this.colorElem(i, j)}
											// >
											// </div>
										)
									})
									}
								</div>
							)
						})}
					</div>
				</div>
			</div>
		);
	}
}

export default DragDropContext(HTML5Backend)(App)