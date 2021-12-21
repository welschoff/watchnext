import { ObjectId } from 'bson';

export type User = {
  _id?: ObjectId;
  username: string;
  password: string;
};

export type FriendsPageProps = {
  username: string;
};

export type GenreProps = {
  name: string;
};

export type SeriesProps = {
  id?: number;
  name?: string;
  poster_path: string;
  overview?: string;
  vote_average?: number;
  first_air_date?: string;
  genres: GenreProps[];
  saved?: boolean;
};
