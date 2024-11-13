export type Task = {
  _id: string;
  taskName: string;
  meekPoints: number;
  owner: string;
  dateCreated: Date;
  status: string;
};

export type TaskCompleted = {
  _id: string;
  taskName: string;
  meekPoints: number;
  owner: string;
  dateCreated: Date;
};

export type Points = {
  total: number;
  month: number;
};
