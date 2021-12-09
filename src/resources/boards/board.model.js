import { randomUUID } from "crypto";

export type Columns = {
  id: string;
  title: string;
  order: number;
}

export interface Board{
  id: string;
  title: string;
  columns: Columns[];
}

export class Board implements Board{
  constructor({
        id = randomUUID(),
        title = "Autotest board",
        columns = [{id:'null', title: 'Backlog', order: 1 }, {id:'null', title: 'Sprint', order: 2 }] } = {})
        {
              this.id = id;
              this.title = title;
              this.columns = columns;
        }
}