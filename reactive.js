let target = null

function state(initialValue) {
  const observers = new Set()

  let value = initialValue

  function set(newValue) {
    value = newValue
    observers.forEach((fn) => fn())
  }

  function get() {
    if (target) observers.add(target)
    return value
  }

  return { get, set }
}

function effect(fn) {
  target = fn
  target()
  target = null
}

function computed(fn) {
  let computedVal = state()
  effect(() => computedVal.set(fn()))
  return { get: computedVal.get }
}
