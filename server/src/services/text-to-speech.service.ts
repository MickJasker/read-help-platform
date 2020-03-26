import {Injectable} from '@nestjs/common';
import textToSpeech from '@google-cloud/text-to-speech';
import {google} from "@google-cloud/text-to-speech/build/protos/protos";
import {TextToSpeechResponse} from "../interfaces/text-to-speech.interface";

type SpeechRequest = google.cloud.texttospeech.v1.ISynthesizeSpeechRequest;

@Injectable()
export class TextToSpeechService {
  private textToSpeechClient = new textToSpeech.TextToSpeechClient();

  public async convertTextToSpeech(text: string, locale: string): Promise<TextToSpeechResponse> {
    const request: SpeechRequest = TextToSpeechService.createRequest(text, locale);

    const [response] = await this.textToSpeechClient.synthesizeSpeech(request);

    let { audioContent } = response;
    // @ts-ignore
    audioContent = audioContent.toString('base64') as string;

    return {
      audioContent,
      languageCode: request.voice.languageCode,
      name: request.voice.name,
    };
  }

  private static createRequest(text: string, locale: string): SpeechRequest {
    let newLocale = locale;

    if (locale === 'und-UND') {
      newLocale = 'en-US'
    }

    return {
      input: {text},
      voice: {
        languageCode: newLocale,
        name: `${newLocale}-Wavenet-B`,
      },
      audioConfig: { audioEncoding: 'MP3'}
    }
  }
}
