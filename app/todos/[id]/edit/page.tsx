import { SearchParams } from '@/types/searchParams';
import { TodoForm } from '@/components/base/todo-form';
import getTodo from '@/actions/get-todo';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{id: string}>;
  searchParams: Promise<SearchParams>;
}

export default async function EditTodo(props: Props) {
  const { id } = await props.params;

  const todo = await getTodo(parseInt(id));

  if (!todo) {
    notFound();
  }

  return (
    <div className="m-5 w-[40vw] mx-auto">
      <TodoForm todo={todo} />
    </div>
  );
}
