// Simple Vanilla JS Event System
class Emitter {
  constructor(obj) {
    this.obj = obj
    this.eventTarget = document.createDocumentFragment()
    ;['addEventListener', 'dispatchEvent', 'removeEventListener'].forEach(
      this.delegate,
      this,
    )
  }

  delegate(method) {
    this.obj[method] = this.eventTarget[method].bind(this.eventTarget)
  }
}

class Events {
  constructor(host) {
    this.host = host
    new Emitter(host) // add simple event system
    host.on = (eventName, func) => {
      host.addEventListener(eventName, func)
      return host
    }
  }

  trigger(event, detail, ev) {
    if (typeof event === 'object' && event instanceof Event)
      return this.host.dispatchEvent(event)

    if (!ev) ev = new Event(event, { bubbles: false, cancelable: true })

    ev.detail = { ...(detail || {}), host: this.host }

    return this.host.dispatchEvent(ev)
  }
}

export class IntentEvent {
  // Create new instances of the same class as static attributes
  static DISPLAY = new IntentEvent(1 << 1)
  static CREATE = new IntentEvent(1 << 2)
  static UPDATE = new IntentEvent(1 << 3)
  static DELETE = new IntentEvent(1 << 4)
  static ADD = new IntentEvent(1 << 5)
  static REMOVE = new IntentEvent(1 << 6)
  static ALL = [
    IntentEvent.DISPLAY,
    IntentEvent.CREATE,
    IntentEvent.UPDATE,
    IntentEvent.DELETE,
    IntentEvent.ADD,
    IntentEvent.REMOVE,
  ]

  constructor(id) {
    this._id = id
  }

  get id() {
    return this._id
  }
}

export class StateChangeEvent {
  // Create new instances of the same class as static attributes
  static LOADED = new StateChangeEvent(1 << 7)
  static CREATED = new StateChangeEvent(1 << 8)
  static UPDATED = new StateChangeEvent(1 << 9)
  static DELETED = new StateChangeEvent(1 << 10)
  static ADDED = new StateChangeEvent(1 << 11)
  static REMOVED = new StateChangeEvent(1 << 12)
  static ALL = [
    StateChangeEvent.LOADED,
    StateChangeEvent.CREATED,
    StateChangeEvent.UPDATED,
    StateChangeEvent.DELETED,
    StateChangeEvent.ADDED,
    StateChangeEvent.REMOVED,
  ]

  constructor(id) {
    this._id = id
  }

  get id() {
    return this._id
  }
}

export class MVPEvent {
  constructor(event, state) {
    this._event = event
  }

  isIntent() {
    return IntentEvent.ALL.includes(this._event)
  }

  isStateChange() {
    return StateChangeEvent.ALL.includes(this._event)
  }

  get event() {
    return this._event
  }

  get state() {
    return this._state
  }
}

export default Events
