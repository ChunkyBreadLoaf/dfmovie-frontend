import { MovieDto } from "./movies.model";

export type CreateCategoryDto = {
  name: string;
  translationKey: string;
  movies?: string[]
}

export type UpdateCategoryDto = {
  name?: string;
  translationKey?: string;
  movies?: string[];
}

export type CategoryDto = {
  _id: string,
  updatedTime: string,
  createdTime: string,
  translationKey: string,
  name: string,
  movies: MovieDto
}
