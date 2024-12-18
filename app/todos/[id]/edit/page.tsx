import { SearchParams } from '@/types/searchParams';
import { TodoForm } from '@/components/base/todo-form';
import getTodo from '@/actions/get-todo';

interface Props {
  params: Promise<{id: string}>;
  searchParams: Promise<SearchParams>;
}

export default async function EditTodo(props: Props) {
  const { id } = await props.params;

  const todo = await getTodo(parseInt(id));

  return (
    <div>
      <TodoForm todo={todo} />
    </div>
  );
}
