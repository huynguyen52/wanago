import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import Category from './category.entity';
import { CategoryService } from './category.service';

describe('CategoryService', () => {
  let service: CategoryService;

  const mockCategoryRepository = {
    create: jest.fn().mockImplementation((dto) => ({ id: 1, ...dto })),
    save: jest
      .fn()
      .mockImplementation((user) => Promise.resolve({ id: 1, ...user })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(Category),
          useValue: mockCategoryRepository,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create new user and return', async () => {
    const data = await service.createCategory({ name: 'abc' });
    console.log(111, data);
    expect(await service.createCategory({ name: 'abc' })).toEqual({
      id: expect.any(Number),
      name: 'abc',
    });
  });
});
