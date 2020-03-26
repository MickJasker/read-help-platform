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
  constructor() {
    super();
    this.endpoint = `${this.endpoint}/image-text`;
  }

  public async transformImageToText(file: File): Promise<ImageTextResponse> {
    const ref = await ImageTextApi.uploadImage(file);
    const imageUrl = await ref.getDownloadURL() as string;
    const text = await this.getTextFromImage(imageUrl);
    await ImageTextApi.deleteImageFromBucket(ref);

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
}
