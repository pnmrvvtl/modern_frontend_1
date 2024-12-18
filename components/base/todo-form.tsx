'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Priority, Todo } from '@/types/todo';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import createTodo from '@/actions/create-todo';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import updateTodo from '@/actions/update-todo';

interface TodoFormProps {
  todo?: Todo;
}

export function TodoForm({ todo }: TodoFormProps) {
  const isEditMode = !!todo;

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let newTodoId: number;

    try {
      if (isEditMode) {
        await updateTodo(formData);
      } else {
        newTodoId = await createTodo(formData);
        router.push(`/todos/${newTodoId}/edit`)
      }

      toast({
        title:       'Success',
        description: isEditMode ? 'Todo updated successfully!' : 'Todo created successfully!',
        variant:     'default',
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="border p-4 rounded-md bg-white shadow-sm w-[40vw] m-5">
      <form onSubmit={handleSubmit} className="space-y-6">
        <input type="hidden" name="id" value={todo?.id} />

        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            type="text"
            defaultValue={todo?.title ?? ""}
            placeholder="Title"
            className="mt-1"
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            defaultValue={todo?.description ?? ""}
            placeholder="Description"
            className="mt-1"
            required
          />
        </div>

        <div>
          <Label htmlFor="dueDate">Due Date</Label>
          <Input
            id="dueDate"
            name="dueDate"
            type="date"
            defaultValue={todo?.due_date ? new Date(todo.due_date).toISOString().slice(0, 10) : ""}
            className="mt-1"
            required
          />
        </div>

        <div>
          <Label htmlFor="priority" className="block text-lg font-medium text-gray-700">
            Priority
          </Label>
          <Select
            defaultValue={todo?.priority.toString() ?? Priority.P1.toString()}
            name="priority"
            required
          >
            <SelectTrigger
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.values(Priority).map(el => typeof el === 'string' && (
                <SelectItem value={el.toString()} key={el.toString()}>{el.toString()}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="completed"
            name="completed"
            defaultChecked={todo?.completed ?? false}
          />
          <Label htmlFor="completed">Is Completed</Label>
        </div>

        <div className="flex items-center justify-center">
          <Button type="submit" className="w-[200px]">
            {isEditMode ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </div>
  );
}
