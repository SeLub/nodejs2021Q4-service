import { RequestGenericInterface } from "fastify";
import { ColumnsType } from "../resources/boards/board.model.js";

export interface idRequest extends RequestGenericInterface {
      Params: { id: string };
    }
    
export interface userBodyRequest extends RequestGenericInterface {
      Body: {   
        name: string,
        login: string,
        password: string, 
      };
    }
export interface boardBodyRequest extends RequestGenericInterface {
      Body: {   
        title: string,
        columns: Array<ColumnsType>,
      };
    }
    
export interface fullRequestUser extends RequestGenericInterface {
      Body: {   
        name: string,
        login: string,
        password: string, 
      };
      Params: { id: string };
    }
export interface fullRequestBoard extends RequestGenericInterface {
      Body: {   
            title: string,
            columns: Array<ColumnsType>,
          };
      Params: { id: string };
    }
export interface paramsRequestTask extends RequestGenericInterface {
      Params: { boardId: string;
                taskId: string;
               };
    }
export interface fullRequestTask extends RequestGenericInterface {
      Params: { boardId: string;
                taskId: string;
               };
      Body: {
            title: string,
            order: number,
            description: string,
            userId: string|null,
            columnId: string|null
    }
    }