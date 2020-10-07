// function to convert a percentage value to HEX
const percentToHex = (value) => {
  let decimal = Math.round(value * 255);

  if (value < 0.07) {
    return "0" + decimal.toString(16).toUpperCase();
  }

  return value < 0.07
    ? "0" + decimal.toString(16).toUpperCase()
    : decimal.toString(16).toUpperCase();
};

// function to get HEX value from [r,g,b]
const getHex = (r, g, b) => {
  return "#" + percentToHex(r) + percentToHex(g) + percentToHex(b);
};

// function to get color from a color-template component
function getColor() {
  const page = figma.currentPage;
  const colorTemplate = page.findChild((a) => a.name === "color-template");

  if (colorTemplate.type !== "COMPONENT") {
    return;
  }

  let colorName = colorTemplate.findChild(
    (a) => a.name === "color-name" && a.type === "TEXT"
  );
  let colorValue = colorTemplate.findChild((a) => a.name === "color-preview");

  if (colorName.type !== "TEXT") {
    return;
  }

  if (colorValue.type !== "RECTANGLE") {
    return;
  }

  let r = colorValue.fills[0].color.r;
  let g = colorValue.fills[0].color.g;
  let b = colorValue.fills[0].color.b;
  console.log("getHex", getHex(r, g, b));
  return getHex(r, g, b);
}

let a = getColor();

// Make sure to close the plugin when you're done. Otherwise the plugin will
// keep running, which shows the cancel button at the bottom of the screen.
figma.closePlugin();
