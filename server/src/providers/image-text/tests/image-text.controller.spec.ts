import { Test, TestingModule } from '@nestjs/testing';
import { ImageTextController } from '../image-text.controller';
import {ImageTextService} from "../image-text.service";

describe('ImageText Controller', () => {
  let controller: ImageTextController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageTextController],
      providers: [ImageTextService]
    }).compile();

    controller = module.get<ImageTextController>(ImageTextController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
