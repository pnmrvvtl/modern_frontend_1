'use client';

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Todo } from "@/types/todo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TodoFormProps {
  todo?: Todo;
  onSubmit?: (formData: FormData) => void;
  onDelete?: () => void;
}

export function TodoForm({ todo, onSubmit, onDelete }: TodoFormProps) {
  const isEditMode = !!todo;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit?.(formData);
  };

  return (
    <div className="border p-4 rounded-md bg-white shadow-sm max-w-md w-full">
      <div className="flex justify-between items-center mb-4">
        {isEditMode && (
          <Button variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        )}
        {isEditMode && todo && (
          <div className="text-sm text-gray-500 flex-1 ml-4">
            Priority: {todo.priority} | Due: {todo.dueDate} | Task: {todo.title}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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
          />
        </div>

        <div>
          <Label htmlFor="dueDate">Due Date</Label>
          <Input
            id="dueDate"
            name="dueDate"
            type="date"
            defaultValue={todo?.dueDate ? new Date(todo.dueDate).toISOString().slice(0, 10) : ""}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="priority">Priority</Label>
          <Select
            onValueChange={(value) => {
              console.log(value);
            }}
            defaultValue={todo?.priority ?? "P3"}
          >
            <SelectTrigger id="priority" name="priority" className="mt-1 w-full">
              <SelectValue placeholder="Select a priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="P1">P1</SelectItem>
              <SelectItem value="P2">P2</SelectItem>
              <SelectItem value="P3">P3</SelectItem>
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

        <div>
          <Button type="submit" className="w-full">
            {isEditMode ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
}
