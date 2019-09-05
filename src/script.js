import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/header";
import SetTimer from "./components/set-timer";
import Timer from "./components/timer";
import Controls from "./components/controls";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fab} from "@fortawesome/free-brands-svg-icons";
import {
    faPlay,
    faPause,
    faHistory,
    faPlus,
    faMinus,
} from "@fortawesome/free-solid-svg-icons";

library.add(fab, faPlay, faPause, faHistory, faPlus, faMinus);

const formatedtime = time => {
    const secRestante = time / 1000;
    const min = Math.floor(secRestante / 60);
    const sec = secRestante % 60;

    return `${min.toString().padStart(2, "0")} : ${sec
        .toString()
        .padStart(2, "0")}`;
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breakValue: 5,
            sessionValue: 25,
            time: 25 * 60 * 1000,
            active: false,
            mode: "session",
        };
        this.onSetTimers = this.onSetTimers.bind(this);
        this.onPlayPause = this.onPlayPause.bind(this);
        this.onReset = this.onReset.bind(this);
    }

    componentDidUpdate() {
        if (this.state.time === 0 && this.state.mode === "session") {
            this.setState(prevState => ({
                time: prevState.breakValue * 60 * 1000,
                mode: "break",
            }));
            this.audio.play();
        }
        if (this.state.time === 0 && this.state.mode === "break") {
            this.setState(prevState => ({
                time: prevState.sessionValue * 60 * 1000,
                mode: "session",
            }));
            this.audio.play();
        }
    }

    onSetTimers(inc, type) {
        if (inc && this.state[type] === 60) {
            return;
        }
        if (!inc && this.state[type] === 1) {
            return;
        }
        this.setState(prevState => ({
            [type]: prevState[type] + (inc ? 1 : -1),
        }));
    }

    onPlayPause() {
        if (this.state.active) {
            this.setState({active: false}, () => clearInterval(this.pomodoro));
        } else {
            if (!this.state.touched) {
                this.setState(
                    prevState => ({
                        time: prevState.sessionValue * 60 * 1000,
                        active: true,
                        touched: true,
                    }),
                    () => {
                        this.pomodoro = setInterval(
                            () =>
                                this.setState(prevState => ({
                                    time: prevState.time - 1000,
                                })),
                            1000,
                        );
                    },
                );
            } else {
                this.setState(
                    {
                        active: true,
                        touched: true,
                    },
                    () => {
                        this.pomodoro = setInterval(
                            () =>
                                this.setState(prevState => ({
                                    time: prevState.time - 1000,
                                })),
                            1000,
                        );
                    },
                );
            }
        }
    }

    onReset() {
        this.setState({
            breakValue: 5,
            sessionValue: 25,
            time: 25 * 60 * 1000,
            active: false,
            mode: "session",
            touched: false,
        });
        this.audio.pause();
        this.audio.currentTime = 0;
        clearInterval(this.pomodoro);
    }

    render() {
        return (
            <div>
                <Header />
                <div className={"settings"}>
                    <SetTimer
                        type={"session"}
                        label={"Work"}
                        value={this.state.sessionValue}
                        handleClick={this.onSetTimers}
                    />
                    <SetTimer
                        type={"break"}
                        label={"Break"}
                        value={this.state.breakValue}
                        handleClick={this.onSetTimers}
                    />
                </div>
                <Timer
                    mode={this.state.mode}
                    time={formatedtime(this.state.time)}
                />
                <Controls
                    active={this.state.active}
                    handleReset={this.onReset}
                    handlePlayPause={this.onPlayPause}
                />
                <audio
                    id={"beep"}
                    src={
                        "https://s3-us-west-1.amazonaws.com/benjaminadk/Data+synth+beep+high+and+sweet.mp3"
                    }
                    ref={ref => {
                        this.audio = ref;
                    }}
                />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector("#root"));
