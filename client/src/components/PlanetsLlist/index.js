import React, { useEffect, useState } from "react";
import Planet from "./Planet";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const PlanetsList = ({ planets }) => {
  const [planetsList, setPlanetsList] = useState([]);

  useEffect(() => {
    if (planetsList.length == 0) setPlanetsList(planets);
  }, [planets]);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      planetsList,
      result.source.index,
      result.destination.index
    );

    setPlanetsList(items);
  };

  function capture() {}

  return (
    <>
      <button onClick={capture}>Capture</button>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              className="flex items-center justify-center flex-col mt-6"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {planetsList.map((planet, index) => (
                <Draggable key={index} draggableId={planet.name} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Planet
                        planet={planet}
                        isDragging={snapshot.isDragging}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default PlanetsList;
