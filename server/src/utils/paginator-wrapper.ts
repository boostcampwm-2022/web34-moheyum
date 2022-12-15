import mongoose from 'mongoose';

interface PageUnit {
  _id: mongoose.Types.ObjectId;
}

export interface Page<T extends PageUnit> {
  post: T[];
  next: string;
}

export function paginatorWrapper<T extends PageUnit>(data: T[]): Page<T> {
  return {
    post: data,
    next: data.length > 0 ? data.at(-1)._id.toString() : '',
  };
}
