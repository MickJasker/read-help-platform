export type Base64 = string;

export interface TextToSpeechResponse {
  audioContent: Base64;
  languageCode: string;
  name: string;
}
