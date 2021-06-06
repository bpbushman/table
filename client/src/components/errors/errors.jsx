import React from "react";

const Errors = (props) => {
  return (
    <div>
      {Object.keys(props.errors).length > 0 && (
        <div className="errors-container">
          <ul>
            {Object.values(props.errors).map((error) => {
              return <li key={error}>{error}</li>;
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Errors;
