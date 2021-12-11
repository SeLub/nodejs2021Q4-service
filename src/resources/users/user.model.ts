import { randomUUID } from "crypto"

export interface UserInterface{
  id: string | null
  name: string
  login: string
  password?: string
}

export class User {
    id: string | null

    name: string

    login: string

    password?: string

  constructor({
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

  static toResponse(user: UserInterface): UserInterface {
    const { id, name, login } = user
    return { id, name, login }
  }
}