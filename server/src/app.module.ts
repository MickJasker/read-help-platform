import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageTextModule } from './providers/image-text/image-text.module';

@Module({
  imports: [ImageTextModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
