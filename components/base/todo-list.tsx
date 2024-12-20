'use client';

import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Trash, Edit } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

import { Todo } from '@/types/todo';
import { useRouter } from 'next/navigation';
import deleteTodo from '@/actions/delete-todo';
import { toast } from '@/hooks/use-toast';

interface TodoListProps {
  todos: Todo[];
}

export function TodoList({ todos }: TodoListProps) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    setLoadingId(id);

    const formData = new FormData();
    formData.append('id', id.toString());

    try {
      await deleteTodo(formData);
      toast({
        title:       'Deleted',
        description: 'The todo was deleted successfully!',
        variant:     'default',
      });
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        title:       'Error',
        description: 'Failed to delete the todo. Please try again.',
        variant:     'destructive',
      });
    } finally {
      setLoadingId(null);
    }
  };

  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-md text-center">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">No Todos Found</h2>
        <p className="text-gray-500 mb-4">
          {`It seems you don't have any todos yet. Start by creating one or adjust your filters.`}
        </p>
        <Button onClick={() => router.push('/todos/new')} className="bg-blue-500 hover:bg-blue-600 text-white">
          Create a New Todo
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 mb-4">
      {todos.map((todo) => (
        <Accordion type="single" collapsible key={todo.id} className="border rounded-md">
          <AccordionItem value={todo.id.toString()}>
            <div className="flex justify-between items-center p-4">
              <div className="flex items-center space-x-4">
                <Checkbox id={`completed-${todo.id}`} checked={todo.completed} className="cursor-auto" title="Click on edit button, if you want to edit 'completed' field"/>
                <div>
                  <div className="font-medium text-lg">{todo.title}</div>
                  <div className="text-sm text-gray-500">
                    Priority: {todo.priority} | Due: {new Date(todo.due_date).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => router.push(`/todos/${todo.id}/edit`)}
                  aria-label="Edit Todo"
                >
                  <Edit className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Delete Todo"
                  onClick={() => handleDelete(+todo.id)}
                  disabled={loadingId === todo.id}
                >
                  {loadingId === todo.id ? (
                    <span className="animate-spin w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full"></span>
                  ) : (
                    <Trash className="w-5 h-5 text-red-500" />
                  )}
                </Button>
              </div>
            </div>
            <AccordionTrigger className="p-4 border-t">View Description</AccordionTrigger>
            <AccordionContent className="p-4 bg-gray-50">
              {todo.description || 'No description provided.'}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}
