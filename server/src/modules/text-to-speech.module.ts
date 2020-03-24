import { Module } from '@nestjs/common';
import {TextToSpeechController} from "../controllers/text-to-speech.controller";
import {TextToSpeechService} from "../services/text-to-speech.service";

@Module({
  controllers: [TextToSpeechController],
  providers: [TextToSpeechService]
})
export class TextToSpeechModule {}
