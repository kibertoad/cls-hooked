const NODE_MAJOR_VERSION = process.versions.node.split('.')[0];

function isNode8Plus() {
  return NODE_MAJOR_VERSION >= 8
}

function isNode10Plus() {
  return NODE_MAJOR_VERSION >= 10
}

function isNode12Plus() {
  return NODE_MAJOR_VERSION >= 12
}

function isNode14Plus() {
  return NODE_MAJOR_VERSION >= 12
}

module.exports = {
  isNode8Plus,
  isNode10Plus,
  isNode12Plus,
  isNode14Plus
}
