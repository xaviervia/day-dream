const MergeMap = x => ({
  x,
  concat: ({x: y}) => MergeMap(Object.assign({}, x, y)),
  fold: (f) => f(x),
  inspect: () => `MergeMap(${JSON.stringify(x)})`
})

MergeMap.empty = () => MergeMap({})

module.exports = MergeMap
