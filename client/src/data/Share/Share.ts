export default class Share extends Navigator {
  static async share(options: ShareData) {
    if (!Share.isSupported) {
      throw new Error('share is not supported by this browser');
    }

    return navigator.share(options);

  }

  static isSupported(): boolean {
    if (navigator.share()) {
      return true;
    }
    return false;
  }
}
