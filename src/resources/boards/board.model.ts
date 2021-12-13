import { randomUUID } from "crypto"

export type ColumnsType = {
  id: string | null
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
          { id:null, title: 'Backlog', order: 1 },
          { id:null, title: 'Sprint', order: 2 }
        ] } = {} as Board)
        {
              this.id = randomUUID()
              this.title = title
              this.columns = columns
        }
}