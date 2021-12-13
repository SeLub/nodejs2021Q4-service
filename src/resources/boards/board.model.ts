import { randomUUID } from "crypto"

export type ColumnsType = {
  id?: string
  title: string
  order: number
}

export class Board {
  id: string | null

  title: string

  columns: ColumnsType[]

  constructor({
        title = "Autotest board",
        columns = [
          { title: 'Backlog', order: 1 },
          { title: 'Sprint', order: 2 }
        ] } = {} as Board)
        {
              this.id = randomUUID()
              this.title = title
              this.columns = columns
        }
}