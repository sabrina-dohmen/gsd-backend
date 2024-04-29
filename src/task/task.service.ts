import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

import jsondata from '../common/tasks-test-data.json';
import noCategoryTasksTestData from '../common/test-data-inbox.json';

const currentDate = new Date('2023-02-10T07:30:00.0000');
// const currentDate = new Date('2023-03-02T18:00:00.0000');

const staticCategories = [
  { id: 1, name: "Accionables", code: 'A' },
  { id: 2, name: "Tickler file", code: 'T' },
  { id: 3, name: "Incubadora", code: 'I' }
]
const noTag = { id:0, name:"Sin etiquieta", color:"afafaf", tasks: [] };

// import { Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskService {

  // constructor(
    // // @InjectRepository(Task)
    // private readonly tasksRepository: Repository<Task>
  // ) {}

  findAllInbox() {
    // const tasksDB = this.tasksRepository.createQueryBuilder('Task') // for database (in future)
    // const tasksDB = {...jsondata};
    const tasksDB = {...noCategoryTasksTestData};

    const withoutCategory = tasksDB.body.filter(element => element.category == null);
    let message = 'Ok';

    if(withoutCategory.length < 1) message = 'Sin tareas por aquí...';
    if(withoutCategory.length >= 10) message = 'Cada cosa en su lugar. Organiza tus tareas en las otras secciones. Al final del día el inbox debe quedar vacío.';

    return { body: withoutCategory, message: message}
    // return `This is the INBOX`;
  }

  findAllActionables() {
    const tasksDB = {...jsondata};
    const actionableDBType = staticCategories.filter(element => element.code == 'A')[0];

    let message = 'Ok';
    let body = { scheduled: [], backlog: [] };

    const actionableTasks = tasksDB.body.filter(element => element.category?.id == actionableDBType.id);
    if(actionableTasks.length >= 10) message = 'Guarda tus tareas en la Incubadora hasta que puedas realizarlas o agendalas para más adelante.';
    if(actionableTasks.length < 1) message = 'Sin tareas por aquí...';

    actionableTasks.map(element => {

      // if(new Date(element.date) < currentDate) console.log('fecha pasada', element.date)
      // if(new Date(element.date) > currentDate) console.log('fecha futura', element.date)
      
      (element.date) ? body.scheduled.push(element.date) : body.backlog.push({...element, date:null});

    });

    const sortedArray = this.orderByDate(actionableTasks);

    return { body: sortedArray, message: message};
  }

  findAllTicklers() {
    const tasksDB = {...jsondata};
    const ticklerDBType = staticCategories.filter(element => element.code == 'T')[0];
    const incubatorDBType = staticCategories.filter(element => element.code == 'I')[0];
    const ticklerTasks = tasksDB.body.filter(element => element.category?.id == ticklerDBType.id);

    let onlyWithDates = [];    
    ticklerTasks.map(element => {
      (element.date) ? onlyWithDates.push(element) : element.category = {...incubatorDBType};
    });

    // save incubator new data

    const sortedArray = this.orderByDate(ticklerTasks);

    let message = 'Ok';
    let body = { body: sortedArray, message: message};
    return body;
  }

  findAllIncubator(){
    const tasksDB = {...jsondata};
    const incubatorDBType = staticCategories.filter(element => element.code == 'I')[0];
    const incubatorTasks = tasksDB.body.filter(element => element.category?.id == incubatorDBType.id);

    const tasksByTag = {};
    incubatorTasks.forEach(element => {
    const taskElement = {...element};
      if(element.tag) {
        const { id, name, color } = element.tag;
        delete taskElement.tag;
        if (!tasksByTag[id]) tasksByTag[id] = { id, name, color, tasks: [] };
        tasksByTag[id].tasks.push(taskElement);
      } else {
        if(!tasksByTag[0]) tasksByTag[0] = { ...noTag};
        tasksByTag[0].tasks.push(taskElement);
      }
    })
    const tagsWithTasks = Object.values(tasksByTag);

    let message = 'Ok';
    let body = { body: tagsWithTasks, message: message};
    return body;
  }

  findAllToday(){
    const tasksDB = {...jsondata};
    let todayTasks = []
    tasksDB.body.forEach(element => {
      if(element.date) {
        const taskDate = new Date(element.date)
        if(taskDate.toString().split('T')[0] == currentDate.toString().split('T')[0]) {
          todayTasks.push(element)
        }
      }
    })

    let message = 'Ok';

    if(todayTasks.length > 10) message = 'Ten en cuenta que tu tiempo es limitado. Organiza tus tareas para realizarlas mañana o más adelante';

    let body = { body: todayTasks, message: message};
    return body;
  }
  
  orderByDate(array) {
    return array.sort(function(a,b){
      return a.date?.localeCompare(b.date);
    })
  }

  create(createTaskDto: CreateTaskDto) {
    return 'This action adds a new task';
  }

  findAll() {
    return `This action returns all task`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
