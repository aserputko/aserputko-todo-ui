import type { TodoStatus } from '@/shared/api/graphql/schema.generated';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';

const ALL = 'All';

const items: { value: TodoStatus | typeof ALL; label: string }[] = [
  { value: ALL, label: 'All' },
  { value: 'Todo', label: 'To do' },
  { value: 'InProgress', label: 'In progress' },
  { value: 'Done', label: 'Done' },
];

type TodosStatusFilterProps = {
  value: TodoStatus | undefined;
  onChange: (value: TodoStatus | undefined) => void;
};

export function TodosStatusFilter({ value, onChange }: TodosStatusFilterProps) {
  return (
    <Select
      items={items}
      value={value ?? ALL}
      onValueChange={(next) => next && onChange(next === ALL ? undefined : (next as TodoStatus))}
    >
      <SelectTrigger aria-label='Filter by status' className='w-48'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
