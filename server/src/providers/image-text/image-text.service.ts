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

      if (!error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }

      if (error.code === 2) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else if (error.code === 7 || error.code === 16) {
        throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
      } else if (error.code === 13 || error.code === 4) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      } else {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    return detection;
  }
}
