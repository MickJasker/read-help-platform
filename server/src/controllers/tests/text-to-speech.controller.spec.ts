import { Test, TestingModule } from '@nestjs/testing';
import { TextToSpeechController } from '../text-to-speech.controller';
import {TextToSpeechService} from "../../services/text-to-speech.service";

describe('TextToSpeech Controller', () => {
  let controller: TextToSpeechController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TextToSpeechController],
      providers: [TextToSpeechService],
    }).compile();

    controller = module.get<TextToSpeechController>(TextToSpeechController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
