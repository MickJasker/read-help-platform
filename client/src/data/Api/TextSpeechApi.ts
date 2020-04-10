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

  private static determineLocale(locale: string): string {
    let newLocale = locale;
    switch (locale) {
      case 'en':
        newLocale = 'en-US';
        break;
      case 'ar':
        newLocale = 'ar-SA';
        break;
      default:
        newLocale = `${locale.toLowerCase()}-${locale.toUpperCase()}`;
        break;
    }

    return newLocale;
  }

  public async transformTextToSpeech(text: string, locale: string): Promise<TextToSpeechResponse> {
    const response = await this.post({
      text,
      locale: TextSpeechApi.determineLocale(locale),
    });

    return response.data;
  }
}
