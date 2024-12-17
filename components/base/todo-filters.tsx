// /components/FilterForm.tsx

'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Priority } from '@/types/todo';

export function TodoFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract existing query parameters to prepopulate the form
  const currentFilters = {
    title:       searchParams.get('title') || '',
    description: searchParams.get('description') || '',
    dueDate:     searchParams.get('dueDate') || '',
    priority:    searchParams.get('priority') || 'Any',
    completed:   searchParams.get('completed') || 'Any',
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const query: Record<string, string> = {};

    const title = formData.get('title')?.toString().trim();
    const description = formData.get('description')?.toString().trim();
    const dueDate = formData.get('dueDate')?.toString();
    const priority = formData.get('priority')?.toString();
    const completed = formData.get('completed')?.toString();

    if (title) query.title = title;
    if (description) query.description = description;
    if (dueDate) query.dueDate = dueDate;
    if (priority && priority !== 'Any') query.priority = priority;
    if (completed && completed !== 'Any') query.completed = completed;

    const queryString = new URLSearchParams(query).toString();
    router.push(`/todos?${queryString}`);
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded-md bg-white shadow-sm w-full mb-8">
      <h2 className="text-xl font-semibold mb-4">Filter Todos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Title */}
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            type="text"
            defaultValue={currentFilters.title}
            placeholder="Title"
            className="mt-1"
          />
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            name="description"
            type="text"
            defaultValue={currentFilters.description}
            placeholder="Description"
            className="mt-1"
          />
        </div>

        {/* Due Date */}
        <div>
          <Label htmlFor="dueDate">Due Date</Label>
          <Input
            id="dueDate"
            name="dueDate"
            type="date"
            defaultValue={currentFilters.dueDate}
            className="mt-1"
          />
        </div>

        {/* Priority */}
        <div>
          <Label htmlFor="priority">Priority</Label>
          <Select name="priority" defaultValue={currentFilters.priority}>
            <SelectTrigger id="priority" className="mt-1 w-full">
              <SelectValue placeholder="Select Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Any">Any</SelectItem>
              {Object.values(Priority).map((p) => (
                <SelectItem key={p} value={p.toString()}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Completed */}
        <div>
          <Label htmlFor="completed">Completed</Label>
          <Select name="completed" defaultValue={currentFilters.completed}>
            <SelectTrigger id="completed" className="mt-1 w-full">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Any">Any</SelectItem>
              <SelectItem value="true">Completed</SelectItem>
              <SelectItem value="false">Not Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Button type="submit">Filter</Button>
      </div>
    </form>
  );
}
