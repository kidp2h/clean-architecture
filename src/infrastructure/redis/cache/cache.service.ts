import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { BaseCache } from '@/core';
import * as _ from 'lodash';

@Injectable()
export class CacheService extends BaseCache {
  private readonly logger = new Logger(CacheService.name);
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: CacheStore,
  ) {
    super();
  }
  async get<K extends string>(key: K): Promise<any> {
    this.logger.log('Get Cache', `K: ${key}`);
    try {
      if (_.isEmpty(key)) return null;
      return await this.cacheManager.get<K>(key);
    } catch (error) {
      this.logger.log('Error getting cache', error);
      return null;
    }
  }
  async set<K extends string, V>(key: K, value: V) {
    if (_.isEmpty(key) || _.isEmpty(value)) return false;
    this.logger.log('Set Cache', `K: ${key} - V: ${JSON.stringify(value)}`);
    try {
      await this.cacheManager.set(key, value);
      return true;
    } catch (error) {
      this.logger.log('Error setting cache', error);
      return false;
    }
  }
}
