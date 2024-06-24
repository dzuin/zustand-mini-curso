import { DragEvent, useState } from "react"
import Swal from "sweetalert2"
import { useTaskStore } from "../stores"
import { TaskStatus } from "../interfaces"

interface Options{
    status:TaskStatus,

}

export const useTasks = ({status}:Options) => {

    const isDragging=useTaskStore(state=>!!state.draggingTaskId)
    const onTaskDrop=useTaskStore(state=>state.onTaskDrop)
    const addTask=useTaskStore(state=>state.addTask)
    
    const [onDragOver,setOnDragOver]=useState(false)
    
    const handleAddTask=async() => {
      const {isConfirmed,value}= await Swal.fire({
        title:'Nueva Tarea',
        input:'text',
        inputLabel:'Nombre de la Tarea',
        inputPlaceholder:'Ingrese el Nombre de la Tarea',
        showCancelButton:true,
        inputValidator:(value) =>{
          if(!value){
            return 'Debe ingresar un nombre para la tarea'
          }
          
        },
      })
    
      if(!isConfirmed) return
      addTask(value,status)
    
      console.log(value)
      //addTask('Nuevo titulo',value)
    }
    
    
    //console.log('isDragging:',{isDragging})
    
      const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation();
        setOnDragOver(true)
        //console.log('handleDragOver')
      }
      const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setOnDragOver(false)
        //console.log('handleDragLeave')
      }
      const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setOnDragOver(false)
    
        onTaskDrop(status)
    
        //console.log('handleDrop',value)
      }




  return {
    //Properties
    isDragging,

    //Methods
    onDragOver,
    handleAddTask,
    handleDragOver,
    handleDragLeave,
    handleDrop
  }
    
  
}
