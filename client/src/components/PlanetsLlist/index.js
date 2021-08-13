import React, { useEffect, useState } from "react";
import Planet from "./Planet";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";

const PlanetsList = ({ planets }) => {
  const [planetsList, setPlanetsList] = useState([]);

  useEffect(() => {
    if (planetsList.length === 0) setPlanetsList(planets);
  }, [planets, planetsList]);

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
  const capture = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:9000/screenshot",
        { plants: planetsList },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const link = document.createElement("a");
      link.href = data.filePath;
      link.download = "Plants.html";
      link.target = "_blank";
      link.click();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="w-full text-center mt-6">
        <button
          onClick={capture}
          className="bg-indigo-300 text-indigo-700 px-12 py-2 rounded-md uppercase tracking-wider shadow-md"
        >
          Capture
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              id="screenshot"
              className=" flex items-center justify-center flex-col mt-6"
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
