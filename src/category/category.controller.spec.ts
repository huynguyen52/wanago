import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

describe('CategoryController', () => {
  let controller: CategoryController;

  const mockCategoryService = {
    createCategory: jest.fn((dto) => ({
      id: 1,
      ...dto,
    })),
    updateCategory: jest.fn().mockImplementation((id, dto) => ({ id, ...dto })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [CategoryService],
    })
      .overrideProvider(CategoryService)
      .useValue(mockCategoryService)
      .compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create category', () => {
    expect(controller.createCategory({ name: 'adventure' })).toEqual({
      id: expect.any(Number),
      name: 'adventure',
    });
  });

  it('should update category', () => {
    expect(controller.updateCategory('1', { name: 'test' })).toEqual({
      id: 1,
      name: 'test',
    });

    expect(mockCategoryService.updateCategory).toHaveBeenCalled();
  });
});
