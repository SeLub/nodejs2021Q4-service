import { v4 as uuidv4 } from 'uuid'

export default class User {
  constructor({    
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = uuidv4()
    this.name = name
    this.login = login
    this.password = password
  }


}

const nUser = new User('Sergey','Login', 'Pass')
console.log(nUser)