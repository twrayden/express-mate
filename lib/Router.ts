import * as express from 'express';
import { steps } from './Handlers';

export enum RequestType {
  GET,
  POST,
  PATCH
}

export interface IPreRoute {
  path: string;
  steps: Array<(req: any, res: any, next: any) => Promise<any>>;
}

export interface IRoute {
  type: RequestType;
  path: string;
  steps: Array<(req: any, res: any, next: any) => Promise<any>>;
}

export class Router {
  public static createRoutes(type: RequestType, pre: IPreRoute[]): IRoute[] {
    return pre.map(
      (route): IRoute => {
        return {
          ...route,
          type
        };
      }
    );
  }

  public static mergeRoutes(...routes: IRoute[][]): IRoute[] {
    return [].concat.apply([], routes);
  }

  private router: any;

  constructor(...routes: IRoute[][]);
  constructor(routes: IRoute[]) {
    routes =
      arguments.length === 1
        ? routes
        : Router.mergeRoutes(...Array.from(arguments));

    this.router = express.Router();

    routes.forEach((route: IRoute) => {
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
