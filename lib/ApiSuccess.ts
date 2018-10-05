import * as HTTPStatus from 'http-status';

export class ApiSuccess {
  protected code: number;
  protected data: any;

  private res: any;

  /**
   * API Error
   * @constructor
   * @param message
   */
  constructor(res: any, data?: any) {
    this.res = res;
    this.code = HTTPStatus.OK;
    this.data = data;
  }

  public respond(): void {
    this.res.status(this.code).json({
      status: 'success',
      data: this.data
    });
  }
}
