import { ObjectId } from 'bson';

export type User = {
  _id?: ObjectId;
  username: string;
  password: string;
};

export type DetailCardProps = {
  poster_path: string;
  overview?: string;
  vote_average: number;
};
