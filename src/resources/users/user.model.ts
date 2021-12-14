import { randomUUID } from "crypto"

export default class User {
    id: string | null

    name: string

    login: string

    password?: string
  /**
   * Create a User.
   * @param {name} x - The name of User.
   * @param {login} y - The login of User.
   * @param {password} y - The password of User.
   */

  constructor({
    name = "TEST_USER",
    login = "test_user",
    password = "T35t_P@55w0rd"} = {} as User) 
  {  
    this.id = randomUUID()
    this.name = name
    this.login = login
    this.password = password
  }

  static toResponse(user: User): User {
    const { id, name, login } = user
    return { id, name, login }
  }
}