interface CollectionItem {
  id: number;
  date: Date;
  title: string;
}

type SortField = 'id' | 'date';
type SortDirection = 'asc' | 'desc';

class AdvancedIterator implements Iterable<CollectionItem> {
  private items: CollectionItem[];
  private sortField: SortField;
  private sortDirection: SortDirection;

  constructor(
    items: CollectionItem[],
    sortField: SortField = 'id',
    sortDirection: SortDirection = 'asc'
  ) {
    this.items = [...items];
    this.sortField = sortField;
    this.sortDirection = sortDirection;
    this.sortItems();
  }

  private sortItems(): void {
    this.items.sort((a, b) => {
      let comparison = 0;

      if (this.sortField === 'id') {
        comparison = a.id - b.id;
      } else {
        comparison = a.date.getTime() - b.date.getTime();
      }

      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  setSortStrategy(sortField: SortField, sortDirection: SortDirection): void {
    this.sortField = sortField;
    this.sortDirection = sortDirection;
    this.sortItems();
  }

  *[Symbol.iterator](): Iterator<CollectionItem> {
    for (const item of this.items) {
      yield item;
    }
  }

  *reverse(): Generator<CollectionItem> {
    for (let i = this.items.length - 1; i >= 0; i--) {
      yield this.items[i];
    }
  }

  *filter(
    predicate: (item: CollectionItem) => boolean
  ): Generator<CollectionItem> {
    for (const item of this.items) {
      if (predicate(item)) {
        yield item;
      }
    }
  }
}

const items: CollectionItem[] = [
  { id: 3, date: new Date('2023-01-15'), title: 'Тест3' },
  { id: 1, date: new Date('2023-01-10'), title: 'Тест1' },
  { id: 2, date: new Date('2023-01-12'), title: 'Тест2' },
  { id: 4, date: new Date('2023-01-20'), title: 'Тест4' },
];

const iterator = new AdvancedIterator(items);

iterator.setSortStrategy('date', 'desc');

console.log('\nСортировка по дате (desc):');
for (const item of iterator) {
  console.log(
    `ID: ${item.id}, Date: ${item.date.toISOString()}, Title: ${item.title}`
  );
}
