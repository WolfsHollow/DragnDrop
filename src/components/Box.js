import React, { useState, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd';

//https://codesandbox.io/s/github/react-dnd/react-dnd/tree/gh-pages/examples_js/00-chessboard?from-embed
//https://react-dnd.github.io/react-dnd/examples/tutorial

const Box = ({ name, url, id, created }) => {

    const [boxURL, setboxURL] = useState(url);

    let ref = useRef(null);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'picture',
        item: { id: id, url: url },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),

    }));

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'picture',
        drop: (item) => addImageToBoard(item.id, item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        })
    }));

    const addImageToBoard = (id, item) => {
        console.log(id, item);
        setboxURL(item.url);
    }

    // const collect = (connect, monitor) => ({
    //     highlighted: monitor.canDrop(),
    //     hovered: monitor.isOver(),
    //     connectDropTarget: connect.dropTarget()
    // });

    let backgroundColor = 'rgba(0, 0, 0, .5)'
    if (isOver) {
        backgroundColor = 'darkgreen'
    }

    return (
        <>
            {boxURL !== undefined ?
                <img alt='' ref={(box) => drag(drop(box))} src={boxURL} style={{ width: "150px" }} name={name} id={id} />
                :
                <div ref={(box) => drag(drop(box))} style={{ backgroundColor: backgroundColor }} className='box' name={name} id={id} >{name}</div>
            }
        </>
    )
}

export default Box
