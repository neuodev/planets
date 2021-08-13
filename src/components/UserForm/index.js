import React from "react";

const UserForm = ({ planetsText, setPlanetsText, generate }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    generate();
  };
  return (
    <div className="bg-indigo-500 w-full h-1/3">
      <form
        onSubmit={onSubmit}
        className="flex items-center flex-col justify-center h-full "
      >
        <div className="flex items-start justify-center flex-row w-1/2 ">
          <div className="flex items-start justify-center flex-col w-full ">
            <input
              value={planetsText}
              onChange={(e) => setPlanetsText(e.target.value)}
              className="w-full focus:outline-none focus:ring-4 rounded-md py-2 px-4"
              placeholder="ex: Mercury, Venus, Mars, Saturn"
            />
            <small className="text-xs text-indigo-200 mt-2 text-left">
              Please enter coma seperated values
            </small>
          </div>
          <button className="ml-4 text-indigo-500 bg-indigo-200 py-2 px-4 rounded-md hover:text-indigo-600 hover:bg-white">
            Generate
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
