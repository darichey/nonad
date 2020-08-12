import { expectTypeOf } from "expect-type";
import { Nonad, Full }  from "../src/nonad";

interface Thingy {
  field1: number,
  field2: string,
  field3: boolean
}

export function test_id() {
  type Same = Nonad<Thingy, 'field1' | 'field2' | 'field3'>
  expectTypeOf<Same>().toEqualTypeOf<Thingy>()
}

export function test_combined() {
  type Thingy1 = Nonad<Thingy, 'field1'>
  type Thingy23 = Nonad<Thingy, 'field2' | 'field3'>

  type Combined = Full<Thingy, [Thingy1, Thingy23]>
  expectTypeOf<Combined>().toEqualTypeOf<Thingy>()
}

export function test_incomplete() {
  type Thingy1 = Nonad<Thingy, 'field1'>
  type Thingy2 = Nonad<Thingy, 'field2'>
  type Incomplete = Full<Thingy, [Thingy1, Thingy2]>
  expectTypeOf<Incomplete>().toEqualTypeOf<never>()
}

export function test_overlapping() {
  type Thingy13 = Nonad<Thingy, 'field1' | 'field3'>
  type Thingy12 = Nonad<Thingy, 'field1' | 'field2'>
  type Overlapping = Full<Thingy, [Thingy13, Thingy12]>
  expectTypeOf<Overlapping>().toEqualTypeOf<never>()
}
