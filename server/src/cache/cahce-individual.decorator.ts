import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { CACHE_INDIVIDUAL_METADATA } from './cache.constatns';

export const CacheIndividual = (
  cacheIndividualKey: string,
): CustomDecorator<string> =>
  SetMetadata(CACHE_INDIVIDUAL_METADATA, cacheIndividualKey);
