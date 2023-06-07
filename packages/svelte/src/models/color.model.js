var Color;
(function(Color2) {
  Color2["Primary"] = "primary";
  Color2["Secondary"] = "secondary";
  Color2["Tertiary"] = "tertiary";
  Color2["Success"] = "success";
  Color2["Warning"] = "warning";
  Color2["Danger"] = "danger";
  Color2["Light"] = "light";
  Color2["Medium"] = "medium";
  Color2["Dark"] = "dark";
})(Color || (Color = {}));
const colors = Object.entries(Color).map(([key, value]) => ({ key, value }));
export {
  Color,
  colors
};
