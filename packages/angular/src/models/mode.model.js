var Mode;
(function(Mode2) {
  Mode2["None"] = "";
  Mode2["iOS"] = "ios";
  Mode2["MD"] = "md";
  Mode2["MUI"] = "mui";
})(Mode || (Mode = {}));
const modes = Object.entries(Mode).map(([key, value]) => ({ key, value }));
export {
  Mode,
  modes
};
