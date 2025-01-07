import { CommonFields } from "./common.type";

export type  TaskAssigmentBase ={

wallet:string;
taskCuid:string;


}

export type TaskAssigment =  TaskAssigmentBase & CommonFields &{cuid?:string}