export interface Task {
    id: number;
    title: string;
    description: string;
    dueDate: Date;
    status: 'Open' | 'Pending' | 'In Progress' | 'Completed';
  }
  