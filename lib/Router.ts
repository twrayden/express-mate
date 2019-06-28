import * as express from 'express';
import { steps } from './Handlers';

export enum RequestType {
  GET = 'GET',
  PATCH = 'PATCH',
  POST = 'POST'
}

export interface IPreRoute {
  path: string;
  steps: Array<express.RequestHandler>;
}

export interface IRoute {
  type: RequestType;
  path: string;
  steps: Array<express.RequestHandler>;
}

export class Router {
  public static createRoutes(type: RequestType, pre: IPreRoute[]): IRoute[] {
    return pre.map(
      (route): IRoute => {
        return { ...route, type };
      }
    );
  }

  public static mergeRoutes(routes: IRoute[][]): IRoute[] {
    return ([] as IRoute[]).concat(...routes);
  }

  private router: express.Router;

  constructor(...routes: IRoute[][]);
  constructor(routes: IRoute[]) {
    this.router = express.Router();

    const parsed =
      arguments.length === 1
        ? routes
        : Router.mergeRoutes(Array.from(arguments));

    parsed.forEach((route: IRoute) => {
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
