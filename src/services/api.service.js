import { ChallengerService, 
    ChallengesService, 
    GetToDoService, 
    GetToDoByIdService, 
    GetToDoWithErrorService, 
    PostTodoService, 
    DeleteService,
    HeadToDoService,
    PutTodoService
} from './index';

export class Api {
     constructor(request) {
        this.request = request;
        this.challenger = new ChallengerService(request);
        this.challenges = new ChallengesService(request);
        this.todos = new GetToDoService(request);
        this.todoGet = new GetToDoByIdService(request);
        this.todo = new GetToDoWithErrorService(request);
        this.postTodo = new PostTodoService(request);
        this.deleteTodo = new DeleteService(request);
        this.headTodo = new HeadToDoService(request);
        this.putTodo = new PutTodoService(request);
    }
}