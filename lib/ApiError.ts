import * as HTTPStatus from 'http-status';

export class ApiError {
  protected message: string;
  protected code: number;
  protected data: any;

  private res: any;

  /**
   * API Error
   * @constructor
   * @param message
   */
  constructor(res: any, error: Error);
  constructor(res: any, message?: string, data?: any);
  constructor() {
    this.res = arguments[0];
    if (arguments[1] instanceof Error) {
      this.message = arguments[1].message;
    } else {
      this.message = arguments[1];
      this.data = arguments[2];
    }
    this.code = HTTPStatus.INTERNAL_SERVER_ERROR;
  }

  public respond(): void {
    this.res.status(this.code).json({
      status: 'error',
      message: this.message,
      code: this.code,
      data: this.data
    });
  }

  public print(): void {
    // logger.error(this.message);
  }
}
