import * as express from 'express';
import { steps } from './Handlers';

export enum RequestType {
  GET,
  POST,
  PATCH
}

export interface IPreRoute {
  path: string;
  steps: Array<
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => Promise<any>
  >;
}

export interface IRoute {
  type: RequestType;
  path: string;
  steps: Array<
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => Promise<any>
  >;
}

export class Router {
  public static createRoutes(type: RequestType, pre: IPreRoute[]): IRoute[] {
    return pre.map(
      (route): IRoute => {
        return Object.assign(route, {
          type
        });
      }
    );
  }

  public static mergeRoutes(routes: IRoute[][]): IRoute[] {
    const result: IRoute[] = [];
    routes.forEach(route => {
      result.concat(route);
    });
    return result;
  }

  private router: express.Router;

  constructor(...routes: IRoute[][]);
  constructor(routes: IRoute[]) {
    routes =
      arguments.length === 1
        ? routes
        : Router.mergeRoutes(Array.from(arguments));

    this.router = express.Router();

    routes.forEach((route: IRoute) => {
      switch (route.type) {
        case RequestType.GET:
          this.router.get(route.path, steps(route.steps));
          break;
        case RequestType.PATCH:
          this.router.patch(route.path, steps(route.steps));
          break;
        case RequestType.POST:
          this.router.post(route.path, steps(route.steps));
          break;
        default:
          break;
      }
    });
  }

  get routes(): express.Router {
    return this.router;
  }
}
