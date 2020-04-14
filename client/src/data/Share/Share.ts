export default class Share {
  // @ts-ignore
  static async share(options: ShareData): Promise<void> {
    if (!Share.isSupported) {
      throw new Error('share is not supported by this browser');
    }

    // @ts-ignore
    return window.navigator.share(options);
  }

  static isSupported(): boolean {
    // @ts-ignore
    return !!window.navigator.share();
  }
}
