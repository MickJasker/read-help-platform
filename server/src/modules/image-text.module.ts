import { Module } from '@nestjs/common';
import {ImageTextController} from "../controllers/image-text.controller";
import {ImageTextService} from "../services/image-text.service";

@Module({
  controllers: [ImageTextController],
  providers: [ImageTextService],
})
export class ImageTextModule {}
