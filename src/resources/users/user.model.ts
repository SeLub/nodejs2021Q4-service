import { randomUUID } from "crypto"

/**
 * A class representing a User
 * @interface  UserInterface
 */

export interface UserInterface{
  id: string | null
  name: string
  login: string
  password?: string
}

/**
 * A class representing a User
 * @class  User
 */

export class User {
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
     /**
     * The id of User. It is geterated automatically upon creation of User/ 
     * @name  id
     * @type {uuid}
     */
        id = randomUUID(),
        name = "TEST_USER",
        login = "test_user",
        password = "T35t_P@55w0rd"} = {}) 
  {  
    this.id = id
    this.name = name
    this.login = login
    this.password = password
  }

   /**
   * Return User, without password.
   * @param user - User created.
   */

  static toResponse(user: UserInterface): UserInterface {
    const { id, name, login } = user
    return { id, name, login }
  }
}