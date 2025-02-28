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

  const currentFilters = {
    title:       searchParams.get('title') || '',
    description: searchParams.get('description') || '',
    due_date:    searchParams.get('due_date') || '',
    priority:    searchParams.get('priority') || 'Any',
    completed:   searchParams.get('completed') || 'Any',
    sort:        searchParams.get('sort') || '',
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const query: Record<string, string> = {};

    const title = formData.get('title')?.toString().trim();
    const description = formData.get('description')?.toString().trim();
    const due_date = formData.get('due_date')?.toString();
    const priority = formData.get('priority')?.toString();
    const completed = formData.get('completed')?.toString();
    const sort = formData.get('sort')?.toString();

    if (title) query.title = title;
    if (description) query.description = description;
    if (due_date) query.due_date = due_date;
    if (priority && priority !== 'Any') query.priority = priority;
    if (completed && completed !== 'Any') query.completed = completed;
    if (sort) query.sort = sort;

    const queryString = new URLSearchParams(query).toString();
    router.push(`/todos?${queryString}`);
  };

  const handleReset = () => {
    router.push('/todos');
  }

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded-md bg-white shadow-sm w-full mb-8">
      <h2 className="text-xl font-semibold mb-4">Filter Todos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

        <div>
          <Label htmlFor="due_date">Due Date</Label>
          <Input
            id="due_date"
            name="due_date"
            type="date"
            defaultValue={currentFilters.due_date}
            className="mt-1"
          />
        </div>

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

        <div>
          <Label htmlFor="sort">Sort By</Label>
          <Select name="sort" defaultValue={currentFilters.sort || "due_date:asc"}>
            <SelectTrigger id="sort" className="mt-1 w-full">
              <SelectValue placeholder="Select Sort Option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="due_date:asc">Due Date (Ascending)</SelectItem>
              <SelectItem value="due_date:desc">Due Date (Descending)</SelectItem>
              <SelectItem value="priority:asc">Priority (Low to High)</SelectItem>
              <SelectItem value="priority:desc">Priority (High to Low)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2.5">
        <Button type="submit">Filter</Button>
        <Button type="button" onClick={handleReset}>Reset</Button>
      </div>
    </form>
  );
}
