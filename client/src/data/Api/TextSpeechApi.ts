import NestApi from '@/data/Api/NestApi';

export type Base64 = string;

export interface TextToSpeechResponse {
  audioContent: Base64;
  languageCode: string;
  name: string;
}

export default class TextSpeechApi extends NestApi {
  constructor() {
    super();
    this.endpoint = `${this.endpoint}/text-to-speech`;
  }

  public async transformTextToSpeech(text: string, locale: string): Promise<TextToSpeechResponse> {
    const response = await this.httpService.post(this.endpoint, {
      text,
      locale,
    });

    return response.data;
  }
}
