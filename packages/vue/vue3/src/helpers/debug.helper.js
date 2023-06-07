var DebugLevel;
(function(DebugLevel2) {
  DebugLevel2[DebugLevel2["None"] = 0] = "None";
  DebugLevel2[DebugLevel2["Log"] = 1] = "Log";
  DebugLevel2[DebugLevel2["Breakpoint"] = 2] = "Breakpoint";
})(DebugLevel || (DebugLevel = {}));
let debugLevel = 0;
const debugStrategies = {
  [0]: () => null,
  [1]: (message) => console.log(message),
  [2]: (message) => {
    console.log(message);
    debugger;
  }
};
function setDebugLevel(level) {
  debugLevel = level;
}
function debug(message) {
  debugStrategies[debugLevel](message);
}
export {
  DebugLevel,
  debug,
  setDebugLevel
};
