import {Body, Controller, Post} from '@nestjs/common';
import {TextToSpeechService} from "../services/text-to-speech.service";

@Controller('text-to-speech')
export class TextToSpeechController {
  constructor(private textToSpeechService: TextToSpeechService) {}

  @Post()
  public async convertTextToSpeech(
    @Body('text')
      text: string,
    @Body('locale')
      locale: string) {
    return this.textToSpeechService.convertTextToSpeech(text, locale);
  }
}
