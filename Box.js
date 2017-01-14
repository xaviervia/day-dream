const Box = x => ({
  x,
  map: f => Box(f(x)),
  inspect: () => `Box(${x})`,
  fold: f => f(x)
})

module.exports = Box
