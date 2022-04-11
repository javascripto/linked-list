// @ts-check
export default class LinkedList {
  static Node = (value) => ({ value, next: null, previous: null });

  #length = 0;
  #head = null;
  #tail = null;

  get length() {
    return this.#length;
  }

  get head() {
    return this.#head ? { ...this.#head } : null;
  }

  get tail() {
    return this.#tail ? { ...this.#tail } : null;
  }

  set length(_) {}
  set head(_) {}
  set tail(_) {}

  add(value) {
    this.#length++;
    const tail = LinkedList.Node(value);
    if (this.#head) {
      tail.previous = this.#tail;
      this.#tail.next = tail;
      return (this.#tail = tail);
    } else {
      return (this.#tail = this.#head = tail);
    }
  }

  getByIndex(index) {
    if (index < 0 || index >= this.#length || index === undefined) {
      return null;
    }
    const startLoopFromHead = index < this.#length / 2;
    if (startLoopFromHead) {
      let current = this.#head;
      for (let i = 0; i < index; i++) {
        current = current.next;
      }
      return current;
    }
    let current = this.#tail;
    for (let i = this.#length - 1; i > index; i--) {
      current = current.previous;
    }
    return current;
  }

  removeIndex(index) {
    if (index < 0 || index >= this.#length || index === undefined) {
      return;
    }
    if (index === 0) {
      if (this.#head === this.#tail) {
        this.#head = this.#tail = null;
      } else {
        this.#head = this.#head.next;
        this.#head.previous = null;
      }
    } else if (index === this.#length - 1) {
      const current = this.#tail;
      this.#tail = current.previous;
      this.#tail.next = null;
      current.previous = null;
    } else {
      const current = this.getByIndex(index);
      current.previous.next = current.next;
      current.next.previous = current.previous;
      current.previous = current.next = null;
    }
    this.#length--;
  }

  log() {
    console.log([...this]);
  }

  *[Symbol.iterator]() {
    let current = this.#head;
    while (current) {
      yield current.value;
      current = current.next;
    }
  }
}
