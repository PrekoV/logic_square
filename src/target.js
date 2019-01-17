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
        const { color, isOver, connectDropTarget } = this.props;
        return connectDropTarget(
            <div className="target" style={{ border: 'solid 2px ' + color }}>
                {isOver &&
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        width: '100%',
                        backgroundColor: 'lightyellow'
                    }} > Put here </div>
                }
            </div>
        )
    }

}

export default DropTarget('Item', target, collect)(Target);