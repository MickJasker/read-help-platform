import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import vision from '@google-cloud/vision';
import {google} from '@google-cloud/vision/build/protos/protos';

@Injectable()
export class ImageTextService {

  private client = new vision.ImageAnnotatorClient();

  public async detectLabelInImage(imagePath: string): Promise<google.cloud.vision.v1.IEntityAnnotation> {
    const [result] = await this.client.textDetection(imagePath);
    const [detection] = result.textAnnotations;

    if (!detection) {
      const {error} = result;

      if (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
      }
      throw new HttpException('An unknown error appeared', HttpStatus.BAD_REQUEST);
    }

    return detection;
  }
}
