class Animal {
  constructor(name) {
    this.name = name
  }
  // 叫
  spark() {
    console.log('spark----')
  }

}

const Dog = new Animal('dog')
console.log(Dog.spark())