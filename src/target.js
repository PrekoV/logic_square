import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

const target = {
    drop(props, monitor, component) {
        props.colorElem(props.i, props.j)

    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
        itemType: monitor.getItemType(),
        item: monitor.getItem()
    };
}


class Target extends Component {
    render() {
        const { item, isOver, connectDropTarget } = this.props;
        const color = item !== 1 ? 'grey' : 'red'
        return connectDropTarget(
            <div className="item" style={{
                margin: 20,
                width: 80,
                height: 80,
                //  border: ' solid 2px red'
                border: 'solid 2px ' + color
            }}>
                {isOver &&
                    <div style={{
                        height: '100%',
                        width: '100%',
                        backgroundColor: 'yellow'
                    }} > fuck </div>
                }
            </div>
        )
    }

}

export default DropTarget('Item', target, collect)(Target);