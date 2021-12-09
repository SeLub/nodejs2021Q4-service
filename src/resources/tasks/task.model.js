import { randomUUID } from "crypto";

export interface Task{
  id: string | null;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
}

export class Task implements Task{

  constructor({ 
        title = "Autotest task",
        order = 0,
        description = "Lorem ipsum",
        userId = null,
        boardID = null,
        columnID =null } = {})
  {
        this.id = randomUUID();
        this.title = title;
        this.order = order;
        this.description = description;
        this.userId = userId;
        this.boardId = boardID;
        this.columnId = columnID;
  }
}