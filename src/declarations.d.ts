export interface IFieldQuery<T> {
  $eq?: T;
  $ne?: T;
  $lt?: T;
  $gt?: T;
  $gte?: T;
  $lte?: T;
  $iLike: T;
  $nin?: T[];
  $in?: T[];
}

export interface IQuery {
  $limit?: number;
  $skip?: number;

  $or?: {
    [key: string]: any | IFieldQuery<any>;
  }[];

  [key: string]: any | IFieldQuery<any>;
}
