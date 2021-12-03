import { v4 as uuidv4 } from 'uuid'

export default class User {
  constructor({    
    name = 'TEST_USER',
    login = 'test_user',
    password = 'T35t_P@55w0rd'
  } = {}) {
    this.id = uuidv4()
    this.name = name
    this.login = login
    this.password = password
  }
}
