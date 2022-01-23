/**
 * Typing for server requests.
 * @module Interfacies
 * @category Server
 */
 import { RequestGenericInterface } from "fastify";
 
 export interface IColumn {
  id: string;
  title: string;
  order: number;
}
export interface IBoard {
  id: string;
  title: string;
  columns: IColumn[];
}

 export interface idRequest extends RequestGenericInterface {
       Params: { userId: string };
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
         columns: IColumn[],
       };
     }
     
 export interface fullRequestUser extends RequestGenericInterface {
       Body: {   
         name: string,
         login: string,
         password: string, 
       };
       Params: { userId: string };
     }
 export interface fullRequestBoard extends RequestGenericInterface {
       Body: {   
             title: string,
             columns: IColumn[],
           };
       Params: { boardId: string };
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
 export interface paramsInRequest extends RequestGenericInterface {
       Params: { boardId: string;
                 taskId: string;
                 userId: string;
                };
     }
 