import {Controller, Post, Body} from '@nestjs/common';
import {ImageTextService} from '../services/image-text.service';

@Controller('image-text')
export class ImageTextController {
  constructor(private imageTextService: ImageTextService) {}

  @Post()
  public async getTextFromImage(@Body('image') image: string) {
    return this.imageTextService.detectLabelInImage(image);
  }
}
