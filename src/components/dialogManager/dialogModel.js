class Dialog {
  constructor(component, props, events, meta) {
    this.key = `key_${(new Date()).getTime()}_${parseInt(Math.random() * Math.random() * 1000000)}`
    this.component = component
    this.props = props
    this.events = events
    this.meta = meta
    this.show = false
    this.render = true
    this.confirmBtnLoading = false
    this.cancelBtnLoading = false
  }
}

export { Dialog }
