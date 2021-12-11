import { randomUUID } from "crypto"

export type ColumnsType = {
  id?: string
  title: string
  order: number
}

export class Board {
  title: string

  id?: string

  columns: ColumnsType[]

  constructor({
        id =randomUUID(),
        title = "Autotest board",
        columns = [
          { title: 'Backlog', order: 1 },
          { title: 'Sprint', order: 2 }
        ] } = {})
        {
              this.id = id
              this.title = title
              this.columns = columns
        }
}