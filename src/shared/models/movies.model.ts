export type CreateMovieDto = {
  title: string;
  poster: string;
  description: string;
  translationKey: string;
  categories?: string[];
};

export type UpdateMovieDto = {
  title?: string;
  poster?: string;
  description?: string;
  translationKey?: string;
  categories?: string[];
};

export type MovieDto = {
  _id: string;
  updatedTime: string;
  createdTime: string;
  translationKey: string;
  description: string;
  poster: string;
  title: string;
  categories: string[];
};
