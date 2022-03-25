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
  Between,
} from 'typeorm';

import { DEFAULT_PAGINATION_LIMIT, DEFAULT_PAGINATION_SKIP } from './variables';

import { IQuery } from '@app/declarations';

export const mapQueryToFindOptions = ({
  $limit,
  $skip,
  $order,
  ...where
}: IQuery): FindManyOptions => {
  const whereEntries = Object.entries(where);

  const mappedWhere = Object.fromEntries(
    whereEntries
      .filter(([, value]) => {
        try {
          const parsedValue =
            typeof value === 'string' && value[0] === '{'
              ? JSON.parse(value)
              : value;

          if (parsedValue.$in) {
            return Array.isArray(parsedValue.$in);
          }

          if (parsedValue.$nin) {
            return Array.isArray(parsedValue.$nin);
          }

          if (parsedValue.$btw) {
            return Array.isArray(parsedValue.$btw);
          }

          return true;
        } catch {
          return false;
        }
      })
      .map(([key, value]) => {
        const parsedValue =
          typeof value === 'string' && value[0] === '{'
            ? JSON.parse(value)
            : value;

        if (typeof parsedValue !== 'object') {
          return [key, parsedValue];
        }

        if ('$eq' in parsedValue) {
          return [key, Equal(parsedValue.$eq)];
        }

        if ('$ne' in parsedValue) {
          return [key, Not(Equal(parsedValue.$ne))];
        }

        if ('$lt' in parsedValue) {
          return [key, LessThan(parsedValue.$lt)];
        }

        if ('$gt' in parsedValue) {
          return [key, MoreThan(parsedValue.$gt)];
        }

        if ('$lte' in parsedValue) {
          return [key, LessThanOrEqual(parsedValue.$lte)];
        }

        if ('$gte' in parsedValue) {
          return [key, MoreThanOrEqual(parsedValue.$gte)];
        }

        if ('$in' in parsedValue) {
          return [key, In(parsedValue.$in)];
        }

        if ('$nin' in parsedValue) {
          return [key, Not(In(parsedValue.$nin))];
        }

        if ('$iLike' in parsedValue) {
          return [key, ILike(parsedValue.$iLike)];
        }

        if ('$btw' in parsedValue) {
          return [key, Between(...(parsedValue.$btw as [unknown, unknown]))];
        }

        return [key, parsedValue];
      }),
  );

  return {
    take: +$limit || DEFAULT_PAGINATION_LIMIT,
    skip: +$skip || DEFAULT_PAGINATION_SKIP,
    order: typeof $order === 'string' ? JSON.parse($order) : $order,
    where: whereEntries.length === 0 ? undefined : mappedWhere,
  };
};

export default mapQueryToFindOptions;
