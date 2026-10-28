/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/explore`; params?: Router.UnknownInputParams; } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/journal`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/journal/editor`; params?: Router.UnknownInputParams; } | { pathname: `/journal/history`; params?: Router.UnknownInputParams; } | { pathname: `/journal/layout`; params?: Router.UnknownInputParams; } | { pathname: `/journal/[id]`, params: Router.UnknownInputParams & { id: string | number; } };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/explore`; params?: Router.UnknownOutputParams; } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/journal`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `/journal/editor`; params?: Router.UnknownOutputParams; } | { pathname: `/journal/history`; params?: Router.UnknownOutputParams; } | { pathname: `/journal/layout`; params?: Router.UnknownOutputParams; } | { pathname: `/journal/[id]`, params: Router.UnknownOutputParams & { id: string; } };
      href: Router.RelativePathString | Router.ExternalPathString | `/explore${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `/journal${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `/journal/editor${`?${string}` | `#${string}` | ''}` | `/journal/history${`?${string}` | `#${string}` | ''}` | `/journal/layout${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString | Router.ExternalPathString | `/explore` | `/` | `/journal` | `/_sitemap` | `/journal/editor` | `/journal/history` | `/journal/layout`; params?: Router.UnknownInputParams; } | `/journal/${Router.SingleRoutePart<T>}` | { pathname: `/journal/[id]`, params: Router.UnknownInputParams & { id: string | number; } };
    }
  }
}
