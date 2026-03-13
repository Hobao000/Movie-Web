import { use } from "react";

export function useUnwrapParams<T>(params: Promise<T>): T {
  return use(params);
}