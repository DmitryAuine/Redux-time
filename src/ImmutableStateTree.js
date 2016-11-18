export default class ImmutableStateTree {
  constructor() {
    this.root = []
    this.pointer = -1
  }

  add(data) {
    this.movePointerForward()

    if (this.indexSize() > this.pointer - 1) {
      this.replaceRoot(this.root.slice(0, this.pointer))
    }

    this.root[this.pointer] = {
      ...this.root[this.pointer - 1],
      ...data
    }
  }

  movePointerBack() {
    if (this.canMoveBack()){
      this.pointer--
    }

    return this
  }

  movePointerForward() {
    if (this.canMoveForward()) {
      this.pointer++
    }

    return this
  }

  canMoveBack() {
    return (this.pointer - 1 >= 0)
  }

  canMoveForward() {
    return (this.pointer + 1 >= this.indexSize())
  }

  getState() {
    return this.root[this.pointer]
  }

  replaceRoot(newRoot) {
    this.root = newRoot;
  }

  indexSize() {
    return this.root.length - 1
  }
}
