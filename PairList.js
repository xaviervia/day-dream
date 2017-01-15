const {List} = require('immutable-ext')
const pairToObject = ([key, value]) => ({[key]: value})

const PairList = x => ({
  x,
  concat: ({x: y}) => PairList(Object.assign({}, x, y)),
  fold: f => List(Object.keys(x))
    .map(key => f([key, x[key]]))
    .fold(),
  map: f =>
    List(Object.keys(x))
      .map(key => PairList(pairToObject(f([key, x[key]]))))
      .fold(PairList.empty())
})

PairList.empty = () => PairList({})

module.exports = PairList
