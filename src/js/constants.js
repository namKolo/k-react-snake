const Types = {
  Snake: 0,
  Food: 1,
  Blank: 2
};

const mapValueToType = {
  0: 'snake-cell',
  1: 'food-cell',
  2: 'blank-cell'
};

const Direction = {
  left: 37,
  up: 38,
  right: 39,
  down: 40
};

const ValidKeys = {
  37: true,
  38: true,
  39: true,
  40: true
};

export { Types, mapValueToType, Direction, ValidKeys };
