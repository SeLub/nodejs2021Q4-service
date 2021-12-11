import { randomUUID } from "crypto"

export default class Task{
  id?: string | null

  title: string

  order: number

  description: string

  userId: string | null

  boardId: string | null

  columnId: string | null

  constructor({ 
        id = randomUUID(),
        title = "Autotest task",
        order = 0,
        description = "Lorem ipsum",
        userId = null,
        boardId = null,
        columnId = null, } = {} as Task)
  {
      this.id = id
      this.title = title
      this.order = order
      this.description = description
      this.userId = userId
      this.boardId = boardId
      this.columnId = columnId
  }
}