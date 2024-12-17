import { TodoList } from '@/components/base/todo-list';
import { getTodos } from '@/actions/get-todos';
import { TodoFilters } from '@/components/base/todo-filters';
import { SearchParams } from '@/types/searchParams';

interface Props {
  params: Promise<{id: string}>;
  searchParams: Promise<SearchParams>;
}

export default async function TodosPage(props: Props) {
  const searchParams = await props.searchParams;
  const todos = await getTodos(searchParams);

  return (
    <div className="m-5">
      <TodoFilters />
      <TodoList todos={todos} />
    </div>
  );
}
