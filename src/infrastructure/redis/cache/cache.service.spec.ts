import { Test, TestingModule } from '@nestjs/testing';
import { CacheService } from './cache.service';
import { BaseCache } from '@/core';

import { faker } from '@faker-js/faker';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';

const mockCachedUser = {
  id: faker.string.uuid(),
  username: faker.internet.userName(),
  password: faker.internet.password(),
};

describe('CacheService', () => {
  let service: BaseCache;
  let mockCache: CacheStore;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn().mockReturnValue(mockCachedUser),
            set: jest.fn(),
          },
        },
        CacheService,
      ],
    }).compile();

    service = module.get<BaseCache>(CacheService);
    mockCache = module.get<CacheStore>(CACHE_MANAGER);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should set cache', async () => {
    const key = 'key';
    const value = 'value';
    const expectedOutput = await service.set(key, value);
    expect(expectedOutput).toEqual(true);
  });

  it("shoudn't set cache when key value empty", async () => {
    const key = '';
    const value = '';
    const output = await service.set(key, value);
    expect(output).toEqual(false);
  });

  it('should get cache', async () => {
    const key = 'key';
    const expectedOutput = await service.get(key);
    expect(expectedOutput).toEqual(mockCachedUser);
  });

  it("shouldn't get cache when key empty", async () => {
    const key = '';
    const expectedOutput = await service.get(key);
    expect(expectedOutput).toEqual(null);
  });

  it("shouldn't set cache when occurs error", async () => {
    jest
      .spyOn(mockCache, 'set')
      .mockImplementation(async () =>
        Promise.reject(new Error('Error setting cache')),
      );

    const output = await service.set('1', '1');
    expect(output).toEqual(false);
  });

  it("shouldn't get cache when occurs error", async () => {
    jest
      .spyOn(mockCache, 'get')
      .mockImplementation(async () =>
        Promise.reject(new Error('Error getting cache')),
      );

    const output = await service.get('1');
    expect(output).toEqual(null);
  });
});
