# day-dream

An playground collection of Fantasy Land types that I find useful.

```
yarn add day-dream
```

### Box

Just a container where to put any value that allows you to then `map` over it. Apparently this is called the ["identity functor"](https://egghead.io/lessons/javascript-linear-data-flow-with-container-style-types-box). Taken straight from the examples, I’m putting it in a lib because I couldn’t find it anywhere in fantasy-land or related libs.

```javascript
import {Box} from 'day-dream'
// or import Box from 'day-dream/Box'

Box({a: 'b'})
  .map({a} => a)
  .map(s => s.toUpperCase())
  .fold(x => x) === 'B'
```

### createStoreType

This function allows you to create a Redux inspired Store type that is a Monoid, Foldable and Functor.

An example is worth a thousand explanations:

```javascript
import {createStoreType} from 'day-dream'
// or import createStoreType from 'day-dream/createStoreType'

const CounterStore = createStoreType(
  (state, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return {
          value: state.value + 1
        }

      case 'DECREMENT':
        return {
          value: state.value - 1
        }

      default:
        return state
    }
  },
  {
    value: 0
  }
)

const store = CounterStore.empty()

store
  .concat(CounterStore({type: 'INCREMENT'}))
  .concat(CounterStore({type: 'INCREMENT'}))
  .concat(CounterStore({type: 'INCREMENT'}))
  .concat(CounterStore({type: 'DECREMENT'}))
  .fold(({value}) => value) === 2
```

`map` does what you would expect

### Func

Wrap a function to support composition via `concat`, apply higher-order functions to it via `map` and run it with `fold`.

```javascript
import {Func} from 'day-dream'
// or import Func from 'day-dream/Func'

const addTuple = Func(([a, b]) => a + b)

addTuple.concat(Func(x => x * 3)).fold([2, 5]) === 21
```

### MergeMap

This is a type very similar to [`immutable-ext`](https://github.com/DrBoolean/immutable-ext)’s `Map`, with the difference that the `concat` function of this type does an object assign between the two MergeMaps instead of running concat on every value.

```javascript
import {deepEqual} from 'assert'
import {MergeMap} from 'day-dream'
// or import MergeMap from 'day-dream/MergeMap'

deepEqual(
  MergeMap({a: 1}).concat(MergeMap({b: 2})).fold(x => x),
  {a: 1, b: 2}
)

deepEqual(
  MergeMap({a: 1, b: 2}).concat(MergeMap({b: 3, c: 4})).fold(x => x),
  {a: 1, b: 3, c: 4}
)
```

## Credits

- https://github.com/DrBoolean
- https://github.com/fantasyland/fantasy-land

## License

MIT
