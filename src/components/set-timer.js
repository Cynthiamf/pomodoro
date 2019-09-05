import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const SetTimer = ({type, label, value, handleClick}) => (
    <div className={"SetTimer"}>
        <div id={`${type}-label`}>{label}</div>
        <div className={"SetTimer-controls"}>
            <button
                type={"button"}
                id={`${type}-decrement`}
                onClick={() => handleClick(false, `${type}Value`)}>
                <FontAwesomeIcon icon={["fas", "minus"]} size={"2x"} />
            </button>
            <h1 id={`${type}-length`}>{value}</h1>
            <button
                type={"button"}
                id={`${type}-increment`}
                onClick={() => handleClick(true, `${type}Value`)}>
                <FontAwesomeIcon icon={["fas", "plus"]} size={"2x"} />
            </button>
        </div>
    </div>
);

export default SetTimer;
