import { StateCreator, create } from "zustand";
import type { Task,TaskStatus } from "../../interfaces";
import { devtools } from "zustand/middleware";


interface TaskState {


    draggingTaskId?: string

    //task:{[key: string]:Task}// es lo mismo que lo de abajo
    tasks: Record<string, Task>

    getTaskByStatus:(status:TaskStatus)=>Task[]

    setDraggingTaskId:(taskId:string)=>void
    removeDraggingTaskId:()=>void
}


const storeApi:StateCreator<TaskState,[["zustand/devtools", never]]>=(set,get)=>({

    draggingTaskId: undefined,

    tasks:{
        'ABC-1':{id:'ABC-1',title:'Task 1',status:'open'},
        'ABC-2':{id:'ABC-2',title:'Task 2',status:'in-progress'},
        'ABC-3':{id:'ABC-3',title:'Task 3',status:'open'},
        'ABC-4':{id:'ABC-4',title:'Task 4',status:'open'},
        },

        getTaskByStatus:(status:TaskStatus)=>{
           const tasks=get().tasks;
           return Object.values(tasks).filter(task=>task.status===status)
        },

        setDraggingTaskId:(taskId:string)=>{set({draggingTaskId:taskId})},

        removeDraggingTaskId:()=>{set({draggingTaskId:undefined})}
})

export const useTaskStore = create<TaskState>()(
    devtools(
        storeApi
    )
)
