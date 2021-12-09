import { randomUUID } from "crypto";

export interface User{
  id: string | null;
  name: string;
  login: string;
  password?: string;
}

export class User implements User {
  constructor({
        id = randomUUID(),
        name = "TEST_USER",
        login = "test_user",
        password = "T35t_P@55w0rd"} = {}) 
  {  
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }
}