var _ReactDOM;function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const Header = () => React.createElement("h1", null, " Pomodoro Clock ");

const SetTimer = ({ type, value, handleClick }) =>
React.createElement("div", { className: "SetTimer" },
React.createElement("div", { id: `${type}-label` }, type === 'session' ? 'Session ' : 'Break ', "Length"),
React.createElement("div", { className: "SetTimer-controls" },
React.createElement("button", { id: `${type}-decrement`, onClick: () => handleClick(false, `${type}Value`) }, "\u276E"),
React.createElement("h1", { id: `${type}-length` }, value),
React.createElement("button", { id: `${type}-increment`, onClick: () => handleClick(true, `${type}Value`) }, "\u276F")));




const Timer = ({ mode, time }) =>
React.createElement("div", { className: "Timer" },
React.createElement("h1", { id: "timer-label" }, mode === 'session' ? 'Session' : 'Break'),
React.createElement("h1", { id: "time-left" }, time));



const Controls = ({ active, handleReset, handlePlayPause }) =>
React.createElement("div", { className: "Controls" },
React.createElement("button", { id: "start_stop", onClick: handlePlayPause },
active ? React.createElement("span", null, "\u23F8") : React.createElement("span", null, "\u23EF")),

React.createElement("button", { id: "reset", onClick: handleReset }, "\uD83D\uDD04"));



class App extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "handleSetTimers",





















    (inc, type) => {
      if (this.state[type] === 60 && inc) return;
      if (this.state[type] === 1 && !inc) return;
      this.setState({ [type]: this.state[type] + (inc ? 1 : -1) });
    });_defineProperty(this, "handleReset",

    () => {
      this.setState({
        breakValue: 5,
        sessionValue: 25,
        time: 25 * 60 * 1000,
        mode: 'session',
        touched: false,
        active: false });

      clearInterval(this.pomodoro);
      this.audio.pause();
      this.audio.currentTime = 0;

    });_defineProperty(this, "handlePlayPause",

    () => {
      if (this.state.active) {
        clearInterval(this.pomodoro);
        this.setState({ active: false });
      } else {
        if (this.state.touched) {
          this.pomodoro = setInterval(() => this.setState({ time: this.state.time - 1000 }), 1000);
          this.setState({ active: true });
        } else {
          this.setState({
            time: this.state.sessionValue * 60 * 1000,
            touched: true,
            active: true }, () => this.pomodoro = setInterval(() => this.setState({ time: this.state.time - 1000 }), 1000));
        }
      }
    });this.state = { breakValue: 5, sessionValue: 25, mode: "session", time: 25 * 60 * 1000, active: false, touched: false };}componentDidUpdate(prevProps, prevState) {if (prevState.time === 0 && prevState.mode === "session") {this.setState({ time: this.state.breakValue * 60 * 1000, mode: "break" });this.audio.play();}if (prevState.time === 0 && prevState.mode === 'break') {this.setState({ time: this.state.sessionValue * 60 * 1000, mode: "session" });this.audio.play();}}


  render() {
    return (
      React.createElement("div", null,
      React.createElement(Header, null),
      React.createElement("div", { className: "settings" },
      React.createElement(SetTimer, { type: "break", value: this.state.breakValue, handleClick: this.handleSetTimers }),
      React.createElement(SetTimer, { type: "session", value: this.state.sessionValue, handleClick: this.handleSetTimers })),

      React.createElement(Timer, { mode: this.state.mode, time: moment(this.state.time).format('mm:ss') }),
      React.createElement(Controls, {
        active: this.state.active,
        handleReset: this.handleReset,
        handlePlayPause: this.handlePlayPause }),

      React.createElement("audio", {
        id: "beep",
        src: "",
        ref: el => this.audio = el })));




  }}


(_ReactDOM = ReactDOM) === null || _ReactDOM === void 0 ? void 0 : _ReactDOM.render(React.createElement(App, null), document.getElementById('root'));