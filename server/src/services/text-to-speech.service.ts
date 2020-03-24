import {Injectable} from '@nestjs/common';
import textToSpeech from '@google-cloud/text-to-speech';
import {google} from "@google-cloud/text-to-speech/build/protos/protos";
import {TextToSpeechResponse} from "../interfaces/text-to-speech.interface";

@Injectable()
export class TextToSpeechService {
  private textToSpeechClient = new textToSpeech.TextToSpeechClient();

  public async convertTextToSpeech(text: string, locale: string): Promise<TextToSpeechResponse> {
    const request: google.cloud.texttospeech.v1.ISynthesizeSpeechRequest = {
      input: {text},
      voice: {
        languageCode: locale,
        name: `${locale}-Wavenet-B`,
      },
      audioConfig: { audioEncoding: 'MP3'}
    };

    const [response] = await this.textToSpeechClient.synthesizeSpeech(request);

    const { audioContent } = response;

    return {
      // @ts-ignore
      audioContent: audioContent.toString('base64'),
      languageCode: request.voice.languageCode,
      name: request.voice.name,
    };
  }
}
