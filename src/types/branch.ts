export type IBranch = {
  id: number;
  title: string;
  url: string;
  count: number;
  children?: IBranch[];
  checked?: boolean;
};
