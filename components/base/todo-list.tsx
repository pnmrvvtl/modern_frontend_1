'use client';

import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Trash, Edit } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

import { Todo } from '@/types/todo';

interface TodoListProps {
  todos: Todo[];
}

export function TodoList({ todos }: TodoListProps) {
  return (
    <div className="space-y-4 mb-4">
      {todos.map((todo) => (
        <Accordion type="single" collapsible key={todo.id} className="border rounded-md">
          <AccordionItem value={todo.id.toString()}>
            <div className="flex justify-between items-center p-4">
              <div className="flex items-center space-x-4">
                <Checkbox id={`completed-${todo.id}`} checked={todo.completed} />
                <div>
                  <div className="font-medium text-lg">{todo.title}</div>
                  <div className="text-sm text-gray-500">
                    Priority: {todo.priority} | Due: {new Date(todo.dueDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {}}
                  aria-label="Edit Todo"
                >
                  <Edit className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {}}
                  aria-label="Delete Todo"
                >
                  <Trash className="w-5 h-5 text-red-500" />
                </Button>
              </div>
            </div>
            <AccordionTrigger className="p-4 border-t">
              View Description
            </AccordionTrigger>
            <AccordionContent className="p-4 bg-gray-50">
              {todo.description || 'No description provided.'}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}
