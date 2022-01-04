import {
  Equal,
  FindManyOptions,
  ILike,
  In,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Not,
} from 'typeorm';

import { DEFAULT_PAGINATION_LIMIT, DEFAULT_PAGINATION_SKIP } from './variables';

import { IQuery } from 'src/declarations';

export const mapQueryToFindOptions = ({
  $limit,
  $skip,
  ...where
}: IQuery): FindManyOptions => {
  const whereEntries = Object.entries(where);

  const mappedWhere = Object.fromEntries(
    whereEntries
      .filter(([, value]) => {
        try {
          if (value.$in) {
            JSON.parse(value.$in);
          }

          if (value.$nin) {
            JSON.parse(value.$nin);
          }

          return true;
        } catch {
          return false;
        }
      })
      .map(([key, value]) => {
        if (typeof value !== 'object') {
          return [key, value];
        }

        if ('$eq' in value) {
          return [key, Equal(value.$eq)];
        }

        if ('$ne' in value) {
          return [key, Not(Equal(value.$ne))];
        }

        if ('$lt' in value) {
          return [key, LessThan(value.$lt)];
        }

        if ('$gt' in value) {
          return [key, MoreThan(value.$gt)];
        }

        if ('$lte' in value) {
          return [key, LessThanOrEqual(value.$lte)];
        }

        if ('$gte' in value) {
          return [key, MoreThanOrEqual(value.$gte)];
        }

        if ('$in' in value) {
          const $in = JSON.parse(value.$in);

          return [key, In(Array.isArray($in) ? $in : [$in])];
        }

        if ('$nin' in value) {
          const $nin = JSON.parse(value.$nin);

          return [key, Not(In(Array.isArray($nin) ? $nin : [$nin]))];
        }

        if ('$iLike' in value) {
          return [key, ILike(value.$iLike)];
        }

        return [key, value];
      }),
  );

  return {
    take: +$limit || DEFAULT_PAGINATION_LIMIT,
    skip: +$skip || DEFAULT_PAGINATION_SKIP,
    where: whereEntries.length === 0 ? undefined : mappedWhere,
  };
};

export default mapQueryToFindOptions;
