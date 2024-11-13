export type Question = {
  id: number;
  created_at: Date;
  topic: string;
  question: string;
  answer: string;
  username: string;
  date_shown: Date;
};

export type Card = {
  question: string;
  answer: string;
};
