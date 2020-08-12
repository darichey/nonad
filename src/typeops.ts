import { And } from "./bool";

export type Extends<A, B> =
  [A] extends [B]
  ? true
  : false

export type Eq<A, B> =
  And<Extends<A, B>, Extends<B, A>>

// https://github.com/microsoft/TypeScript/issues/23182#issuecomment-379091887
export type IsNotNever<T> = [T] extends [never] ? false : true;

export type Intersects<A, B> =
  IsNotNever<(keyof A) & (keyof B)>
