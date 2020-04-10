import { AxiosResponse } from 'axios';
import firebase from 'firebase/app';
import NestApi from './NestApi';
import 'firebase/storage';

interface Vertex {
  x: number;
  y: number;
}

interface BoundingPoly {
  vertices: Vertex[];
  normalizedVertices: unknown[];
}

interface ImageTextData {
  locations: unknown[];
  properties: unknown[];
  mid: string;
  locale: string;
  description: string;
  score: number;
  confidence: number;
  topicality: number;
  boundingPoly: BoundingPoly;
}

export interface ImageTextResponse extends AxiosResponse {
  data: ImageTextData;
}

export default class ImageTextApi extends NestApi {
  public _imageTextData?: ImageTextData;

  constructor() {
    super();
    this.endpoint = `${this.endpoint}/image-text`;
  }

  /**
   * Converts an image into a readable string
   * @param file
   * @async
   */
  public async transformImageToText(file: File): Promise<ImageTextResponse> {
    const ref = await ImageTextApi.uploadImage(file);
    const imageUrl = await ref.getDownloadURL() as string;
    const text = await this.getTextFromImage(imageUrl);
    await ImageTextApi.deleteImageFromBucket(ref);

    ImageTextApi.setInLocalStorage(text.data);

    this._imageTextData = text.data;

    return text;
  }

  private async getTextFromImage(imageUrl: string): Promise<ImageTextResponse> {
    return this.post({ image: imageUrl });
  }

  private static async uploadImage(file: File): Promise<firebase.storage.Reference> {
    const ref = firebase.storage().ref(`textImages/${file.name}`);

    const snapshot = await ref.put(file);
    return snapshot.ref;
  }

  private static async deleteImageFromBucket(ref: firebase.storage.Reference): Promise<void> {
    await ref.delete();
  }

  private static setInLocalStorage(data: ImageTextData): void {
    const { sessionStorage } = window;

    sessionStorage.setItem('imageText', JSON.stringify(data));
  }

  /**
   * Get the previous conversion from the `sessionStorage`.
   * Will throw an error if the `sessionStorage` is empty.
   */
  public static async getLatestTextConversion(): Promise<ImageTextData> {
    const { sessionStorage } = window;

    const imageTextData = sessionStorage.getItem('imageText');

    if (!imageTextData) {
      throw new Error('Object not found');
    }

    return JSON.parse(imageTextData);
  }

  public get imageTextData(): ImageTextData | undefined {
    return this._imageTextData;
  }
}
