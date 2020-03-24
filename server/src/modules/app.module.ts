import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { ImageTextModule } from './image-text.module';

@Module({
  imports: [ImageTextModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
