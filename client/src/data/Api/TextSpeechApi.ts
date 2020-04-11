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

  /**
   * Converts a regular locale string into a lcid locale string
   */
  private static convertLocale(locale: string): string {
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

  private async sendToApi(text: string, locale: string) {
    return this.post({ text, locale });
  }

  /**
   * Converts a `string` into a `base64` audio file
   * @param text
   * @param locale
   */
  public async transformTextToSpeech(text: string, locale: string): Promise<TextToSpeechResponse> {
    const response = await this.sendToApi(
      text,
      TextSpeechApi.convertLocale(locale),
    );

    return response.data;
  }
}
