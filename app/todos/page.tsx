import { Priority, Todo } from '@/types/todo';
import { TodoList } from '@/components/base/todo-list';

const initialTodos: Todo[] = [
  {
    id:          '1',
    title:       'Buy groceries',
    description: 'Milk, Bread, Eggs, Butter',
    dueDate:     '2024-12-20',
    priority:    Priority.P1,
    completed:   false,
  },
  {
    id:          '2',
    title:       'Buy groceries',
    description: 'Milk, Bread, Eggs, Butter',
    dueDate:     '2024-12-20',
    priority:    Priority.P1,
    completed:   false,
  },
  {
    id:          '3',
    title:       'Buy groceries',
    description: 'Milk, Bread, Eggs, Butter',
    dueDate:     '2024-12-20',
    priority:    Priority.P1,
    completed:   false,
  },
  {
    id:          '4',
    title:       'Buy groceries',
    description: 'Milk, Bread, Eggs, Butter',
    dueDate:     '2024-12-20',
    priority:    Priority.P1,
    completed:   false,
  },
  {
    id:          '5',
    title:       'Buy groceries',
    description: 'Milk, Bread, Eggs, Butter',
    dueDate:     '2024-12-20',
    priority:    Priority.P1,
    completed:   false,
  },
  {
    id:          '6',
    title:       'Buy groceries',
    description: 'Milk, Bread, Eggs, Butter',
    dueDate:     '2024-12-20',
    priority:    Priority.P1,
    completed:   false,
  },
  {
    id:          '7',
    title:       'Buy groceries',
    description: 'Milk, Bread, Eggs, Butter',
    dueDate:     '2024-12-20',
    priority:    Priority.P1,
    completed:   false,
  },
];

export default function Todos() {
  return (
    <div>
      <h1>Todos</h1>
      <TodoList todos={initialTodos} />
    </div>
  );
}
