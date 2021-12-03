import { v4 as uuidv4 } from 'uuid';

export default class Board {
  constructor({
    id = uuidv4(),
    title = 'Autotest board',
    columns = [
    { title: 'Backlog', order: 1 },
    { title: 'Sprint', order: 2 }
  ]
  
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}
