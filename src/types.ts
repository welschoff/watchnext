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
  poster_path?: string | undefined;
  overview?: string;
  vote_average?: number;
  first_air_date?: string;
  genres?: GenreProps[];
  saved?: boolean;
  trailerId?: string;
};

export type ActorProps = {
  character: string;
  name: string;
  profile_path: string | null;
};
