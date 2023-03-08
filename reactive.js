let evaluatedEffect = null

function state(initialValue) {
  const dependencies = new Set()
  const observers = new Set()

  let value = initialValue

  function set(newValue) {
    value = newValue
    observers.forEach((fn) => fn())
  }

  function get() {
    if (evaluatedEffect) observers.add(evaluatedEffect)
    return value
  }

  return { get, set }
}

function effect(fn) {
  evaluatedEffect = fn
  evaluatedEffect()
  evaluatedEffect = null
}

function computed(fn) {
  let computedValue = state()
  effect(() => computedValue.set(fn()))
  return { get: computedValue.get }
}
