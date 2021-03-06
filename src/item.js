import React, { Component } from 'react'
import { DragSource } from 'react-dnd'

const itemSource = {

    beginDrag(props) {
        return {};
    },

    endDrag(props, monitor) {
        if (monitor.didDrop()) {
            return;
        }
    }
}

function collect(connect, monitor) {
    return {
        // Call this function inside render()
        // to let React DnD handle the drag events:
        connectDragSource: connect.dragSource(),
        connectDragPrewiew: connect.dragPreview(),
        // You can ask the monitor about the current drag state:
        isDragging: monitor.isDragging()
    };
}

class Item extends Component {
    render() {
        const { connectDragSource } = this.props;
        return connectDragSource(
            <div className="item">
                Take this
            </div>
        )
    }
}

export default DragSource('Item', itemSource, collect)(Item);