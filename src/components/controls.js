import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Controls = ({active, handleReset, handlePlayPause}) => (
    <div className={"Controls"}>
        <button type={"button"} id={"start_stop"} onClick={handlePlayPause}>
            {active ? (
                <span>
                    <FontAwesomeIcon icon={["fas", "pause"]} size={"2x"} />
                </span>
            ) : (
                <span>
                    <FontAwesomeIcon icon={["fas", "play"]} size={"2x"} />
                </span>
            )}
        </button>
        <button type={"button"} id={"reset"} onClick={handleReset}>
            <FontAwesomeIcon icon={["fas", "history"]} size={"2x"} />
        </button>
    </div>
);

export default Controls;
