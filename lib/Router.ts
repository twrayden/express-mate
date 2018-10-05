import * as express from 'express';
import { steps } from './Handlers';

export enum RequestType {
  GET,
  POST,
  PATCH
}

export interface IRoute {
  type: RequestType;
  path: string;
  steps: Array<(req: any, res: any, next: any) => Promise<any>>;
}

export interface IRouteGet extends IRoute {
  type: RequestType.GET;
}

export interface IRoutePatch extends IRoute {
  type: RequestType.PATCH;
}

export interface IRoutePost extends IRoute {
  type: RequestType.POST;
}

export class Router {
  private router: any;

  constructor(get: IRouteGet[], patch?: IRoutePatch[], post?: IRoutePost[]);
  constructor(routes: IRoute[]) {
    this.router = express.Router();

    routes.forEach(route => {
      switch (route.type) {
        case RequestType.GET:
          this.router.get(route.path, steps(...route.steps));
          break;
        case RequestType.PATCH:
          this.router.patch(route.path, steps(...route.steps));
          break;
        case RequestType.POST:
          this.router.post(route.path, steps(...route.steps));
          break;
        default:
          break;
      }
    });
  }

  get routes() {
    return this.router;
  }
}
