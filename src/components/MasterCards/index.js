import React, {useState} from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import googl from '../../images/GOOGL.png'
import fb from '../../images/FB.png'
import amzn from '../../images/AMZN.svg'
import './index.scss'

const masterCardsData = [
  {
    id: 'GOOGL',
    name: 'GOOGL',
    image: googl,
    price: 1515,
  },
  {
    id: 'FB',
    name: 'FB',
    image: fb,
    price: 266,
  },
  {
    id: 'AMZN',
    name: 'AMZN',
    image: amzn,
    price: 3116,
  },
]

const MasterCards = () =>{
  const [masterCards, changeMasterCardsOrder] = useState(masterCardsData)

  function handleOnDragEnd(result){
  if (!result.destination) return;

    const items = Array.from(masterCards);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    changeMasterCardsOrder(items);
  }

    return(
        <DragDropContext onDragEnd={handleOnDragEnd} className="master-cards-container">
          <Droppable droppableId='masterCards' direction="horizontal">
            {(provided)=>(
                <ul ref={provided.innerRef} className="master-cards" {...provided.droppableProps}>
                  {masterCards.map(({id, name, image, price}, index) => {
                    return(
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided) => (
                            <li ref={provided.innerRef} className="master-card" {...provided.draggableProps} {...provided.dragHandleProps}>
                              <div className="master-card-top-container">
                                <h1 className="master-card-heading">{name}</h1>
                                <img src={image} alt={name} className="master-card-img" />
                              </div>
                              <h1 className="master-card-price">{`${price}USD`}</h1>
                            </li>
                  )}
                        </Draggable>
                    )
                  })}
                </ul>
            )}
          </Droppable> 
        </DragDropContext>
    )
}

export default MasterCards