import Api from '@/data/Api/Api';
import firebase from 'firebase/app';
import 'firebase/storage';
import { AxiosResponse } from 'axios';

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

export default class ImageTextApi extends Api {
  constructor() {
    let endpoint = '';

    if (process.env.NODE_ENV === 'production') {
      endpoint = 'https://us-central1-read-help-platform.cloudfunctions.net/api';
    } else {
      endpoint = 'http://localhost:3000';
    }

    endpoint = `${endpoint}/image-text`;

    super(endpoint);
  }

  public async transformImageToText(file: File): Promise<string> {
    const ref = firebase.storage().ref(`textImages/${file.name}`);

    return ref
      .put(file)
      .then((snapshot) => snapshot.ref.getDownloadURL())
      .then((url) => this.httpService.post(this.endpoint, {
        image: url,
      }))
      .then((response: ImageTextResponse) => response.data.description);
  }
}
