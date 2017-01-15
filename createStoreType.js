const createStoreType = (reducer, emptyState) => {
  const Store = state => ({
    state,
    concat: ({state: action}) => Store(reducer(state, action)),
    fold: f => f(state),
    inspect: () => `Store(${JSON.stringify(state)})`,
    map: f => Store(f(state))
  })

  Store.empty = () => Store(emptyState)
}

module.exports = createStoreType
