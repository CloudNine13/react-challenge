type RouteType = {
  path: string;
  title: string;
  component: string;
  params: Record<string, string>;
  resourceUrl: string;
};

export type { RouteType };
