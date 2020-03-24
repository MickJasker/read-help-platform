
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
    const ref = firebase.storage().ref(`textImages/${file.name}`);

    return ref
      .put(file)
      .then((snapshot) => snapshot.ref.getDownloadURL())
      .then((url: string) => this.httpService.post(this.endpoint, {
        image: url,
      }))
      .then((response: ImageTextResponse) => response);
  }
}
