import { SetMetadata, ExecutionContext } from '@nestjs/common';
import { CACHE_ISPAGINATION_METADATA } from './cache.constatns';

type CachePaginationFactory = (
  ctx: ExecutionContext,
) => Promise<boolean> | boolean;
export const CachePagination = (
  isPagination: boolean | CachePaginationFactory,
) => SetMetadata(CACHE_ISPAGINATION_METADATA, isPagination);
export {};
