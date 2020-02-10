let jsend: boolean = false;

export class Settings {
  public static get jsend() {
    return jsend;
  }

  public static set jsend(value: boolean) {
    jsend = value;
  }
}
