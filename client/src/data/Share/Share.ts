export default class Share {
  static async share(options: ShareData): Promise<void> {
    if (!Share.isSupported) {
      throw new Error('share is not supported by this browser');
    }

    return window.navigator.share(options);
  }

  static isSupported(): boolean {
    if (window.navigator.share()) {
      return true;
    }
    return false;
  }
}
