import { IoCheckmarkCircleOutline, IoEllipsisHorizontalOutline} from 'react-icons/io5';
import { Task, TaskStatus } from '../../interfaces';
import { SingleTask } from './SingleTask';
import { DragEvent } from 'react';
import { useTaskStore } from '../../stores';
interface Props {
  title: string;
  task:Task[]
  value: TaskStatus
}


export const JiraTasks = ({ title,value,task }: Props) => {

const isDragging=useTaskStore(state=>!!state.draggingTaskId)

//console.log('isDragging:',{isDragging})

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation();
    console.log('handleDragOver')
  }
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    console.log('handleDragLeave')
  }
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    console.log('handleDrop',value)
  }

  return (
    <div
       onDragOver={(e)=>{handleDragOver(e)}}
       onDragLeave={(e)=>{handleDragLeave(e)}}
       onDrop={(e)=>handleDrop(e)}
       className="!text-black border-4 border-blue-500 border-dotted first-letter:relative flex flex-col rounded-[20px]  bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px]">

      {/* Task Header */ }
      <div className="relative flex flex-row justify-between">

        <div className="flex items-center justify-center">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100">
            <span className="flex justify-center items-center h-6 w-6 text-brand-500">
              <IoCheckmarkCircleOutline style={ { fontSize: '50px' } } />
            </span>
          </div>

          <h4 className="ml-4 text-xl font-bold text-navy-700">{ title }</h4>
        </div>

        <button>
          <IoEllipsisHorizontalOutline />
        </button>

      </div>

      {/* Task Items */ }
      <div className="h-full w-full">

        {task.map(task =>(
          <SingleTask 
             key={task.id}
             task={task}          
          />
        ))
      }

        

      </div>
    </div>
  );
};