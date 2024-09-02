import React from "react";

const USAState = (props) => {
  return (
    <path d={props.dimensions} fill={props.fill} data-name={props.state} data-state-name={props.stateName} className={`${props.state} state`} onClick={props.onClickState} onMouseOver={props.onMouseOverState}>
      <title>{props.stateName}</title>
    </path>
  );
}
export default USAState;
