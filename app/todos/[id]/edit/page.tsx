import { Button } from '@/components/ui/button';
import { SearchParams } from '@/types/searchParams';

interface Props {
  params: Promise<{id: string}>;
  searchParams: Promise<SearchParams>;
}

export default async function EditTodo(props: Props) {
  const { id } = await props.params;

  return (
    <div>
      <h1>Edit todo {id}</h1>
      <Button>Click me</Button>
    </div>
  );
}
