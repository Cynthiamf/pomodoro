import React from "react";

const Timer = ({mode, time}) => (
    <div className={"Timer"}>
        <h1 id={"timer-label"}>{mode === "session" ? "Work " : "Break "}</h1>
        <h1 id={"time-left"}>{time}</h1>
    </div>
);

export default Timer;
