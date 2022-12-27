export type IBranch = {
  id: number;
  title: String;
  url: String;
  count: number;
  children?: IBranch[];
  checked?: boolean;
};
