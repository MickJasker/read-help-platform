import {Controller, Get, Body} from '@nestjs/common';
import {ImageTextService} from './image-text.service';

@Controller('image-text')
export class ImageTextController {
  constructor(private imageTextService: ImageTextService) {}

  @Get()
  public async getTextFromImage(@Body('image') image: string) {
    return this.imageTextService.detectLabelInImage(image);
  }
}
