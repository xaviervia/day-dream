const Func = f => ({
  f,
  map: ff => Func(ff(f)),
  concat: ff => Func(x => ff.f(f(x))),
  fold: x => f(x)
})

Func.of = x => Func(() => x)
Func.empty = () => Func(x => x)

module.exports = Func
