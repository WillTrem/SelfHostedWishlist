export type Item = {
  id: number;
  image_url: string;
  name: string;
  price: string;
  url: string;
  website: string;
};

export type ItemInsert = {
  id?: never;
  image_url: string;
  name: string;
  price: string;
  url: string;
  website: string;
};
