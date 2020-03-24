import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { ImageTextModule } from './image-text.module';
import {TextToSpeechModule} from "./text-to-speech.module";

@Module({
  imports: [ImageTextModule, TextToSpeechModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
