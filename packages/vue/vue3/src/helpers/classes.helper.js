function classesToString(classes) {
  let stringWithClasses = "";
  classes.map((className) => {
    if (Array.isArray(className) && className[0]) {
      stringWithClasses += ` ${className[1]}`;
    }
    if (!Array.isArray(className)) {
      stringWithClasses += ` ${className}`;
    }
  });
  return stringWithClasses;
}
export {
  classesToString
};
