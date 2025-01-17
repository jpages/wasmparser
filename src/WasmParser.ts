/* Copyright 2016 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// See https://github.com/WebAssembly/design/blob/master/BinaryEncoding.md
const WASM_MAGIC_NUMBER = 0x6d736100;
const WASM_SUPPORTED_EXPERIMENTAL_VERSION = 0xd;
const WASM_SUPPORTED_VERSION = 0x1;
export const enum SectionCode {
  Unknown = -1,
  Custom = 0,
  Type = 1, // Function signature declarations
  Import = 2, // Import declarations
  Function = 3, // Function declarations
  Table = 4, // Indirect function table and other tables
  Memory = 5, // Memory attributes
  Global = 6, // Global declarations
  Export = 7, //Exports
  Start = 8, // Start function declaration
  Element = 9, // Elements section
  Code = 10, // Function bodies (code)
  Data = 11, // Data segments
  DataCount = 12, // Data count section
  Tag = 13, // Tag declarations
}
export const enum OperatorCode {
  unreachable = 0x00,
  nop = 0x01,
  block = 0x02,
  loop = 0x03,
  if = 0x04,
  else = 0x05,
  try = 0x06,
  catch = 0x07,
  throw = 0x08,
  rethrow = 0x09,
  unwind = 0x0a,
  end = 0x0b,
  br = 0x0c,
  br_if = 0x0d,
  br_table = 0x0e,
  return = 0x0f,
  call = 0x10,
  call_indirect = 0x11,
  return_call = 0x12,
  return_call_indirect = 0x13,
  call_ref = 0x14,
  return_call_ref = 0x15,
  let = 0x17,
  delegate = 0x18,
  catch_all = 0x19,
  drop = 0x1a,
  select = 0x1b,
  select_with_type = 0x1c,
  local_get = 0x20,
  local_set = 0x21,
  local_tee = 0x22,
  global_get = 0x23,
  global_set = 0x24,
  i32_load = 0x28,
  i64_load = 0x29,
  f32_load = 0x2a,
  f64_load = 0x2b,
  i32_load8_s = 0x2c,
  i32_load8_u = 0x2d,
  i32_load16_s = 0x2e,
  i32_load16_u = 0x2f,
  i64_load8_s = 0x30,
  i64_load8_u = 0x31,
  i64_load16_s = 0x32,
  i64_load16_u = 0x33,
  i64_load32_s = 0x34,
  i64_load32_u = 0x35,
  i32_store = 0x36,
  i64_store = 0x37,
  f32_store = 0x38,
  f64_store = 0x39,
  i32_store8 = 0x3a,
  i32_store16 = 0x3b,
  i64_store8 = 0x3c,
  i64_store16 = 0x3d,
  i64_store32 = 0x3e,
  memory_size = 0x3f,
  memory_grow = 0x40,
  i32_const = 0x41,
  i64_const = 0x42,
  f32_const = 0x43,
  f64_const = 0x44,
  i32_eqz = 0x45,
  i32_eq = 0x46,
  i32_ne = 0x47,
  i32_lt_s = 0x48,
  i32_lt_u = 0x49,
  i32_gt_s = 0x4a,
  i32_gt_u = 0x4b,
  i32_le_s = 0x4c,
  i32_le_u = 0x4d,
  i32_ge_s = 0x4e,
  i32_ge_u = 0x4f,
  i64_eqz = 0x50,
  i64_eq = 0x51,
  i64_ne = 0x52,
  i64_lt_s = 0x53,
  i64_lt_u = 0x54,
  i64_gt_s = 0x55,
  i64_gt_u = 0x56,
  i64_le_s = 0x57,
  i64_le_u = 0x58,
  i64_ge_s = 0x59,
  i64_ge_u = 0x5a,
  f32_eq = 0x5b,
  f32_ne = 0x5c,
  f32_lt = 0x5d,
  f32_gt = 0x5e,
  f32_le = 0x5f,
  f32_ge = 0x60,
  f64_eq = 0x61,
  f64_ne = 0x62,
  f64_lt = 0x63,
  f64_gt = 0x64,
  f64_le = 0x65,
  f64_ge = 0x66,
  i32_clz = 0x67,
  i32_ctz = 0x68,
  i32_popcnt = 0x69,
  i32_add = 0x6a,
  i32_sub = 0x6b,
  i32_mul = 0x6c,
  i32_div_s = 0x6d,
  i32_div_u = 0x6e,
  i32_rem_s = 0x6f,
  i32_rem_u = 0x70,
  i32_and = 0x71,
  i32_or = 0x72,
  i32_xor = 0x73,
  i32_shl = 0x74,
  i32_shr_s = 0x75,
  i32_shr_u = 0x76,
  i32_rotl = 0x77,
  i32_rotr = 0x78,
  i64_clz = 0x79,
  i64_ctz = 0x7a,
  i64_popcnt = 0x7b,
  i64_add = 0x7c,
  i64_sub = 0x7d,
  i64_mul = 0x7e,
  i64_div_s = 0x7f,
  i64_div_u = 0x80,
  i64_rem_s = 0x81,
  i64_rem_u = 0x82,
  i64_and = 0x83,
  i64_or = 0x84,
  i64_xor = 0x85,
  i64_shl = 0x86,
  i64_shr_s = 0x87,
  i64_shr_u = 0x88,
  i64_rotl = 0x89,
  i64_rotr = 0x8a,
  f32_abs = 0x8b,
  f32_neg = 0x8c,
  f32_ceil = 0x8d,
  f32_floor = 0x8e,
  f32_trunc = 0x8f,
  f32_nearest = 0x90,
  f32_sqrt = 0x91,
  f32_add = 0x92,
  f32_sub = 0x93,
  f32_mul = 0x94,
  f32_div = 0x95,
  f32_min = 0x96,
  f32_max = 0x97,
  f32_copysign = 0x98,
  f64_abs = 0x99,
  f64_neg = 0x9a,
  f64_ceil = 0x9b,
  f64_floor = 0x9c,
  f64_trunc = 0x9d,
  f64_nearest = 0x9e,
  f64_sqrt = 0x9f,
  f64_add = 0xa0,
  f64_sub = 0xa1,
  f64_mul = 0xa2,
  f64_div = 0xa3,
  f64_min = 0xa4,
  f64_max = 0xa5,
  f64_copysign = 0xa6,
  i32_wrap_i64 = 0xa7,
  i32_trunc_f32_s = 0xa8,
  i32_trunc_f32_u = 0xa9,
  i32_trunc_f64_s = 0xaa,
  i32_trunc_f64_u = 0xab,
  i64_extend_i32_s = 0xac,
  i64_extend_i32_u = 0xad,
  i64_trunc_f32_s = 0xae,
  i64_trunc_f32_u = 0xaf,
  i64_trunc_f64_s = 0xb0,
  i64_trunc_f64_u = 0xb1,
  f32_convert_i32_s = 0xb2,
  f32_convert_i32_u = 0xb3,
  f32_convert_i64_s = 0xb4,
  f32_convert_i64_u = 0xb5,
  f32_demote_f64 = 0xb6,
  f64_convert_i32_s = 0xb7,
  f64_convert_i32_u = 0xb8,
  f64_convert_i64_s = 0xb9,
  f64_convert_i64_u = 0xba,
  f64_promote_f32 = 0xbb,
  i32_reinterpret_f32 = 0xbc,
  i64_reinterpret_f64 = 0xbd,
  f32_reinterpret_i32 = 0xbe,
  f64_reinterpret_i64 = 0xbf,

  i32_extend8_s = 0xc0,
  i32_extend16_s = 0xc1,
  i64_extend8_s = 0xc2,
  i64_extend16_s = 0xc3,
  i64_extend32_s = 0xc4,

  prefix_0xfb = 0xfb,
  prefix_0xfc = 0xfc,
  prefix_0xfd = 0xfd,
  prefix_0xfe = 0xfe,

  i32_trunc_sat_f32_s = 0xfc00,
  i32_trunc_sat_f32_u = 0xfc01,
  i32_trunc_sat_f64_s = 0xfc02,
  i32_trunc_sat_f64_u = 0xfc03,
  i64_trunc_sat_f32_s = 0xfc04,
  i64_trunc_sat_f32_u = 0xfc05,
  i64_trunc_sat_f64_s = 0xfc06,
  i64_trunc_sat_f64_u = 0xfc07,

  memory_init = 0xfc08,
  data_drop = 0xfc09,
  memory_copy = 0xfc0a,
  memory_fill = 0xfc0b,
  table_init = 0xfc0c,
  elem_drop = 0xfc0d,
  table_copy = 0xfc0e,

  table_grow = 0xfc0f,
  table_size = 0xfc10,
  table_fill = 0xfc11,

  table_get = 0x25,
  table_set = 0x26,

  ref_null = 0xd0,
  ref_is_null = 0xd1,
  ref_func = 0xd2,
  ref_eq = 0xd3,
  ref_as_non_null = 0xd4,
  br_on_null = 0xd5,
  br_on_non_null = 0xd6,

  memory_atomic_notify = 0xfe00,
  memory_atomic_wait32 = 0xfe01,
  memory_atomic_wait64 = 0xfe02,
  atomic_fence = 0xfe03,
  i32_atomic_load = 0xfe10,
  i64_atomic_load = 0xfe11,
  i32_atomic_load8_u = 0xfe12,
  i32_atomic_load16_u = 0xfe13,
  i64_atomic_load8_u = 0xfe14,
  i64_atomic_load16_u = 0xfe15,
  i64_atomic_load32_u = 0xfe16,
  i32_atomic_store = 0xfe17,
  i64_atomic_store = 0xfe18,
  i32_atomic_store8 = 0xfe19,
  i32_atomic_store16 = 0xfe1a,
  i64_atomic_store8 = 0xfe1b,
  i64_atomic_store16 = 0xfe1c,
  i64_atomic_store32 = 0xfe1d,
  i32_atomic_rmw_add = 0xfe1e,
  i64_atomic_rmw_add = 0xfe1f,
  i32_atomic_rmw8_add_u = 0xfe20,
  i32_atomic_rmw16_add_u = 0xfe21,
  i64_atomic_rmw8_add_u = 0xfe22,
  i64_atomic_rmw16_add_u = 0xfe23,
  i64_atomic_rmw32_add_u = 0xfe24,
  i32_atomic_rmw_sub = 0xfe25,
  i64_atomic_rmw_sub = 0xfe26,
  i32_atomic_rmw8_sub_u = 0xfe27,
  i32_atomic_rmw16_sub_u = 0xfe28,
  i64_atomic_rmw8_sub_u = 0xfe29,
  i64_atomic_rmw16_sub_u = 0xfe2a,
  i64_atomic_rmw32_sub_u = 0xfe2b,
  i32_atomic_rmw_and = 0xfe2c,
  i64_atomic_rmw_and = 0xfe2d,
  i32_atomic_rmw8_and_u = 0xfe2e,
  i32_atomic_rmw16_and_u = 0xfe2f,
  i64_atomic_rmw8_and_u = 0xfe30,
  i64_atomic_rmw16_and_u = 0xfe31,
  i64_atomic_rmw32_and_u = 0xfe32,
  i32_atomic_rmw_or = 0xfe33,
  i64_atomic_rmw_or = 0xfe34,
  i32_atomic_rmw8_or_u = 0xfe35,
  i32_atomic_rmw16_or_u = 0xfe36,
  i64_atomic_rmw8_or_u = 0xfe37,
  i64_atomic_rmw16_or_u = 0xfe38,
  i64_atomic_rmw32_or_u = 0xfe39,
  i32_atomic_rmw_xor = 0xfe3a,
  i64_atomic_rmw_xor = 0xfe3b,
  i32_atomic_rmw8_xor_u = 0xfe3c,
  i32_atomic_rmw16_xor_u = 0xfe3d,
  i64_atomic_rmw8_xor_u = 0xfe3e,
  i64_atomic_rmw16_xor_u = 0xfe3f,
  i64_atomic_rmw32_xor_u = 0xfe40,
  i32_atomic_rmw_xchg = 0xfe41,
  i64_atomic_rmw_xchg = 0xfe42,
  i32_atomic_rmw8_xchg_u = 0xfe43,
  i32_atomic_rmw16_xchg_u = 0xfe44,
  i64_atomic_rmw8_xchg_u = 0xfe45,
  i64_atomic_rmw16_xchg_u = 0xfe46,
  i64_atomic_rmw32_xchg_u = 0xfe47,
  i32_atomic_rmw_cmpxchg = 0xfe48,
  i64_atomic_rmw_cmpxchg = 0xfe49,
  i32_atomic_rmw8_cmpxchg_u = 0xfe4a,
  i32_atomic_rmw16_cmpxchg_u = 0xfe4b,
  i64_atomic_rmw8_cmpxchg_u = 0xfe4c,
  i64_atomic_rmw16_cmpxchg_u = 0xfe4d,
  i64_atomic_rmw32_cmpxchg_u = 0xfe4e,

  v128_load = 0xfd000,
  i16x8_load8x8_s = 0xfd001,
  i16x8_load8x8_u = 0xfd002,
  i32x4_load16x4_s = 0xfd003,
  i32x4_load16x4_u = 0xfd004,
  i64x2_load32x2_s = 0xfd005,
  i64x2_load32x2_u = 0xfd006,
  v8x16_load_splat = 0xfd007,
  v16x8_load_splat = 0xfd008,
  v32x4_load_splat = 0xfd009,
  v64x2_load_splat = 0xfd00a,
  v128_store = 0xfd00b,
  v128_const = 0xfd00c,
  i8x16_shuffle = 0xfd00d,
  i8x16_swizzle = 0xfd00e,
  i8x16_splat = 0xfd00f,
  i16x8_splat = 0xfd010,
  i32x4_splat = 0xfd011,
  i64x2_splat = 0xfd012,
  f32x4_splat = 0xfd013,
  f64x2_splat = 0xfd014,
  i8x16_extract_lane_s = 0xfd015,
  i8x16_extract_lane_u = 0xfd016,
  i8x16_replace_lane = 0xfd017,
  i16x8_extract_lane_s = 0xfd018,
  i16x8_extract_lane_u = 0xfd019,
  i16x8_replace_lane = 0xfd01a,
  i32x4_extract_lane = 0xfd01b,
  i32x4_replace_lane = 0xfd01c,
  i64x2_extract_lane = 0xfd01d,
  i64x2_replace_lane = 0xfd01e,
  f32x4_extract_lane = 0xfd01f,
  f32x4_replace_lane = 0xfd020,
  f64x2_extract_lane = 0xfd021,
  f64x2_replace_lane = 0xfd022,
  i8x16_eq = 0xfd023,
  i8x16_ne = 0xfd024,
  i8x16_lt_s = 0xfd025,
  i8x16_lt_u = 0xfd026,
  i8x16_gt_s = 0xfd027,
  i8x16_gt_u = 0xfd028,
  i8x16_le_s = 0xfd029,
  i8x16_le_u = 0xfd02a,
  i8x16_ge_s = 0xfd02b,
  i8x16_ge_u = 0xfd02c,
  i16x8_eq = 0xfd02d,
  i16x8_ne = 0xfd02e,
  i16x8_lt_s = 0xfd02f,
  i16x8_lt_u = 0xfd030,
  i16x8_gt_s = 0xfd031,
  i16x8_gt_u = 0xfd032,
  i16x8_le_s = 0xfd033,
  i16x8_le_u = 0xfd034,
  i16x8_ge_s = 0xfd035,
  i16x8_ge_u = 0xfd036,
  i32x4_eq = 0xfd037,
  i32x4_ne = 0xfd038,
  i32x4_lt_s = 0xfd039,
  i32x4_lt_u = 0xfd03a,
  i32x4_gt_s = 0xfd03b,
  i32x4_gt_u = 0xfd03c,
  i32x4_le_s = 0xfd03d,
  i32x4_le_u = 0xfd03e,
  i32x4_ge_s = 0xfd03f,
  i32x4_ge_u = 0xfd040,
  f32x4_eq = 0xfd041,
  f32x4_ne = 0xfd042,
  f32x4_lt = 0xfd043,
  f32x4_gt = 0xfd044,
  f32x4_le = 0xfd045,
  f32x4_ge = 0xfd046,
  f64x2_eq = 0xfd047,
  f64x2_ne = 0xfd048,
  f64x2_lt = 0xfd049,
  f64x2_gt = 0xfd04a,
  f64x2_le = 0xfd04b,
  f64x2_ge = 0xfd04c,
  v128_not = 0xfd04d,
  v128_and = 0xfd04e,
  v128_andnot = 0xfd04f,
  v128_or = 0xfd050,
  v128_xor = 0xfd051,
  v128_bitselect = 0xfd052,
  v128_any_true = 0xfd053,
  v128_load8_lane = 0xfd054,
  v128_load16_lane = 0xfd055,
  v128_load32_lane = 0xfd056,
  v128_load64_lane = 0xfd057,
  v128_store8_lane = 0xfd058,
  v128_store16_lane = 0xfd059,
  v128_store32_lane = 0xfd05a,
  v128_store64_lane = 0xfd05b,
  v128_load32_zero = 0xfd05c,
  v128_load64_zero = 0xfd05d,
  f32x4_demote_f64x2_zero = 0xfd05e,
  f64x2_promote_low_f32x4 = 0xfd05f,
  i8x16_abs = 0xfd060,
  i8x16_neg = 0xfd061,
  i8x16_popcnt = 0xfd062,
  i8x16_all_true = 0xfd063,
  i8x16_bitmask = 0xfd064,
  i8x16_narrow_i16x8_s = 0xfd065,
  i8x16_narrow_i16x8_u = 0xfd066,
  f32x4_ceil = 0xfd067,
  f32x4_floor = 0xfd068,
  f32x4_trunc = 0xfd069,
  f32x4_nearest = 0xfd06a,
  i8x16_shl = 0xfd06b,
  i8x16_shr_s = 0xfd06c,
  i8x16_shr_u = 0xfd06d,
  i8x16_add = 0xfd06e,
  i8x16_add_sat_s = 0xfd06f,
  i8x16_add_sat_u = 0xfd070,
  i8x16_sub = 0xfd071,
  i8x16_sub_sat_s = 0xfd072,
  i8x16_sub_sat_u = 0xfd073,
  f64x2_ceil = 0xfd074,
  f64x2_floor = 0xfd075,
  i8x16_min_s = 0xfd076,
  i8x16_min_u = 0xfd077,
  i8x16_max_s = 0xfd078,
  i8x16_max_u = 0xfd079,
  f64x2_trunc = 0xfd07a,
  i8x16_avgr_u = 0xfd07b,
  i16x8_extadd_pairwise_i8x16_s = 0xfd07c,
  i16x8_extadd_pairwise_i8x16_u = 0xfd07d,
  i32x4_extadd_pairwise_i16x8_s = 0xfd07e,
  i32x4_extadd_pairwise_i16x8_u = 0xfd07f,
  i16x8_abs = 0xfd080,
  i16x8_neg = 0xfd081,
  i16x8_q15mulr_sat_s = 0xfd082,
  i16x8_all_true = 0xfd083,
  i16x8_bitmask = 0xfd084,
  i16x8_narrow_i32x4_s = 0xfd085,
  i16x8_narrow_i32x4_u = 0xfd086,
  i16x8_extend_low_i8x16_s = 0xfd087,
  i16x8_extend_high_i8x16_s = 0xfd088,
  i16x8_extend_low_i8x16_u = 0xfd089,
  i16x8_extend_high_i8x16_u = 0xfd08a,
  i16x8_shl = 0xfd08b,
  i16x8_shr_s = 0xfd08c,
  i16x8_shr_u = 0xfd08d,
  i16x8_add = 0xfd08e,
  i16x8_add_sat_s = 0xfd08f,
  i16x8_add_sat_u = 0xfd090,
  i16x8_sub = 0xfd091,
  i16x8_sub_sat_s = 0xfd092,
  i16x8_sub_sat_u = 0xfd093,
  f64x2_nearest = 0xfd094,
  i16x8_mul = 0xfd095,
  i16x8_min_s = 0xfd096,
  i16x8_min_u = 0xfd097,
  i16x8_max_s = 0xfd098,
  i16x8_max_u = 0xfd099,
  i16x8_avgr_u = 0xfd09b,
  i16x8_extmul_low_i8x16_s = 0xfd09c,
  i16x8_extmul_high_i8x16_s = 0xfd09d,
  i16x8_extmul_low_i8x16_u = 0xfd09e,
  i16x8_extmul_high_i8x16_u = 0xfd09f,
  i32x4_abs = 0xfd0a0,
  i32x4_neg = 0xfd0a1,
  i32x4_all_true = 0xfd0a3,
  i32x4_bitmask = 0xfd0a4,
  i32x4_extend_low_i16x8_s = 0xfd0a7,
  i32x4_extend_high_i16x8_s = 0xfd0a8,
  i32x4_extend_low_i16x8_u = 0xfd0a9,
  i32x4_extend_high_i16x8_u = 0xfd0aa,
  i32x4_shl = 0xfd0ab,
  i32x4_shr_s = 0xfd0ac,
  i32x4_shr_u = 0xfd0ad,
  i32x4_add = 0xfd0ae,
  i32x4_sub = 0xfd0b1,
  i32x4_mul = 0xfd0b5,
  i32x4_min_s = 0xfd0b6,
  i32x4_min_u = 0xfd0b7,
  i32x4_max_s = 0xfd0b8,
  i32x4_max_u = 0xfd0b9,
  i32x4_dot_i16x8_s = 0xfd0ba,
  i32x4_extmul_low_i16x8_s = 0xfd0bc,
  i32x4_extmul_high_i16x8_s = 0xfd0bd,
  i32x4_extmul_low_i16x8_u = 0xfd0be,
  i32x4_extmul_high_i16x8_u = 0xfd0bf,
  i64x2_abs = 0xfd0c0,
  i64x2_neg = 0xfd0c1,
  i64x2_all_true = 0xfd0c3,
  i64x2_bitmask = 0xfd0c4,
  i64x2_extend_low_i32x4_s = 0xfd0c7,
  i64x2_extend_high_i32x4_s = 0xfd0c8,
  i64x2_extend_low_i32x4_u = 0xfd0c9,
  i64x2_extend_high_i32x4_u = 0xfd0ca,
  i64x2_shl = 0xfd0cb,
  i64x2_shr_s = 0xfd0cc,
  i64x2_shr_u = 0xfd0cd,
  i64x2_add = 0xfd0ce,
  i64x2_sub = 0xfd0d1,
  i64x2_mul = 0xfd0d5,
  i64x2_eq = 0xfd0d6,
  i64x2_ne = 0xfd0d7,
  i64x2_lt_s = 0xfd0d8,
  i64x2_gt_s = 0xfd0d9,
  i64x2_le_s = 0xfd0da,
  i64x2_ge_s = 0xfd0db,
  i64x2_extmul_low_i32x4_s = 0xfd0dc,
  i64x2_extmul_high_i32x4_s = 0xfd0dd,
  i64x2_extmul_low_i32x4_u = 0xfd0de,
  i64x2_extmul_high_i32x4_u = 0xfd0df,
  f32x4_abs = 0xfd0e0,
  f32x4_neg = 0xfd0e1,
  f32x4_sqrt = 0xfd0e3,
  f32x4_add = 0xfd0e4,
  f32x4_sub = 0xfd0e5,
  f32x4_mul = 0xfd0e6,
  f32x4_div = 0xfd0e7,
  f32x4_min = 0xfd0e8,
  f32x4_max = 0xfd0e9,
  f32x4_pmin = 0xfd0ea,
  f32x4_pmax = 0xfd0eb,
  f64x2_abs = 0xfd0ec,
  f64x2_neg = 0xfd0ed,
  f64x2_sqrt = 0xfd0ef,
  f64x2_add = 0xfd0f0,
  f64x2_sub = 0xfd0f1,
  f64x2_mul = 0xfd0f2,
  f64x2_div = 0xfd0f3,
  f64x2_min = 0xfd0f4,
  f64x2_max = 0xfd0f5,
  f64x2_pmin = 0xfd0f6,
  f64x2_pmax = 0xfd0f7,
  i32x4_trunc_sat_f32x4_s = 0xfd0f8,
  i32x4_trunc_sat_f32x4_u = 0xfd0f9,
  f32x4_convert_i32x4_s = 0xfd0fa,
  f32x4_convert_i32x4_u = 0xfd0fb,
  i32x4_trunc_sat_f64x2_s_zero = 0xfd0fc,
  i32x4_trunc_sat_f64x2_u_zero = 0xfd0fd,
  f64x2_convert_low_i32x4_s = 0xfd0fe,
  f64x2_convert_low_i32x4_u = 0xfd0ff,

  // Relaxed SIMD
  i8x16_relaxed_swizzle = 0xfd100,
  i32x4_relaxed_trunc_f32x4_s = 0xfd101,
  i32x4_relaxed_trunc_f32x4_u = 0xfd102,
  i32x4_relaxed_trunc_f64x2_s_zero = 0xfd103,
  i32x4_relaxed_trunc_f64x2_u_zero = 0xfd104,
  f32x4_relaxed_madd = 0xfd105,
  f32x4_relaxed_nmadd = 0xfd106,
  f64x2_relaxed_madd = 0xfd107,
  f64x2_relaxed_nmadd = 0xfd108,
  i8x16_relaxed_laneselect = 0xfd109,
  i16x8_relaxed_laneselect = 0xfd10a,
  i32x4_relaxed_laneselect = 0xfd10b,
  i64x2_relaxed_laneselect = 0xfd10c,
  f32x4_relaxed_min = 0xfd10d,
  f32x4_relaxed_max = 0xfd10e,
  f64x2_relaxed_min = 0xfd10f,
  f64x2_relaxed_max = 0xfd110,
  i16x8_relaxed_q15mulr_s = 0xfd111,
  i16x8_dot_i8x16_i7x16_s = 0xfd112,
  i32x4_dot_i8x16_i7x16_add_s = 0xfd113,

  // GC proposal.
  struct_new = 0xfb00,
  struct_new_default = 0xfb01,
  struct_get = 0xfb02,
  struct_get_s = 0xfb03,
  struct_get_u = 0xfb04,
  struct_set = 0xfb05,
  array_new = 0xfb06,
  array_new_default = 0xfb07,
  array_new_fixed = 0xfb08,
  array_new_data = 0xfb09,
  array_new_elem = 0xfb0a,
  array_get = 0xfb0b,
  array_get_s = 0xfb0c,
  array_get_u = 0xfb0d,
  array_set = 0xfb0e,
  array_len = 0xfb0f,
  array_fill = 0xfb10,
  array_copy = 0xfb11,
  array_init_data = 0xfb12,
  array_init_elem = 0xfb13,
  ref_test = 0xfb14,
  ref_test_null = 0xfb15,
  ref_cast = 0xfb16,
  ref_cast_null = 0xfb17,
  br_on_cast = 0xfb18,
  br_on_cast_fail = 0xfb19,
  extern_internalize = 0xfb1a,
  extern_externalize = 0xfb1b,
  ref_i31 = 0xfb1c,
  i31_get_s = 0xfb1d,
  i31_get_u = 0xfb1e,
}

export const OperatorCodeNames = [
  "unreachable",
  "nop",
  "block",
  "loop",
  "if",
  "else",
  "try",
  "catch",
  "throw",
  "rethrow",
  "unwind",
  "end",
  "br",
  "br_if",
  "br_table",
  "return",
  "call",
  "call_indirect",
  "return_call",
  "return_call_indirect",
  "call_ref",
  "return_call_ref",
  undefined,
  "let",
  "delegate",
  "catch_all",
  "drop",
  "select",
  "select", // with types.
  undefined,
  undefined,
  undefined,
  "local.get",
  "local.set",
  "local.tee",
  "global.get",
  "global.set",
  "table.get",
  "table.set",
  undefined,
  "i32.load",
  "i64.load",
  "f32.load",
  "f64.load",
  "i32.load8_s",
  "i32.load8_u",
  "i32.load16_s",
  "i32.load16_u",
  "i64.load8_s",
  "i64.load8_u",
  "i64.load16_s",
  "i64.load16_u",
  "i64.load32_s",
  "i64.load32_u",
  "i32.store",
  "i64.store",
  "f32.store",
  "f64.store",
  "i32.store8",
  "i32.store16",
  "i64.store8",
  "i64.store16",
  "i64.store32",
  "memory.size",
  "memory.grow",
  "i32.const",
  "i64.const",
  "f32.const",
  "f64.const",
  "i32.eqz",
  "i32.eq",
  "i32.ne",
  "i32.lt_s",
  "i32.lt_u",
  "i32.gt_s",
  "i32.gt_u",
  "i32.le_s",
  "i32.le_u",
  "i32.ge_s",
  "i32.ge_u",
  "i64.eqz",
  "i64.eq",
  "i64.ne",
  "i64.lt_s",
  "i64.lt_u",
  "i64.gt_s",
  "i64.gt_u",
  "i64.le_s",
  "i64.le_u",
  "i64.ge_s",
  "i64.ge_u",
  "f32.eq",
  "f32.ne",
  "f32.lt",
  "f32.gt",
  "f32.le",
  "f32.ge",
  "f64.eq",
  "f64.ne",
  "f64.lt",
  "f64.gt",
  "f64.le",
  "f64.ge",
  "i32.clz",
  "i32.ctz",
  "i32.popcnt",
  "i32.add",
  "i32.sub",
  "i32.mul",
  "i32.div_s",
  "i32.div_u",
  "i32.rem_s",
  "i32.rem_u",
  "i32.and",
  "i32.or",
  "i32.xor",
  "i32.shl",
  "i32.shr_s",
  "i32.shr_u",
  "i32.rotl",
  "i32.rotr",
  "i64.clz",
  "i64.ctz",
  "i64.popcnt",
  "i64.add",
  "i64.sub",
  "i64.mul",
  "i64.div_s",
  "i64.div_u",
  "i64.rem_s",
  "i64.rem_u",
  "i64.and",
  "i64.or",
  "i64.xor",
  "i64.shl",
  "i64.shr_s",
  "i64.shr_u",
  "i64.rotl",
  "i64.rotr",
  "f32.abs",
  "f32.neg",
  "f32.ceil",
  "f32.floor",
  "f32.trunc",
  "f32.nearest",
  "f32.sqrt",
  "f32.add",
  "f32.sub",
  "f32.mul",
  "f32.div",
  "f32.min",
  "f32.max",
  "f32.copysign",
  "f64.abs",
  "f64.neg",
  "f64.ceil",
  "f64.floor",
  "f64.trunc",
  "f64.nearest",
  "f64.sqrt",
  "f64.add",
  "f64.sub",
  "f64.mul",
  "f64.div",
  "f64.min",
  "f64.max",
  "f64.copysign",
  "i32.wrap_i64",
  "i32.trunc_f32_s",
  "i32.trunc_f32_u",
  "i32.trunc_f64_s",
  "i32.trunc_f64_u",
  "i64.extend_i32_s",
  "i64.extend_i32_u",
  "i64.trunc_f32_s",
  "i64.trunc_f32_u",
  "i64.trunc_f64_s",
  "i64.trunc_f64_u",
  "f32.convert_i32_s",
  "f32.convert_i32_u",
  "f32.convert_i64_s",
  "f32.convert_i64_u",
  "f32.demote_f64",
  "f64.convert_i32_s",
  "f64.convert_i32_u",
  "f64.convert_i64_s",
  "f64.convert_i64_u",
  "f64.promote_f32",
  "i32.reinterpret_f32",
  "i64.reinterpret_f64",
  "f32.reinterpret_i32",
  "f64.reinterpret_i64",
  "i32.extend8_s",
  "i32.extend16_s",
  "i64.extend8_s",
  "i64.extend16_s",
  "i64.extend32_s",
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  "ref.null",
  "ref.is_null",
  "ref.func",
  "ref.eq",
  "ref.as_non_null",
  "br_on_null",
  "br_on_non_null",
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
];

[
  "i32.trunc_sat_f32_s",
  "i32.trunc_sat_f32_u",
  "i32.trunc_sat_f64_s",
  "i32.trunc_sat_f64_u",
  "i64.trunc_sat_f32_s",
  "i64.trunc_sat_f32_u",
  "i64.trunc_sat_f64_s",
  "i64.trunc_sat_f64_u",
  "memory.init",
  "data.drop",
  "memory.copy",
  "memory.fill",
  "table.init",
  "elem.drop",
  "table.copy",
  "table.grow",
  "table.size",
  "table.fill",
].forEach((s, i) => {
  OperatorCodeNames[0xfc00 | i] = s;
});

[
  "v128.load",
  "i16x8.load8x8_s",
  "i16x8.load8x8_u",
  "i32x4.load16x4_s",
  "i32x4.load16x4_u",
  "i64x2.load32x2_s",
  "i64x2.load32x2_u",
  "v8x16.load_splat",
  "v16x8.load_splat",
  "v32x4.load_splat",
  "v64x2.load_splat",
  "v128.store",
  "v128.const",
  "i8x16.shuffle",
  "i8x16.swizzle",
  "i8x16.splat",
  "i16x8.splat",
  "i32x4.splat",
  "i64x2.splat",
  "f32x4.splat",
  "f64x2.splat",
  "i8x16.extract_lane_s",
  "i8x16.extract_lane_u",
  "i8x16.replace_lane",
  "i16x8.extract_lane_s",
  "i16x8.extract_lane_u",
  "i16x8.replace_lane",
  "i32x4.extract_lane",
  "i32x4.replace_lane",
  "i64x2.extract_lane",
  "i64x2.replace_lane",
  "f32x4.extract_lane",
  "f32x4.replace_lane",
  "f64x2.extract_lane",
  "f64x2.replace_lane",
  "i8x16.eq",
  "i8x16.ne",
  "i8x16.lt_s",
  "i8x16.lt_u",
  "i8x16.gt_s",
  "i8x16.gt_u",
  "i8x16.le_s",
  "i8x16.le_u",
  "i8x16.ge_s",
  "i8x16.ge_u",
  "i16x8.eq",
  "i16x8.ne",
  "i16x8.lt_s",
  "i16x8.lt_u",
  "i16x8.gt_s",
  "i16x8.gt_u",
  "i16x8.le_s",
  "i16x8.le_u",
  "i16x8.ge_s",
  "i16x8.ge_u",
  "i32x4.eq",
  "i32x4.ne",
  "i32x4.lt_s",
  "i32x4.lt_u",
  "i32x4.gt_s",
  "i32x4.gt_u",
  "i32x4.le_s",
  "i32x4.le_u",
  "i32x4.ge_s",
  "i32x4.ge_u",
  "f32x4.eq",
  "f32x4.ne",
  "f32x4.lt",
  "f32x4.gt",
  "f32x4.le",
  "f32x4.ge",
  "f64x2.eq",
  "f64x2.ne",
  "f64x2.lt",
  "f64x2.gt",
  "f64x2.le",
  "f64x2.ge",
  "v128.not",
  "v128.and",
  "v128.andnot",
  "v128.or",
  "v128.xor",
  "v128.bitselect",
  "v128.any_true",
  "v128.load8_lane",
  "v128.load16_lane",
  "v128.load32_lane",
  "v128.load64_lane",
  "v128.store8_lane",
  "v128.store16_lane",
  "v128.store32_lane",
  "v128.store64_lane",
  "v128.load32_zero",
  "v128.load64_zero",
  "f32x4.demote_f64x2_zero",
  "f64x2.promote_low_f32x4",
  "i8x16.abs",
  "i8x16.neg",
  "i8x16_popcnt",
  "i8x16.all_true",
  "i8x16.bitmask",
  "i8x16.narrow_i16x8_s",
  "i8x16.narrow_i16x8_u",
  "f32x4.ceil",
  "f32x4.floor",
  "f32x4.trunc",
  "f32x4.nearest",
  "i8x16.shl",
  "i8x16.shr_s",
  "i8x16.shr_u",
  "i8x16.add",
  "i8x16.add_sat_s",
  "i8x16.add_sat_u",
  "i8x16.sub",
  "i8x16.sub_sat_s",
  "i8x16.sub_sat_u",
  "f64x2.ceil",
  "f64x2.floor",
  "i8x16.min_s",
  "i8x16.min_u",
  "i8x16.max_s",
  "i8x16.max_u",
  "f64x2.trunc",
  "i8x16.avgr_u",
  "i16x8.extadd_pairwise_i8x16_s",
  "i16x8.extadd_pairwise_i8x16_u",
  "i32x4.extadd_pairwise_i16x8_s",
  "i32x4.extadd_pairwise_i16x8_u",
  "i16x8.abs",
  "i16x8.neg",
  "i16x8.q15mulr_sat_s",
  "i16x8.all_true",
  "i16x8.bitmask",
  "i16x8.narrow_i32x4_s",
  "i16x8.narrow_i32x4_u",
  "i16x8.extend_low_i8x16_s",
  "i16x8.extend_high_i8x16_s",
  "i16x8.extend_low_i8x16_u",
  "i16x8.extend_high_i8x16_u",
  "i16x8.shl",
  "i16x8.shr_s",
  "i16x8.shr_u",
  "i16x8.add",
  "i16x8.add_sat_s",
  "i16x8.add_sat_u",
  "i16x8.sub",
  "i16x8.sub_sat_s",
  "i16x8.sub_sat_u",
  "f64x2.nearest",
  "i16x8.mul",
  "i16x8.min_s",
  "i16x8.min_u",
  "i16x8.max_s",
  "i16x8.max_u",
  undefined,
  "i16x8.avgr_u",
  "i16x8.extmul_low_i8x16_s",
  "i16x8.extmul_high_i8x16_s",
  "i16x8.extmul_low_i8x16_u",
  "i16x8.extmul_high_i8x16_u",
  "i32x4.abs",
  "i32x4.neg",
  undefined,
  "i32x4.all_true",
  "i32x4.bitmask",
  undefined,
  undefined,
  "i32x4.extend_low_i16x8_s",
  "i32x4.extend_high_i16x8_s",
  "i32x4.extend_low_i16x8_u",
  "i32x4.extend_high_i16x8_u",
  "i32x4.shl",
  "i32x4.shr_s",
  "i32x4.shr_u",
  "i32x4.add",
  undefined,
  undefined,
  "i32x4.sub",
  undefined,
  undefined,
  undefined,
  "i32x4.mul",
  "i32x4.min_s",
  "i32x4.min_u",
  "i32x4.max_s",
  "i32x4.max_u",
  "i32x4.dot_i16x8_s",
  undefined,
  "i32x4.extmul_low_i16x8_s",
  "i32x4.extmul_high_i16x8_s",
  "i32x4.extmul_low_i16x8_u",
  "i32x4.extmul_high_i16x8_u",
  "i64x2.abs",
  "i64x2.neg",
  undefined,
  "i64x2.all_true",
  "i64x2.bitmask",
  undefined,
  undefined,
  "i64x2.extend_low_i32x4_s",
  "i64x2.extend_high_i32x4_s",
  "i64x2.extend_low_i32x4_u",
  "i64x2.extend_high_i32x4_u",
  "i64x2.shl",
  "i64x2.shr_s",
  "i64x2.shr_u",
  "i64x2.add",
  undefined,
  undefined,
  "i64x2.sub",
  undefined,
  undefined,
  undefined,
  "i64x2.mul",
  "i64x2.eq",
  "i64x2.ne",
  "i64x2.lt_s",
  "i64x2.gt_s",
  "i64x2.le_s",
  "i64x2.ge_s",
  "i64x2.extmul_low_i32x4_s",
  "i64x2.extmul_high_i32x4_s",
  "i64x2.extmul_low_i32x4_u",
  "i64x2.extmul_high_i32x4_u",
  "f32x4.abs",
  "f32x4.neg",
  undefined,
  "f32x4.sqrt",
  "f32x4.add",
  "f32x4.sub",
  "f32x4.mul",
  "f32x4.div",
  "f32x4.min",
  "f32x4.max",
  "f32x4.pmin",
  "f32x4.pmax",
  "f64x2.abs",
  "f64x2.neg",
  undefined,
  "f64x2.sqrt",
  "f64x2.add",
  "f64x2.sub",
  "f64x2.mul",
  "f64x2.div",
  "f64x2.min",
  "f64x2.max",
  "f64x2.pmin",
  "f64x2.pmax",
  "i32x4.trunc_sat_f32x4_s",
  "i32x4.trunc_sat_f32x4_u",
  "f32x4.convert_i32x4_s",
  "f32x4.convert_i32x4_u",
  "i32x4.trunc_sat_f64x2_s_zero",
  "i32x4.trunc_sat_f64x2_u_zero",
  "f64x2.convert_low_i32x4_s",
  "f64x2.convert_low_i32x4_u",
  "i8x16.relaxed_swizzle",
  "i32x4.relaxed_trunc_f32x4_s",
  "i32x4.relaxed_trunc_f32x4_u",
  "i32x4.relaxed_trunc_f64x2_s_zero",
  "i32x4.relaxed_trunc_f64x2_u_zero",
  "f32x4.relaxed_madd",
  "f32x4.relaxed_nmadd",
  "f64x2.relaxed_madd",
  "f64x2.relaxed_nmadd",
  "i8x16.relaxed_laneselect",
  "i16x8.relaxed_laneselect",
  "i32x4.relaxed_laneselect",
  "i64x2.relaxed_laneselect",
  "f32x4.relaxed_min",
  "f32x4.relaxed_max",
  "f64x2.relaxed_min",
  "f64x2.relaxed_max",
  "i16x8.relaxed_q15mulr_s",
  "i16x8.dot_i8x16_i7x16_s",
  "i32x4.dot_i8x16_i7x16_add_s",
].forEach((s, i) => {
  OperatorCodeNames[0xfd000 | i] = s;
});

[
  "memory.atomic.notify",
  "memory.atomic.wait32",
  "memory.atomic.wait64",
  "atomic.fence",
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  "i32.atomic.load",
  "i64.atomic.load",
  "i32.atomic.load8_u",
  "i32.atomic.load16_u",
  "i64.atomic.load8_u",
  "i64.atomic.load16_u",
  "i64.atomic.load32_u",
  "i32.atomic.store",
  "i64.atomic.store",
  "i32.atomic.store8",
  "i32.atomic.store16",
  "i64.atomic.store8",
  "i64.atomic.store16",
  "i64.atomic.store32",
  "i32.atomic.rmw.add",
  "i64.atomic.rmw.add",
  "i32.atomic.rmw8.add_u",
  "i32.atomic.rmw16.add_u",
  "i64.atomic.rmw8.add_u",
  "i64.atomic.rmw16.add_u",
  "i64.atomic.rmw32.add_u",
  "i32.atomic.rmw.sub",
  "i64.atomic.rmw.sub",
  "i32.atomic.rmw8.sub_u",
  "i32.atomic.rmw16.sub_u",
  "i64.atomic.rmw8.sub_u",
  "i64.atomic.rmw16.sub_u",
  "i64.atomic.rmw32.sub_u",
  "i32.atomic.rmw.and",
  "i64.atomic.rmw.and",
  "i32.atomic.rmw8.and_u",
  "i32.atomic.rmw16.and_u",
  "i64.atomic.rmw8.and_u",
  "i64.atomic.rmw16.and_u",
  "i64.atomic.rmw32.and_u",
  "i32.atomic.rmw.or",
  "i64.atomic.rmw.or",
  "i32.atomic.rmw8.or_u",
  "i32.atomic.rmw16.or_u",
  "i64.atomic.rmw8.or_u",
  "i64.atomic.rmw16.or_u",
  "i64.atomic.rmw32.or_u",
  "i32.atomic.rmw.xor",
  "i64.atomic.rmw.xor",
  "i32.atomic.rmw8.xor_u",
  "i32.atomic.rmw16.xor_u",
  "i64.atomic.rmw8.xor_u",
  "i64.atomic.rmw16.xor_u",
  "i64.atomic.rmw32.xor_u",
  "i32.atomic.rmw.xchg",
  "i64.atomic.rmw.xchg",
  "i32.atomic.rmw8.xchg_u",
  "i32.atomic.rmw16.xchg_u",
  "i64.atomic.rmw8.xchg_u",
  "i64.atomic.rmw16.xchg_u",
  "i64.atomic.rmw32.xchg_u",
  "i32.atomic.rmw.cmpxchg",
  "i64.atomic.rmw.cmpxchg",
  "i32.atomic.rmw8.cmpxchg_u",
  "i32.atomic.rmw16.cmpxchg_u",
  "i64.atomic.rmw8.cmpxchg_u",
  "i64.atomic.rmw16.cmpxchg_u",
  "i64.atomic.rmw32.cmpxchg_u",
].forEach((s, i) => {
  OperatorCodeNames[0xfe00 | i] = s;
});

[
  "struct.new",
  "struct.new_default",
  "struct.get",
  "struct.get_s",
  "struct.get_u",
  "struct.set",
  "array.new",
  "array.new_default",
  "array.new_fixed",
  "array.new_data",
  "array.new_elem",
  "array.get",
  "array.get_s",
  "array.get_u",
  "array.set",
  "array.len",
  "array.fill",
  "array.copy",
  "array.init_data",
  "array.init_elem",
  "ref.test",
  "ref.test null",
  "ref.cast",
  "ref.cast null",
  "br_on_cast",
  "br_on_cast_fail",
  "extern.internalize",
  "extern.externalize",
  "ref.i31",
  "i31.get_s",
  "i31.get_u",
].forEach((s, i) => {
  OperatorCodeNames[0xfb00 | i] = s;
});

export const enum ExternalKind {
  Function = 0,
  Table = 1,
  Memory = 2,
  Global = 3,
  Tag = 4,
}
export const enum TypeKind {
  unspecified = 0,
  i32 = -0x01,
  i64 = -0x02,
  f32 = -0x03,
  f64 = -0x04,
  v128 = -0x05,
  i8 = -0x08,
  i16 = -0x09,
  nullfuncref = -0x0d,
  nullref = -0x0f,
  nullexternref = -0x0e,
  funcref = -0x10,
  externref = -0x11,
  anyref = -0x12,
  eqref = -0x13,
  i31ref = -0x14,
  structref = -0x15,
  arrayref = -0x16,
  ref = -0x1c,
  ref_null = -0x1d,
  func = -0x20,
  struct = -0x21,
  array = -0x22,
  subtype = -0x30,
  subtype_final = -0x31,
  rec_group = -0x32,
  empty_block_type = -0x40,
}
export class FieldDef {
  ty: Type;
  mutable: boolean;
}
export class FuncDef {
  params: Type[];
  results: Type[];
}
export class Type {
  code: number;
  constructor(code: number) {
    this.code = code;
  }
  public get isIndex(): boolean {
    return this.code >= 0;
  }
  public get kind(): TypeKind {
    return this.code >= 0 ? TypeKind.unspecified : this.code;
  }
  public get index(): number {
    return this.code < 0 ? -1 : this.code;
  }
  // Convenience singletons.
  static funcref: Type = new Type(TypeKind.funcref);
  static externref: Type = new Type(TypeKind.externref);
}
export class RefType extends Type {
  public ref_index: number;
  constructor(kind: TypeKind, ref_index: number) {
    if (kind != TypeKind.ref && kind !== TypeKind.ref_null) {
      throw new Error(`Unexpected type kind: ${kind}}`);
    }
    super(kind);
    this.ref_index = ref_index;
  }
  public get isNullable(): boolean {
    return this.kind == TypeKind.ref_null;
  }
}

export const enum RelocType {
  FunctionIndex_LEB = 0,
  TableIndex_SLEB = 1,
  TableIndex_I32 = 2,
  GlobalAddr_LEB = 3,
  GlobalAddr_SLEB = 4,
  GlobalAddr_I32 = 5,
  TypeIndex_LEB = 6,
  GlobalIndex_LEB = 7,
}
export const enum LinkingType {
  StackPointer = 1,
}
export const enum NameType {
  Module = 0,
  Function = 1,
  Local = 2,
  Label = 3,
  Type = 4,
  Table = 5,
  Memory = 6,
  Global = 7,
  Elem = 8,
  Data = 9,
  Field = 10,
  Tag = 11,
}
export const enum BinaryReaderState {
  ERROR = -1,
  INITIAL = 0,
  BEGIN_WASM = 1,
  END_WASM = 2,
  BEGIN_SECTION = 3,
  END_SECTION = 4,
  SKIPPING_SECTION = 5,
  READING_SECTION_RAW_DATA = 6,
  SECTION_RAW_DATA = 7,

  TYPE_SECTION_ENTRY = 11,
  IMPORT_SECTION_ENTRY = 12,
  FUNCTION_SECTION_ENTRY = 13,
  TABLE_SECTION_ENTRY = 14,
  MEMORY_SECTION_ENTRY = 15,
  GLOBAL_SECTION_ENTRY = 16,
  EXPORT_SECTION_ENTRY = 17,
  DATA_SECTION_ENTRY = 18,
  NAME_SECTION_ENTRY = 19,
  ELEMENT_SECTION_ENTRY = 20,
  LINKING_SECTION_ENTRY = 21,
  START_SECTION_ENTRY = 22,
  TAG_SECTION_ENTRY = 23,

  BEGIN_INIT_EXPRESSION_BODY = 25,
  INIT_EXPRESSION_OPERATOR = 26,
  END_INIT_EXPRESSION_BODY = 27,

  BEGIN_FUNCTION_BODY = 28,
  READING_FUNCTION_HEADER = 29,
  CODE_OPERATOR = 30,
  END_FUNCTION_BODY = 31,
  SKIPPING_FUNCTION_BODY = 32,

  BEGIN_ELEMENT_SECTION_ENTRY = 33,
  ELEMENT_SECTION_ENTRY_BODY = 34,
  END_ELEMENT_SECTION_ENTRY = 35,

  BEGIN_DATA_SECTION_ENTRY = 36,
  DATA_SECTION_ENTRY_BODY = 37,
  END_DATA_SECTION_ENTRY = 38,

  BEGIN_GLOBAL_SECTION_ENTRY = 39,
  END_GLOBAL_SECTION_ENTRY = 40,

  RELOC_SECTION_HEADER = 41,
  RELOC_SECTION_ENTRY = 42,

  SOURCE_MAPPING_URL = 43,

  BEGIN_OFFSET_EXPRESSION_BODY = 44,
  OFFSET_EXPRESSION_OPERATOR = 45,
  END_OFFSET_EXPRESSION_BODY = 46,

  BEGIN_REC_GROUP = 47,
  END_REC_GROUP = 48,

  DATA_COUNT_SECTION_ENTRY = 49,
}

const enum DataSegmentType {
  Active = 0x00,
  Passive = 0x01,
  ActiveWithMemoryIndex = 0x02,
}

function isActiveDataSegmentType(segmentType: number): boolean {
  switch (segmentType) {
    case DataSegmentType.Active:
    case DataSegmentType.ActiveWithMemoryIndex:
      return true;
    default:
      return false;
  }
}

export const enum DataMode {
  Active,
  Passive,
}

const enum ElementSegmentType {
  LegacyActiveFuncrefExternval = 0x00,
  PassiveExternval = 0x01,
  ActiveExternval = 0x02,
  DeclaredExternval = 0x03,
  LegacyActiveFuncrefElemexpr = 0x04,
  PassiveElemexpr = 0x05,
  ActiveElemexpr = 0x06,
  DeclaredElemexpr = 0x07,
}

function isActiveElementSegmentType(segmentType: number): boolean {
  switch (segmentType) {
    case ElementSegmentType.LegacyActiveFuncrefExternval:
    case ElementSegmentType.ActiveExternval:
    case ElementSegmentType.LegacyActiveFuncrefElemexpr:
    case ElementSegmentType.ActiveElemexpr:
      return true;
    default:
      return false;
  }
}

function isExternvalElementSegmentType(segmentType: number): boolean {
  switch (segmentType) {
    case ElementSegmentType.LegacyActiveFuncrefExternval:
    case ElementSegmentType.PassiveExternval:
    case ElementSegmentType.ActiveExternval:
    case ElementSegmentType.DeclaredExternval:
      return true;
    default:
      return false;
  }
}

export const enum ElementMode {
  Active,
  Passive,
  Declarative,
}

class DataRange {
  start: number;
  end: number;
  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
  }
  offset(delta: number) {
    this.start += delta;
    this.end += delta;
  }
}
export interface IModuleHeader {
  magicNumber: number;
  version: number;
}
export interface IResizableLimits {
  initial: number;
  maximum?: number;
}
export interface ITableType {
  elementType: Type;
  limits: IResizableLimits;
}
export interface IMemoryType {
  limits: IResizableLimits;
  shared: boolean;
}
export interface IGlobalType {
  contentType: Type;
  mutability: number;
}
export enum TagAttribute {
  Exception = 0,
}
export interface ITagType {
  attribute: TagAttribute;
  typeIndex: number;
}
export interface IGlobalVariable {
  type: IGlobalType;
}
export interface IElementSegment {
  mode: ElementMode;
  tableIndex?: number;
}
export interface IElementSegmentBody {
  elementType: Type;
}
export interface IDataSegment {
  mode: DataMode;
  memoryIndex?: number;
}
export interface IDataSegmentBody {
  data: Uint8Array;
}
export type ImportEntryType = ITableType | IMemoryType | IGlobalType | ITagType;
export interface IImportEntry {
  module: Uint8Array;
  field: Uint8Array;
  kind: ExternalKind;
  funcTypeIndex?: number;
  type?: ImportEntryType;
}
export interface IExportEntry {
  field: Uint8Array;
  kind: ExternalKind;
  index: number;
}
export interface INameEntry {
  type: NameType;
}
export interface INaming {
  index: number;
  name: Uint8Array;
}
export interface IModuleNameEntry extends INameEntry {
  moduleName: Uint8Array;
}
export interface IFunctionNameEntry extends INameEntry {
  names: INaming[];
}
export interface ILocalName {
  index: number;
  locals: INaming[];
}
export interface ILocalNameEntry extends INameEntry {
  funcs: ILocalName[];
}
export interface ITagNameEntry extends INameEntry {
  names: INaming[];
}
export interface ITypeNameEntry extends INameEntry {
  names: INaming[];
}
export interface ITableNameEntry extends INameEntry {
  names: INaming[];
}
export interface IMemoryNameEntry extends INameEntry {
  names: INaming[];
}
export interface IGlobalNameEntry extends INameEntry {
  names: INaming[];
}
export interface IFieldName {
  index: number;
  fields: INaming[];
}
export interface IFieldNameEntry extends INameEntry {
  types: IFieldName[];
}
export interface ILinkingEntry {
  type: LinkingType;
  index?: number;
}
export interface IRelocHeader {
  id: SectionCode;
  name: Uint8Array;
}
export interface IRelocEntry {
  type: RelocType;
  offset: number;
  index: number;
  addend?: number;
}
export interface ISourceMappingURL {
  url: Uint8Array;
}
export interface IStartEntry {
  index: number;
}
export interface IFunctionEntry {
  typeIndex: number;
}
export interface ITypeEntry {
  // func | struct | array | func_subtype | struct_subtype | array_subtype
  form: number;
  params?: Type[]; // For function types.
  returns?: Type[]; // For function types.
  fields?: Type[]; // For struct types.
  mutabilities?: boolean[]; // For struct types.
  elementType?: Type; // For array types.
  mutability?: boolean; // For array types.
  supertypes?: number[]; // For subtype types.
  final?: boolean; // For subtype types.
}
export interface ISectionInformation {
  id: SectionCode;
  name: Uint8Array;
}
export interface ILocals {
  count: number;
  type: Type;
}
export interface IFunctionInformation {
  locals: Array<ILocals>;
}
export interface IMemoryAddress {
  flags: number;
  offset: number;
}
export interface IOperatorInformation {
  code: OperatorCode;
  blockType?: Type;
  selectType?: Type;
  refType?: number; // "HeapType" format, a.k.a. s33
  srcType?: number; // "HeapType" format, a.k.a. s33
  brDepth?: number;
  brTable?: Array<number>;
  relativeDepth?: number;
  funcIndex?: number;
  typeIndex?: number;
  tableIndex?: number;
  localIndex?: number;
  fieldIndex?: number;
  globalIndex?: number;
  segmentIndex?: number;
  tagIndex?: number;
  destinationIndex?: number;
  memoryAddress?: IMemoryAddress;
  literal?: number | Int64 | Uint8Array;
  len?: number;
  lines: Uint8Array;
  lineIndex: number;
}
export class Int64 {
  private _data: Uint8Array;
  constructor(data: Uint8Array) {
    this._data = data || new Uint8Array(8);
  }
  public toInt32(): number {
    return (
      this._data[0] |
      (this._data[1] << 8) |
      (this._data[2] << 16) |
      (this._data[3] << 24)
    );
  }
  public toDouble(): number {
    var power = 1;
    var sum;
    if (this._data[7] & 0x80) {
      sum = -1;
      for (var i = 0; i < 8; i++, power *= 256)
        sum -= power * (0xff ^ this._data[i]);
    } else {
      sum = 0;
      for (var i = 0; i < 8; i++, power *= 256) sum += power * this._data[i];
    }
    return sum;
  }
  public toString(): string {
    var low =
      (this._data[0] |
        (this._data[1] << 8) |
        (this._data[2] << 16) |
        (this._data[3] << 24)) >>>
      0;
    var high =
      (this._data[4] |
        (this._data[5] << 8) |
        (this._data[6] << 16) |
        (this._data[7] << 24)) >>>
      0;
    if (low === 0 && high === 0) {
      return "0";
    }
    var sign = false;
    if (high >> 31) {
      high = 4294967296 - high;
      if (low > 0) {
        high--;
        low = 4294967296 - low;
      }
      sign = true;
    }
    var buf = [];
    while (high > 0) {
      var t = (high % 10) * 4294967296 + low;
      high = Math.floor(high / 10);
      buf.unshift((t % 10).toString());
      low = Math.floor(t / 10);
    }
    while (low > 0) {
      buf.unshift((low % 10).toString());
      low = Math.floor(low / 10);
    }
    if (sign) buf.unshift("-");
    return buf.join("");
  }
  public get data(): Uint8Array {
    return this._data;
  }
}
export type BinaryReaderResult =
  | IImportEntry
  | IExportEntry
  | IFunctionEntry
  | ITypeEntry
  | IModuleHeader
  | IOperatorInformation
  | IMemoryType
  | ITableType
  | IGlobalVariable
  | INameEntry
  | IElementSegment
  | IElementSegmentBody
  | IDataSegment
  | IDataSegmentBody
  | ISectionInformation
  | IFunctionInformation
  | ISectionInformation
  | IFunctionInformation
  | IRelocHeader
  | IRelocEntry
  | ILinkingEntry
  | ISourceMappingURL
  | IModuleNameEntry
  | IStartEntry
  | Uint8Array
  | number;
export class BinaryReader {
  private _data: Uint8Array = null;
  private _pos = 0;
  private _length = 0;
  private _eof = false;
  public state: BinaryReaderState = BinaryReaderState.INITIAL;
  public result: BinaryReaderResult = null;
  public error: Error = null;
  private _sectionEntriesLeft = 0;
  private _sectionId: SectionCode = SectionCode.Unknown;
  private _sectionRange: DataRange = null;
  private _functionRange: DataRange = null;
  private _segmentType: DataSegmentType | ElementSegmentType = 0;
  private _segmentEntriesLeft = 0;
  private _recGroupTypesLeft = 0;
  public get data(): Uint8Array {
    return this._data;
  }
  public get position(): number {
    return this._pos;
  }
  public get length(): number {
    return this._length;
  }
  public setData(
    buffer: ArrayBuffer,
    pos: number,
    length: number,
    eof?: boolean
  ): void {
    var posDelta = pos - this._pos;
    this._data = new Uint8Array(buffer);
    this._pos = pos;
    this._length = length;
    this._eof = eof === undefined ? true : eof;
    if (this._sectionRange) this._sectionRange.offset(posDelta);
    if (this._functionRange) this._functionRange.offset(posDelta);
  }
  private hasBytes(n: number): boolean {
    return this._pos + n <= this._length;
  }
  public hasMoreBytes(): boolean {
    return this.hasBytes(1);
  }
  private readUint8(): number {
    return this._data[this._pos++];
  }
  private readInt32(): number {
    var b1 = this._data[this._pos++];
    var b2 = this._data[this._pos++];
    var b3 = this._data[this._pos++];
    var b4 = this._data[this._pos++];
    return b1 | (b2 << 8) | (b3 << 16) | (b4 << 24);
  }
  private readUint32(): number {
    return this.readInt32();
  }
  private peekInt32(): number {
    var b1 = this._data[this._pos];
    var b2 = this._data[this._pos + 1];
    var b3 = this._data[this._pos + 2];
    var b4 = this._data[this._pos + 3];
    return b1 | (b2 << 8) | (b3 << 16) | (b4 << 24);
  }
  private hasVarIntBytes(): boolean {
    var pos = this._pos;
    while (pos < this._length) {
      if ((this._data[pos++] & 0x80) == 0) return true;
    }
    return false;
  }
  private readVarUint1(): number {
    return this.readUint8();
  }
  private readVarInt7(): number {
    return (this.readUint8() << 25) >> 25;
  }
  private readVarUint7(): number {
    return this.readUint8();
  }
  private readVarInt32(): number {
    var result = 0;
    var shift = 0;
    while (true) {
      var byte = this.readUint8();
      result |= (byte & 0x7f) << shift;
      shift += 7;
      if ((byte & 0x80) === 0) break;
    }
    if (shift >= 32) return result;
    var ashift = 32 - shift;
    return (result << ashift) >> ashift;
  }
  private readVarUint32(): number {
    var result = 0;
    var shift = 0;
    while (true) {
      var byte = this.readUint8();
      result |= (byte & 0x7f) << shift;
      shift += 7;
      if ((byte & 0x80) === 0) break;
    }
    return result >>> 0;
  }
  private readVarInt64(): Int64 {
    var result = new Uint8Array(8);
    var i = 0;
    var c = 0;
    var shift = 0;
    while (true) {
      var byte = this.readUint8();
      c |= (byte & 0x7f) << shift;
      shift += 7;
      if (shift > 8) {
        result[i++] = c & 0xff;
        c >>= 8;
        shift -= 8;
      }
      if ((byte & 0x80) === 0) break;
    }
    var ashift = 32 - shift;
    c = (c << ashift) >> ashift;
    while (i < 8) {
      result[i++] = c & 0xff;
      c >>= 8;
    }
    return new Int64(result);
  }
  // Reads any "s33" (signed 33-bit integer) value correctly; no guarantees
  // outside that range.
  private readHeapType(): number {
    const lsb = this.readUint8();
    if (lsb & 0x80) {
      // Has more data than one byte.
      const tail = this.readVarInt32();
      return (tail - 1) * 128 + lsb;
    } else {
      return (lsb << 25) >> 25;
    }
  }
  private readType(): Type {
    var kind = this.readHeapType();
    if (kind >= 0) {
      return new Type(kind);
    }
    switch (kind) {
      case TypeKind.ref_null:
      case TypeKind.ref:
        var index = this.readHeapType();
        return new RefType(kind, index);
      case TypeKind.i32:
      case TypeKind.i64:
      case TypeKind.f32:
      case TypeKind.f64:
      case TypeKind.v128:
      case TypeKind.i8:
      case TypeKind.i16:
      case TypeKind.funcref:
      case TypeKind.externref:
      case TypeKind.anyref:
      case TypeKind.eqref:
      case TypeKind.i31ref:
      case TypeKind.nullexternref:
      case TypeKind.nullfuncref:
      case TypeKind.structref:
      case TypeKind.arrayref:
      case TypeKind.nullref:
      case TypeKind.func:
      case TypeKind.struct:
      case TypeKind.array:
      case TypeKind.subtype:
      case TypeKind.rec_group:
      case TypeKind.subtype_final:
      case TypeKind.empty_block_type:
        return new Type(kind);
      default:
        throw new Error(`Unknown type kind: ${kind}`);
    }
  }
  private readStringBytes(): Uint8Array {
    var length = this.readVarUint32();
    return this.readBytes(length);
  }
  private readBytes(length: number): Uint8Array {
    var result = this._data.subarray(this._pos, this._pos + length);
    this._pos += length;
    return new Uint8Array(result); // making a clone of the data
  }
  private skipBytes(length: number) {
    this._pos += length;
  }
  private hasStringBytes(): boolean {
    if (!this.hasVarIntBytes()) return false;
    var pos = this._pos;
    var length = this.readVarUint32();
    var result = this.hasBytes(length);
    this._pos = pos;
    return result;
  }
  private hasSectionPayload(): boolean {
    return this.hasBytes(this._sectionRange.end - this._pos);
  }
  private readFuncType(): ITypeEntry {
    var paramCount = this.readVarUint32();
    var paramTypes = new Array(paramCount);
    for (var i = 0; i < paramCount; i++) paramTypes[i] = this.readType();
    var returnCount = this.readVarUint32();
    var returnTypes = new Array(returnCount);
    for (var i = 0; i < returnCount; i++) returnTypes[i] = this.readType();
    return {
      form: TypeKind.func,
      params: paramTypes,
      returns: returnTypes,
    };
  }
  private readBaseType(): ITypeEntry {
    var form = this.readVarInt7();
    switch (form) {
      case TypeKind.func:
        return this.readFuncType();
      case TypeKind.struct:
        return this.readStructType();
      case TypeKind.array:
        return this.readArrayType();
      default:
        throw new Error(`Unknown type kind: ${form}`);
    }
  }
  private readSubtype(final: boolean): ITypeEntry {
    var supertypesCount = this.readVarUint32();
    var supertypes = new Array(supertypesCount);
    for (var i = 0; i < supertypesCount; i++) {
      supertypes[i] = this.readHeapType();
    }
    var result = this.readBaseType();
    result.supertypes = supertypes;
    result.final = final;
    return result;
  }
  private readStructType(): ITypeEntry {
    var fieldCount = this.readVarUint32();
    var fieldTypes = new Array(fieldCount);
    var fieldMutabilities = new Array(fieldCount);
    for (var i = 0; i < fieldCount; i++) {
      fieldTypes[i] = this.readType();
      fieldMutabilities[i] = !!this.readVarUint1();
    }
    return {
      form: TypeKind.struct,
      fields: fieldTypes,
      mutabilities: fieldMutabilities,
    };
  }
  private readArrayType(): ITypeEntry {
    var elementType = this.readType();
    var mutability = !!this.readVarUint1();
    return {
      form: TypeKind.array,
      elementType: elementType,
      mutability: mutability,
    };
  }
  private readResizableLimits(maxPresent: boolean): IResizableLimits {
    var initial = this.readVarUint32();
    var maximum;
    if (maxPresent) {
      maximum = this.readVarUint32();
    }
    return { initial: initial, maximum: maximum };
  }
  private readTableType(): ITableType {
    var elementType = this.readType();
    var flags = this.readVarUint32();
    var limits = this.readResizableLimits(!!(flags & 0x01));
    return { elementType: elementType, limits: limits };
  }
  private readMemoryType(): IMemoryType {
    var flags = this.readVarUint32();
    var shared = !!(flags & 0x02);
    return {
      limits: this.readResizableLimits(!!(flags & 0x01)),
      shared: shared,
    };
  }
  private readGlobalType(): IGlobalType {
    if (!this.hasVarIntBytes()) {
      return null;
    }
    var pos = this._pos;
    var contentType = this.readType();
    if (!this.hasVarIntBytes()) {
      this._pos = pos;
      return null;
    }
    var mutability = this.readVarUint1();
    return { contentType: contentType, mutability: mutability };
  }
  private readTagType(): ITagType {
    var attribute = this.readVarUint32();
    var typeIndex = this.readVarUint32();
    return {
      attribute: attribute,
      typeIndex: typeIndex,
    };
  }
  private readTypeEntryCommon(form) {
    switch (form) {
      case TypeKind.func:
        this.result = this.readFuncType();
        break;
      case TypeKind.subtype:
        this.result = this.readSubtype(false);
        break;
      case TypeKind.subtype_final:
        this.result = this.readSubtype(true);
        break;
      case TypeKind.struct:
        this.result = this.readStructType();
        break;
      case TypeKind.array:
        this.result = this.readArrayType();
        break;
      case TypeKind.i32:
      case TypeKind.i64:
      case TypeKind.f32:
      case TypeKind.f64:
      case TypeKind.v128:
      case TypeKind.i8:
      case TypeKind.i16:
      case TypeKind.funcref:
      case TypeKind.externref:
      case TypeKind.anyref:
      case TypeKind.eqref:
        this.result = {
          form,
        };
        break;
      default:
        throw new Error(`Unknown type kind: ${form}`);
    }
  }
  private readTypeEntry() {
    if (this._sectionEntriesLeft === 0) {
      this.skipSection();
      return this.read();
    }
    var form = this.readVarInt7();
    if (form == TypeKind.rec_group) {
      this.state = BinaryReaderState.BEGIN_REC_GROUP;
      this.result = null;
      this._recGroupTypesLeft = this.readVarUint32();
    } else {
      this.state = BinaryReaderState.TYPE_SECTION_ENTRY;
      this.readTypeEntryCommon(form);
      this._sectionEntriesLeft--;
    }
    return true;
  }
  private readRecGroupEntry() {
    if (this._recGroupTypesLeft === 0) {
      this.state = BinaryReaderState.END_REC_GROUP;
      this.result = null;
      this._sectionEntriesLeft--;
      this._recGroupTypesLeft = -1;
      return true;
    }
    this.state = BinaryReaderState.TYPE_SECTION_ENTRY;
    var form = this.readVarInt7();
    this.readTypeEntryCommon(form);
    this._recGroupTypesLeft--;
    return true;
  }
  private readImportEntry() {
    if (this._sectionEntriesLeft === 0) {
      this.skipSection();
      return this.read();
    }
    this.state = BinaryReaderState.IMPORT_SECTION_ENTRY;
    var module = this.readStringBytes();
    var field = this.readStringBytes();
    var kind = this.readUint8();
    var funcTypeIndex: number;
    var type: ITableType | IMemoryType | IGlobalType | ITagType;
    switch (kind) {
      case ExternalKind.Function:
        funcTypeIndex = this.readVarUint32();
        break;
      case ExternalKind.Table:
        type = this.readTableType();
        break;
      case ExternalKind.Memory:
        type = this.readMemoryType();
        break;
      case ExternalKind.Global:
        type = this.readGlobalType();
        break;
      case ExternalKind.Tag:
        type = this.readTagType();
        break;
    }
    this.result = {
      module: module,
      field: field,
      kind: kind,
      funcTypeIndex: funcTypeIndex,
      type: type,
    };
    this._sectionEntriesLeft--;
    return true;
  }
  private readExportEntry(): boolean {
    if (this._sectionEntriesLeft === 0) {
      this.skipSection();
      return this.read();
    }
    var field = this.readStringBytes();
    var kind = this.readUint8();
    var index = this.readVarUint32();
    this.state = BinaryReaderState.EXPORT_SECTION_ENTRY;
    this.result = { field: field, kind: kind, index: index };
    this._sectionEntriesLeft--;
    return true;
  }
  private readFunctionEntry(): boolean {
    if (this._sectionEntriesLeft === 0) {
      this.skipSection();
      return this.read();
    }
    var typeIndex = this.readVarUint32();
    this.state = BinaryReaderState.FUNCTION_SECTION_ENTRY;
    this.result = { typeIndex: typeIndex };
    this._sectionEntriesLeft--;
    return true;
  }
  private readTableEntry(): boolean {
    if (this._sectionEntriesLeft === 0) {
      this.skipSection();
      return this.read();
    }
    this.state = BinaryReaderState.TABLE_SECTION_ENTRY;
    this.result = this.readTableType();
    this._sectionEntriesLeft--;
    return true;
  }
  private readMemoryEntry(): boolean {
    if (this._sectionEntriesLeft === 0) {
      this.skipSection();
      return this.read();
    }
    this.state = BinaryReaderState.MEMORY_SECTION_ENTRY;
    this.result = this.readMemoryType();
    this._sectionEntriesLeft--;
    return true;
  }
  private readTagEntry(): boolean {
    if (this._sectionEntriesLeft === 0) {
      this.skipSection();
      return this.read();
    }
    this.state = BinaryReaderState.TAG_SECTION_ENTRY;
    this.result = this.readTagType();
    this._sectionEntriesLeft--;
    return true;
  }
  private readGlobalEntry(): boolean {
    if (this._sectionEntriesLeft === 0) {
      this.skipSection();
      return this.read();
    }
    var globalType = this.readGlobalType();
    if (!globalType) {
      this.state = BinaryReaderState.GLOBAL_SECTION_ENTRY;
      return false;
    }
    this.state = BinaryReaderState.BEGIN_GLOBAL_SECTION_ENTRY;
    this.result = {
      type: globalType,
    };
    this._sectionEntriesLeft--;
    return true;
  }
  private readElementEntry(): boolean {
    if (this._sectionEntriesLeft === 0) {
      this.skipSection();
      return this.read();
    }
    const pos = this._pos;
    if (!this.hasMoreBytes()) {
      this.state = BinaryReaderState.ELEMENT_SECTION_ENTRY;
      return false;
    }
    const segmentType = this.readUint8();
    let mode, tableIndex;
    switch (segmentType) {
      case ElementSegmentType.LegacyActiveFuncrefExternval:
      case ElementSegmentType.LegacyActiveFuncrefElemexpr:
        mode = ElementMode.Active;
        tableIndex = 0;
        break;
      case ElementSegmentType.PassiveExternval:
      case ElementSegmentType.PassiveElemexpr:
        mode = ElementMode.Passive;
        break;
      case ElementSegmentType.ActiveExternval:
      case ElementSegmentType.ActiveElemexpr:
        mode = ElementMode.Active;
        if (!this.hasVarIntBytes()) {
          this.state = BinaryReaderState.ELEMENT_SECTION_ENTRY;
          this._pos = pos;
          return false;
        }
        tableIndex = this.readVarUint32();
        break;
      case ElementSegmentType.DeclaredExternval:
      case ElementSegmentType.DeclaredElemexpr:
        mode = ElementMode.Declarative;
        break;
      default:
        throw new Error(`Unsupported element segment type ${segmentType}`);
    }
    this.state = BinaryReaderState.BEGIN_ELEMENT_SECTION_ENTRY;
    this.result = { mode, tableIndex };
    this._sectionEntriesLeft--;
    this._segmentType = segmentType;
    return true;
  }
  private readElementEntryBody(): boolean {
    let elementType = Type.funcref;
    switch (this._segmentType) {
      case ElementSegmentType.PassiveExternval:
      case ElementSegmentType.ActiveExternval:
      case ElementSegmentType.DeclaredExternval:
        if (!this.hasMoreBytes()) return false;
        // We just skip the 0x00 byte, the `elemkind` byte
        // is reserved for future versions of WebAssembly.
        this.skipBytes(1);
        break;
      case ElementSegmentType.PassiveElemexpr:
      case ElementSegmentType.ActiveElemexpr:
      case ElementSegmentType.DeclaredElemexpr:
        if (!this.hasMoreBytes()) return false;
        elementType = this.readType();
        break;
      case ElementSegmentType.LegacyActiveFuncrefExternval:
      case ElementSegmentType.LegacyActiveFuncrefElemexpr:
        // The element type is implicitly `funcref`.
        break;
      default:
        throw new Error(
          `Unsupported element segment type ${this._segmentType}`
        );
    }
    this.state = BinaryReaderState.ELEMENT_SECTION_ENTRY_BODY;
    this.result = { elementType };
    return true;
  }
  private readDataEntry(): boolean {
    if (this._sectionEntriesLeft === 0) {
      this.skipSection();
      return this.read();
    }
    const pos = this._pos;
    if (!this.hasVarIntBytes()) {
      this.state = BinaryReaderState.DATA_SECTION_ENTRY;
      return false;
    }
    const segmentType = this.readVarUint32();
    let mode, memoryIndex;
    switch (segmentType) {
      case DataSegmentType.Active:
        mode = DataMode.Active;
        memoryIndex = 0;
        break;
      case DataSegmentType.Passive:
        mode = DataMode.Passive;
        break;
      case DataSegmentType.ActiveWithMemoryIndex:
        mode = DataMode.Active;
        if (!this.hasVarIntBytes()) {
          this._pos = pos;
          this.state = BinaryReaderState.DATA_SECTION_ENTRY;
          return false;
        }
        memoryIndex = this.readVarUint32();
        break;
      default:
        throw new Error(`Unsupported data segment type ${segmentType}`);
    }
    this.state = BinaryReaderState.BEGIN_DATA_SECTION_ENTRY;
    this.result = { mode, memoryIndex };
    this._sectionEntriesLeft--;
    this._segmentType = segmentType;
    return true;
  }
  private readDataCountEntry(): boolean {
    if (this._sectionEntriesLeft === 0) {
      this.skipSection();
      return this.read();
    }
    this.state = BinaryReaderState.DATA_COUNT_SECTION_ENTRY;
    this.result = this.readVarUint32();
    this._sectionEntriesLeft--;
    return true;
  }
  private readDataEntryBody(): boolean {
    if (!this.hasStringBytes()) {
      return false;
    }
    this.state = BinaryReaderState.DATA_SECTION_ENTRY_BODY;
    this.result = {
      data: this.readStringBytes(),
    };
    return true;
  }
  private readInitExpressionBody(): boolean {
    this.state = BinaryReaderState.BEGIN_INIT_EXPRESSION_BODY;
    this.result = null;
    return true;
  }
  private readOffsetExpressionBody(): boolean {
    this.state = BinaryReaderState.BEGIN_OFFSET_EXPRESSION_BODY;
    this.result = null;
    return true;
  }
  private readMemoryImmediate(): IMemoryAddress {
    var flags = this.readVarUint32();
    var offset = this.readVarUint32();
    return { flags: flags, offset: offset };
  }
  private readNameMap(): INaming[] {
    var count = this.readVarUint32();
    var result: INaming[] = [];
    for (var i = 0; i < count; i++) {
      var index = this.readVarUint32();
      var name = this.readStringBytes();
      result.push({ index: index, name: name });
    }
    return result;
  }
  private readNameEntry(): boolean {
    var pos = this._pos;
    if (pos >= this._sectionRange.end) {
      this.skipSection();
      return this.read();
    }
    if (!this.hasVarIntBytes()) return false;
    var type: NameType = this.readVarUint7();
    if (!this.hasVarIntBytes()) {
      this._pos = pos;
      return false;
    }
    var payloadLength = this.readVarUint32();
    if (!this.hasBytes(payloadLength)) {
      this._pos = pos;
      return false;
    }
    var result:
      | IModuleNameEntry
      | IFunctionNameEntry
      | ILocalNameEntry
      | ITagNameEntry
      | ITypeNameEntry
      | ITableNameEntry
      | IMemoryNameEntry
      | IGlobalNameEntry
      | IFieldNameEntry;
    switch (type) {
      case NameType.Module:
        result = {
          type,
          moduleName: this.readStringBytes(),
        };
        break;
      case NameType.Function:
      case NameType.Tag:
      case NameType.Type:
      case NameType.Table:
      case NameType.Memory:
      case NameType.Global:
        result = {
          type,
          names: this.readNameMap(),
        };
        break;
      case NameType.Local:
        var funcsLength = this.readVarUint32();
        var funcs: ILocalName[] = [];
        for (var i = 0; i < funcsLength; i++) {
          var funcIndex = this.readVarUint32();
          funcs.push({
            index: funcIndex,
            locals: this.readNameMap(),
          });
        }
        result = {
          type,
          funcs: funcs,
        };
        break;
      case NameType.Field:
        var typesLength = this.readVarUint32();
        var types: IFieldName[] = [];
        for (var i = 0; i < typesLength; i++) {
          var fieldIndex = this.readVarUint32();
          types.push({
            index: fieldIndex,
            fields: this.readNameMap(),
          });
        }
        result = {
          type,
          types: types,
        };
        break;
      default:
        // Skip this unknown name subsection (as per specification,
        // custom section errors shouldn't cause Wasm parsing to fail).
        this.skipBytes(payloadLength);
        return this.read();
    }
    this.state = BinaryReaderState.NAME_SECTION_ENTRY;
    this.result = result;
    return true;
  }
  private readRelocHeader(): boolean {
    // See https://github.com/WebAssembly/tool-conventions/blob/master/Linking.md
    if (!this.hasVarIntBytes()) {
      return false;
    }
    var pos = this._pos;
    var sectionId: SectionCode = this.readVarUint7();
    var sectionName;
    if (sectionId === SectionCode.Custom) {
      if (!this.hasStringBytes()) {
        this._pos = pos;
        return false;
      }
      sectionName = this.readStringBytes();
    }
    this.state = BinaryReaderState.RELOC_SECTION_HEADER;
    this.result = {
      id: sectionId,
      name: sectionName,
    };
    return true;
  }
  private readLinkingEntry(): boolean {
    if (this._sectionEntriesLeft === 0) {
      this.skipSection();
      return this.read();
    }
    if (!this.hasVarIntBytes()) return false;
    var pos = this._pos;
    var type: LinkingType = this.readVarUint32();
    var index;
    switch (type) {
      case LinkingType.StackPointer:
        if (!this.hasVarIntBytes()) {
          this._pos = pos;
          return false;
        }
        index = this.readVarUint32();
        break;
      default:
        this.error = new Error(`Bad linking type: ${type}`);
        this.state = BinaryReaderState.ERROR;
        return true;
    }
    this.state = BinaryReaderState.LINKING_SECTION_ENTRY;
    this.result = { type: type, index: index };
    this._sectionEntriesLeft--;
    return true;
  }
  private readSourceMappingURL(): boolean {
    if (!this.hasStringBytes()) return false;
    var url = this.readStringBytes();
    this.state = BinaryReaderState.SOURCE_MAPPING_URL;
    this.result = { url: url };
    return true;
  }
  private readRelocEntry(): boolean {
    if (this._sectionEntriesLeft === 0) {
      this.skipSection();
      return this.read();
    }
    if (!this.hasVarIntBytes()) return false;
    var pos = this._pos;
    var type: RelocType = this.readVarUint7();
    if (!this.hasVarIntBytes()) {
      this._pos = pos;
      return false;
    }
    var offset = this.readVarUint32();
    if (!this.hasVarIntBytes()) {
      this._pos = pos;
      return false;
    }
    var index = this.readVarUint32();
    var addend;
    switch (type) {
      case RelocType.FunctionIndex_LEB:
      case RelocType.TableIndex_SLEB:
      case RelocType.TableIndex_I32:
      case RelocType.TypeIndex_LEB:
      case RelocType.GlobalIndex_LEB:
        break;
      case RelocType.GlobalAddr_LEB:
      case RelocType.GlobalAddr_SLEB:
      case RelocType.GlobalAddr_I32:
        if (!this.hasVarIntBytes()) {
          this._pos = pos;
          return false;
        }
        addend = this.readVarUint32();
        break;
      default:
        this.error = new Error(`Bad relocation type: ${type}`);
        this.state = BinaryReaderState.ERROR;
        return true;
    }
    this.state = BinaryReaderState.RELOC_SECTION_ENTRY;
    this.result = {
      type: type,
      offset: offset,
      index: index,
      addend: addend,
    };
    this._sectionEntriesLeft--;
    return true;
  }

  private readCodeOperator_0xfb(): boolean {
    // The longest instructions have: 2 bytes opcode, 5 bytes type index,
    // 5 bytes field index.
    const MAX_CODE_OPERATOR_0XFB_SIZE = 12;
    if (!this._eof && !this.hasBytes(MAX_CODE_OPERATOR_0XFB_SIZE)) {
      return false;
    }
    var code, brDepth, refType, srcType, fieldIndex, segmentIndex, len, literal;

    code = this._data[this._pos++] | 0xfb00;
    switch (code) {
      case OperatorCode.br_on_cast:
      case OperatorCode.br_on_cast_fail:
        literal = this.readUint8();
        brDepth = this.readVarUint32();
        srcType = this.readHeapType();
        refType = this.readHeapType();
        break;
      case OperatorCode.array_get:
      case OperatorCode.array_get_s:
      case OperatorCode.array_get_u:
      case OperatorCode.array_set:
      case OperatorCode.array_new:
      case OperatorCode.array_new_default:
      case OperatorCode.struct_new:
      case OperatorCode.struct_new_default:
        refType = this.readVarUint32();
        break;
      case OperatorCode.array_new_fixed:
        refType = this.readVarUint32();
        len = this.readVarUint32();
        break;
      case OperatorCode.array_fill:
        refType = this.readVarUint32();
        break;
      case OperatorCode.array_copy:
        refType = this.readVarUint32();
        srcType = this.readVarUint32();
        break;
      case OperatorCode.struct_get:
      case OperatorCode.struct_get_s:
      case OperatorCode.struct_get_u:
      case OperatorCode.struct_set:
        refType = this.readVarUint32();
        fieldIndex = this.readVarUint32();
        break;
      case OperatorCode.array_new_data:
      case OperatorCode.array_new_elem:
      case OperatorCode.array_init_data:
      case OperatorCode.array_init_elem:
        refType = this.readVarUint32();
        segmentIndex = this.readVarUint32();
        break;
      case OperatorCode.ref_test:
      case OperatorCode.ref_test_null:
      case OperatorCode.ref_cast:
      case OperatorCode.ref_cast_null:
        refType = this.readHeapType();
        break;
      case OperatorCode.array_len:
      case OperatorCode.extern_externalize:
      case OperatorCode.extern_internalize:
      case OperatorCode.ref_i31:
      case OperatorCode.i31_get_s:
      case OperatorCode.i31_get_u:
        break;
      default:
        this.error = new Error(
          `Unknown operator: 0x${code.toString(16).padStart(4, "0")}`
        );
        this.state = BinaryReaderState.ERROR;
        return true;
    }
    this.result = {
      code,
      blockType: undefined,
      refType,
      srcType,
      brDepth,
      brTable: undefined,
      tableIndex: undefined,
      funcIndex: undefined,
      typeIndex: undefined,
      localIndex: undefined,
      globalIndex: undefined,
      fieldIndex,
      memoryAddress: undefined,
      literal,
      segmentIndex,
      destinationIndex: undefined,
      len,
      lines: undefined,
      lineIndex: undefined,
    };
    return true;
  }

  private readCodeOperator_0xfc(): boolean {
    if (!this.hasVarIntBytes()) {
      return false;
    }
    var code = this.readVarUint32() | 0xfc00;
    var reserved, segmentIndex, destinationIndex, tableIndex;
    switch (code) {
      case OperatorCode.i32_trunc_sat_f32_s:
      case OperatorCode.i32_trunc_sat_f32_u:
      case OperatorCode.i32_trunc_sat_f64_s:
      case OperatorCode.i32_trunc_sat_f64_u:
      case OperatorCode.i64_trunc_sat_f32_s:
      case OperatorCode.i64_trunc_sat_f32_u:
      case OperatorCode.i64_trunc_sat_f64_s:
      case OperatorCode.i64_trunc_sat_f64_u:
        break;
      case OperatorCode.memory_copy:
        // Currently memory index must be zero.
        reserved = this.readVarUint1();
        reserved = this.readVarUint1();
        break;
      case OperatorCode.memory_fill:
        reserved = this.readVarUint1();
        break;
      case OperatorCode.table_init:
        segmentIndex = this.readVarUint32();
        tableIndex = this.readVarUint32();
        break;
      case OperatorCode.table_copy:
        tableIndex = this.readVarUint32();
        destinationIndex = this.readVarUint32();
        break;
      case OperatorCode.table_grow:
      case OperatorCode.table_size:
      case OperatorCode.table_fill:
        tableIndex = this.readVarUint32();
        break;
      case OperatorCode.memory_init:
        segmentIndex = this.readVarUint32();
        reserved = this.readVarUint1();
        break;
      case OperatorCode.data_drop:
      case OperatorCode.elem_drop:
        segmentIndex = this.readVarUint32();
        break;
      default:
        this.error = new Error(
          `Unknown operator: 0x${code.toString(16).padStart(4, "0")}`
        );
        this.state = BinaryReaderState.ERROR;
        return true;
    }
    this.result = {
      code: code,
      blockType: undefined,
      selectType: undefined,
      refType: undefined,
      srcType: undefined,
      brDepth: undefined,
      brTable: undefined,
      funcIndex: undefined,
      typeIndex: undefined,
      tableIndex: tableIndex,
      localIndex: undefined,
      globalIndex: undefined,
      fieldIndex: undefined,
      memoryAddress: undefined,
      literal: undefined,
      segmentIndex: segmentIndex,
      destinationIndex: destinationIndex,
      len: undefined,
      lines: undefined,
      lineIndex: undefined,
    };
    return true;
  }

  private readCodeOperator_0xfd(): boolean {
    const MAX_CODE_OPERATOR_0XFD_SIZE = 17;
    var pos = this._pos;
    if (!this._eof && pos + MAX_CODE_OPERATOR_0XFD_SIZE > this._length) {
      return false;
    }
    if (!this.hasVarIntBytes()) {
      return false;
    }
    var code = this.readVarUint32() | 0xfd000;
    var memoryAddress;
    var literal;
    var lineIndex;
    var lines;
    switch (code) {
      case OperatorCode.v128_load:
      case OperatorCode.i16x8_load8x8_s:
      case OperatorCode.i16x8_load8x8_u:
      case OperatorCode.i32x4_load16x4_s:
      case OperatorCode.i32x4_load16x4_u:
      case OperatorCode.i64x2_load32x2_s:
      case OperatorCode.i64x2_load32x2_u:
      case OperatorCode.v8x16_load_splat:
      case OperatorCode.v16x8_load_splat:
      case OperatorCode.v32x4_load_splat:
      case OperatorCode.v64x2_load_splat:
      case OperatorCode.v128_store:
      case OperatorCode.v128_load32_zero:
      case OperatorCode.v128_load64_zero:
        memoryAddress = this.readMemoryImmediate();
        break;
      case OperatorCode.v128_const:
        literal = this.readBytes(16);
        break;
      case OperatorCode.i8x16_shuffle:
        lines = new Uint8Array(16);
        for (var i = 0; i < lines.length; i++) {
          lines[i] = this.readUint8();
        }
        break;
      case OperatorCode.i8x16_extract_lane_s:
      case OperatorCode.i8x16_extract_lane_u:
      case OperatorCode.i8x16_replace_lane:
      case OperatorCode.i16x8_extract_lane_s:
      case OperatorCode.i16x8_extract_lane_u:
      case OperatorCode.i16x8_replace_lane:
      case OperatorCode.i32x4_extract_lane:
      case OperatorCode.i32x4_replace_lane:
      case OperatorCode.i64x2_extract_lane:
      case OperatorCode.i64x2_replace_lane:
      case OperatorCode.f32x4_extract_lane:
      case OperatorCode.f32x4_replace_lane:
      case OperatorCode.f64x2_extract_lane:
      case OperatorCode.f64x2_replace_lane:
        lineIndex = this.readUint8();
        break;
      case OperatorCode.v128_load8_lane:
      case OperatorCode.v128_load16_lane:
      case OperatorCode.v128_load32_lane:
      case OperatorCode.v128_load64_lane:
      case OperatorCode.v128_store8_lane:
      case OperatorCode.v128_store16_lane:
      case OperatorCode.v128_store32_lane:
      case OperatorCode.v128_store64_lane:
        memoryAddress = this.readMemoryImmediate();
        lineIndex = this.readUint8();
        break;
      case OperatorCode.i8x16_swizzle:
      case OperatorCode.i8x16_splat:
      case OperatorCode.i16x8_splat:
      case OperatorCode.i32x4_splat:
      case OperatorCode.i64x2_splat:
      case OperatorCode.f32x4_splat:
      case OperatorCode.f64x2_splat:
      case OperatorCode.i8x16_eq:
      case OperatorCode.i8x16_ne:
      case OperatorCode.i8x16_lt_s:
      case OperatorCode.i8x16_lt_u:
      case OperatorCode.i8x16_gt_s:
      case OperatorCode.i8x16_gt_u:
      case OperatorCode.i8x16_le_s:
      case OperatorCode.i8x16_le_u:
      case OperatorCode.i8x16_ge_s:
      case OperatorCode.i8x16_ge_u:
      case OperatorCode.i16x8_eq:
      case OperatorCode.i16x8_ne:
      case OperatorCode.i16x8_lt_s:
      case OperatorCode.i16x8_lt_u:
      case OperatorCode.i16x8_gt_s:
      case OperatorCode.i16x8_gt_u:
      case OperatorCode.i16x8_le_s:
      case OperatorCode.i16x8_le_u:
      case OperatorCode.i16x8_ge_s:
      case OperatorCode.i16x8_ge_u:
      case OperatorCode.i32x4_eq:
      case OperatorCode.i32x4_ne:
      case OperatorCode.i32x4_lt_s:
      case OperatorCode.i32x4_lt_u:
      case OperatorCode.i32x4_gt_s:
      case OperatorCode.i32x4_gt_u:
      case OperatorCode.i32x4_le_s:
      case OperatorCode.i32x4_le_u:
      case OperatorCode.i32x4_ge_s:
      case OperatorCode.i32x4_ge_u:
      case OperatorCode.f32x4_eq:
      case OperatorCode.f32x4_ne:
      case OperatorCode.f32x4_lt:
      case OperatorCode.f32x4_gt:
      case OperatorCode.f32x4_le:
      case OperatorCode.f32x4_ge:
      case OperatorCode.f64x2_eq:
      case OperatorCode.f64x2_ne:
      case OperatorCode.f64x2_lt:
      case OperatorCode.f64x2_gt:
      case OperatorCode.f64x2_le:
      case OperatorCode.f64x2_ge:
      case OperatorCode.v128_not:
      case OperatorCode.v128_and:
      case OperatorCode.v128_andnot:
      case OperatorCode.v128_or:
      case OperatorCode.v128_xor:
      case OperatorCode.v128_bitselect:
      case OperatorCode.v128_any_true:
      case OperatorCode.f32x4_demote_f64x2_zero:
      case OperatorCode.f64x2_promote_low_f32x4:
      case OperatorCode.i8x16_abs:
      case OperatorCode.i8x16_neg:
      case OperatorCode.i8x16_popcnt:
      case OperatorCode.i8x16_all_true:
      case OperatorCode.i8x16_bitmask:
      case OperatorCode.i8x16_narrow_i16x8_s:
      case OperatorCode.i8x16_narrow_i16x8_u:
      case OperatorCode.f32x4_ceil:
      case OperatorCode.f32x4_floor:
      case OperatorCode.f32x4_trunc:
      case OperatorCode.f32x4_nearest:
      case OperatorCode.i8x16_shl:
      case OperatorCode.i8x16_shr_s:
      case OperatorCode.i8x16_shr_u:
      case OperatorCode.i8x16_add:
      case OperatorCode.i8x16_add_sat_s:
      case OperatorCode.i8x16_add_sat_u:
      case OperatorCode.i8x16_sub:
      case OperatorCode.i8x16_sub_sat_s:
      case OperatorCode.i8x16_sub_sat_u:
      case OperatorCode.f64x2_ceil:
      case OperatorCode.f64x2_floor:
      case OperatorCode.i8x16_min_s:
      case OperatorCode.i8x16_min_u:
      case OperatorCode.i8x16_max_s:
      case OperatorCode.i8x16_max_u:
      case OperatorCode.f64x2_trunc:
      case OperatorCode.i8x16_avgr_u:
      case OperatorCode.i16x8_extadd_pairwise_i8x16_s:
      case OperatorCode.i16x8_extadd_pairwise_i8x16_u:
      case OperatorCode.i32x4_extadd_pairwise_i16x8_s:
      case OperatorCode.i32x4_extadd_pairwise_i16x8_u:
      case OperatorCode.i16x8_abs:
      case OperatorCode.i16x8_neg:
      case OperatorCode.i16x8_q15mulr_sat_s:
      case OperatorCode.i16x8_all_true:
      case OperatorCode.i16x8_bitmask:
      case OperatorCode.i16x8_narrow_i32x4_s:
      case OperatorCode.i16x8_narrow_i32x4_u:
      case OperatorCode.i16x8_extend_low_i8x16_s:
      case OperatorCode.i16x8_extend_high_i8x16_s:
      case OperatorCode.i16x8_extend_low_i8x16_u:
      case OperatorCode.i16x8_extend_high_i8x16_u:
      case OperatorCode.i16x8_shl:
      case OperatorCode.i16x8_shr_s:
      case OperatorCode.i16x8_shr_u:
      case OperatorCode.i16x8_add:
      case OperatorCode.i16x8_add_sat_s:
      case OperatorCode.i16x8_add_sat_u:
      case OperatorCode.i16x8_sub:
      case OperatorCode.i16x8_sub_sat_s:
      case OperatorCode.i16x8_sub_sat_u:
      case OperatorCode.f64x2_nearest:
      case OperatorCode.i16x8_mul:
      case OperatorCode.i16x8_min_s:
      case OperatorCode.i16x8_min_u:
      case OperatorCode.i16x8_max_s:
      case OperatorCode.i16x8_max_u:
      case OperatorCode.i16x8_avgr_u:
      case OperatorCode.i16x8_extmul_low_i8x16_s:
      case OperatorCode.i16x8_extmul_high_i8x16_s:
      case OperatorCode.i16x8_extmul_low_i8x16_u:
      case OperatorCode.i16x8_extmul_high_i8x16_u:
      case OperatorCode.i32x4_abs:
      case OperatorCode.i32x4_neg:
      case OperatorCode.i32x4_all_true:
      case OperatorCode.i32x4_bitmask:
      case OperatorCode.i32x4_extend_low_i16x8_s:
      case OperatorCode.i32x4_extend_high_i16x8_s:
      case OperatorCode.i32x4_extend_low_i16x8_u:
      case OperatorCode.i32x4_extend_high_i16x8_u:
      case OperatorCode.i32x4_shl:
      case OperatorCode.i32x4_shr_s:
      case OperatorCode.i32x4_shr_u:
      case OperatorCode.i32x4_add:
      case OperatorCode.i32x4_sub:
      case OperatorCode.i32x4_mul:
      case OperatorCode.i32x4_min_s:
      case OperatorCode.i32x4_min_u:
      case OperatorCode.i32x4_max_s:
      case OperatorCode.i32x4_max_u:
      case OperatorCode.i32x4_dot_i16x8_s:
      case OperatorCode.i32x4_extmul_low_i16x8_s:
      case OperatorCode.i32x4_extmul_high_i16x8_s:
      case OperatorCode.i32x4_extmul_low_i16x8_u:
      case OperatorCode.i32x4_extmul_high_i16x8_u:
      case OperatorCode.i64x2_abs:
      case OperatorCode.i64x2_neg:
      case OperatorCode.i64x2_all_true:
      case OperatorCode.i64x2_bitmask:
      case OperatorCode.i64x2_extend_low_i32x4_s:
      case OperatorCode.i64x2_extend_high_i32x4_s:
      case OperatorCode.i64x2_extend_low_i32x4_u:
      case OperatorCode.i64x2_extend_high_i32x4_u:
      case OperatorCode.i64x2_shl:
      case OperatorCode.i64x2_shr_s:
      case OperatorCode.i64x2_shr_u:
      case OperatorCode.i64x2_add:
      case OperatorCode.i64x2_sub:
      case OperatorCode.i64x2_mul:
      case OperatorCode.i64x2_eq:
      case OperatorCode.i64x2_ne:
      case OperatorCode.i64x2_lt_s:
      case OperatorCode.i64x2_gt_s:
      case OperatorCode.i64x2_le_s:
      case OperatorCode.i64x2_ge_s:
      case OperatorCode.i64x2_extmul_low_i32x4_s:
      case OperatorCode.i64x2_extmul_high_i32x4_s:
      case OperatorCode.i64x2_extmul_low_i32x4_u:
      case OperatorCode.i64x2_extmul_high_i32x4_u:
      case OperatorCode.f32x4_abs:
      case OperatorCode.f32x4_abs:
      case OperatorCode.f32x4_neg:
      case OperatorCode.f32x4_sqrt:
      case OperatorCode.f32x4_add:
      case OperatorCode.f32x4_sub:
      case OperatorCode.f32x4_mul:
      case OperatorCode.f32x4_div:
      case OperatorCode.f32x4_min:
      case OperatorCode.f32x4_max:
      case OperatorCode.f32x4_pmin:
      case OperatorCode.f32x4_pmax:
      case OperatorCode.f64x2_abs:
      case OperatorCode.f64x2_neg:
      case OperatorCode.f64x2_sqrt:
      case OperatorCode.f64x2_add:
      case OperatorCode.f64x2_sub:
      case OperatorCode.f64x2_mul:
      case OperatorCode.f64x2_div:
      case OperatorCode.f64x2_min:
      case OperatorCode.f64x2_max:
      case OperatorCode.f64x2_pmin:
      case OperatorCode.f64x2_pmax:
      case OperatorCode.i32x4_trunc_sat_f32x4_s:
      case OperatorCode.i32x4_trunc_sat_f32x4_u:
      case OperatorCode.f32x4_convert_i32x4_s:
      case OperatorCode.f32x4_convert_i32x4_u:
      case OperatorCode.i32x4_trunc_sat_f64x2_s_zero:
      case OperatorCode.i32x4_trunc_sat_f64x2_u_zero:
      case OperatorCode.f64x2_convert_low_i32x4_s:
      case OperatorCode.f64x2_convert_low_i32x4_u:
        break;
      case OperatorCode.i8x16_relaxed_swizzle:
      case OperatorCode.i32x4_relaxed_trunc_f32x4_s:
      case OperatorCode.i32x4_relaxed_trunc_f32x4_u:
      case OperatorCode.i32x4_relaxed_trunc_f64x2_s_zero:
      case OperatorCode.i32x4_relaxed_trunc_f64x2_u_zero:
      case OperatorCode.f32x4_relaxed_madd:
      case OperatorCode.f32x4_relaxed_nmadd:
      case OperatorCode.f64x2_relaxed_madd:
      case OperatorCode.f64x2_relaxed_nmadd:
      case OperatorCode.i8x16_relaxed_laneselect:
      case OperatorCode.i16x8_relaxed_laneselect:
      case OperatorCode.i32x4_relaxed_laneselect:
      case OperatorCode.i64x2_relaxed_laneselect:
      case OperatorCode.f32x4_relaxed_min:
      case OperatorCode.f32x4_relaxed_max:
      case OperatorCode.f64x2_relaxed_min:
      case OperatorCode.f64x2_relaxed_max:
      case OperatorCode.i16x8_relaxed_q15mulr_s:
      case OperatorCode.i16x8_dot_i8x16_i7x16_s:
      case OperatorCode.i32x4_dot_i8x16_i7x16_add_s:
        break;
      default:
        this.error = new Error(
          `Unknown operator: 0x${code.toString(16).padStart(4, "0")}`
        );
        this.state = BinaryReaderState.ERROR;
        return true;
    }
    this.result = {
      code: code,
      blockType: undefined,
      selectType: undefined,
      refType: undefined,
      srcType: undefined,
      brDepth: undefined,
      brTable: undefined,
      funcIndex: undefined,
      typeIndex: undefined,
      localIndex: undefined,
      globalIndex: undefined,
      fieldIndex: undefined,
      memoryAddress: memoryAddress,
      literal: literal,
      segmentIndex: undefined,
      destinationIndex: undefined,
      len: undefined,
      lines: lines,
      lineIndex: lineIndex,
    };
    return true;
  }

  private readCodeOperator_0xfe(): boolean {
    const MAX_CODE_OPERATOR_0XFE_SIZE = 11;
    var pos = this._pos;
    if (!this._eof && pos + MAX_CODE_OPERATOR_0XFE_SIZE > this._length) {
      return false;
    }
    if (!this.hasVarIntBytes()) {
      return false;
    }
    var code = this.readVarUint32() | 0xfe00;
    var memoryAddress;
    switch (code) {
      case OperatorCode.memory_atomic_notify:
      case OperatorCode.memory_atomic_wait32:
      case OperatorCode.memory_atomic_wait64:
      case OperatorCode.i32_atomic_load:
      case OperatorCode.i64_atomic_load:
      case OperatorCode.i32_atomic_load8_u:
      case OperatorCode.i32_atomic_load16_u:
      case OperatorCode.i64_atomic_load8_u:
      case OperatorCode.i64_atomic_load16_u:
      case OperatorCode.i64_atomic_load32_u:
      case OperatorCode.i32_atomic_store:
      case OperatorCode.i64_atomic_store:
      case OperatorCode.i32_atomic_store8:
      case OperatorCode.i32_atomic_store16:
      case OperatorCode.i64_atomic_store8:
      case OperatorCode.i64_atomic_store16:
      case OperatorCode.i64_atomic_store32:
      case OperatorCode.i32_atomic_rmw_add:
      case OperatorCode.i64_atomic_rmw_add:
      case OperatorCode.i32_atomic_rmw8_add_u:
      case OperatorCode.i32_atomic_rmw16_add_u:
      case OperatorCode.i64_atomic_rmw8_add_u:
      case OperatorCode.i64_atomic_rmw16_add_u:
      case OperatorCode.i64_atomic_rmw32_add_u:
      case OperatorCode.i32_atomic_rmw_sub:
      case OperatorCode.i64_atomic_rmw_sub:
      case OperatorCode.i32_atomic_rmw8_sub_u:
      case OperatorCode.i32_atomic_rmw16_sub_u:
      case OperatorCode.i64_atomic_rmw8_sub_u:
      case OperatorCode.i64_atomic_rmw16_sub_u:
      case OperatorCode.i64_atomic_rmw32_sub_u:
      case OperatorCode.i32_atomic_rmw_and:
      case OperatorCode.i64_atomic_rmw_and:
      case OperatorCode.i32_atomic_rmw8_and_u:
      case OperatorCode.i32_atomic_rmw16_and_u:
      case OperatorCode.i64_atomic_rmw8_and_u:
      case OperatorCode.i64_atomic_rmw16_and_u:
      case OperatorCode.i64_atomic_rmw32_and_u:
      case OperatorCode.i32_atomic_rmw_or:
      case OperatorCode.i64_atomic_rmw_or:
      case OperatorCode.i32_atomic_rmw8_or_u:
      case OperatorCode.i32_atomic_rmw16_or_u:
      case OperatorCode.i64_atomic_rmw8_or_u:
      case OperatorCode.i64_atomic_rmw16_or_u:
      case OperatorCode.i64_atomic_rmw32_or_u:
      case OperatorCode.i32_atomic_rmw_xor:
      case OperatorCode.i64_atomic_rmw_xor:
      case OperatorCode.i32_atomic_rmw8_xor_u:
      case OperatorCode.i32_atomic_rmw16_xor_u:
      case OperatorCode.i64_atomic_rmw8_xor_u:
      case OperatorCode.i64_atomic_rmw16_xor_u:
      case OperatorCode.i64_atomic_rmw32_xor_u:
      case OperatorCode.i32_atomic_rmw_xchg:
      case OperatorCode.i64_atomic_rmw_xchg:
      case OperatorCode.i32_atomic_rmw8_xchg_u:
      case OperatorCode.i32_atomic_rmw16_xchg_u:
      case OperatorCode.i64_atomic_rmw8_xchg_u:
      case OperatorCode.i64_atomic_rmw16_xchg_u:
      case OperatorCode.i64_atomic_rmw32_xchg_u:
      case OperatorCode.i32_atomic_rmw_cmpxchg:
      case OperatorCode.i64_atomic_rmw_cmpxchg:
      case OperatorCode.i32_atomic_rmw8_cmpxchg_u:
      case OperatorCode.i32_atomic_rmw16_cmpxchg_u:
      case OperatorCode.i64_atomic_rmw8_cmpxchg_u:
      case OperatorCode.i64_atomic_rmw16_cmpxchg_u:
      case OperatorCode.i64_atomic_rmw32_cmpxchg_u:
        memoryAddress = this.readMemoryImmediate();
        break;
      case OperatorCode.atomic_fence: {
        var consistency_model = this.readUint8();
        if (consistency_model != 0) {
          this.error = new Error("atomic.fence consistency model must be 0");
          this.state = BinaryReaderState.ERROR;
          return true;
        }
        break;
      }
      default:
        this.error = new Error(
          `Unknown operator: 0x${code.toString(16).padStart(4, "0")}`
        );
        this.state = BinaryReaderState.ERROR;
        return true;
    }
    this.result = {
      code: code,
      blockType: undefined,
      selectType: undefined,
      refType: undefined,
      srcType: undefined,
      brDepth: undefined,
      brTable: undefined,
      funcIndex: undefined,
      typeIndex: undefined,
      localIndex: undefined,
      globalIndex: undefined,
      fieldIndex: undefined,
      memoryAddress: memoryAddress,
      literal: undefined,
      segmentIndex: undefined,
      destinationIndex: undefined,
      len: undefined,
      lines: undefined,
      lineIndex: undefined,
    };
    return true;
  }

  private readCodeOperator(): boolean {
    switch (this.state) {
      case BinaryReaderState.CODE_OPERATOR:
        if (this._pos >= this._functionRange.end) {
          this.skipFunctionBody();
          return this.read();
        }
        break;
      case BinaryReaderState.INIT_EXPRESSION_OPERATOR:
        if (
          this.result &&
          (<IOperatorInformation>this.result).code === OperatorCode.end
        ) {
          this.state = BinaryReaderState.END_INIT_EXPRESSION_BODY;
          this.result = null;
          return true;
        }
        break;
      case BinaryReaderState.OFFSET_EXPRESSION_OPERATOR:
        if (
          this.result &&
          (<IOperatorInformation>this.result).code === OperatorCode.end
        ) {
          this.state = BinaryReaderState.END_OFFSET_EXPRESSION_BODY;
          this.result = null;
          return true;
        }
        break;
    }
    var code,
      blockType,
      selectType,
      refType,
      brDepth,
      brTable,
      relativeDepth,
      funcIndex,
      typeIndex,
      tableIndex,
      localIndex,
      globalIndex,
      tagIndex,
      memoryAddress,
      literal,
      reserved;
    if (
      this.state === BinaryReaderState.INIT_EXPRESSION_OPERATOR &&
      this._sectionId === SectionCode.Element &&
      isExternvalElementSegmentType(this._segmentType)
    ) {
      // We are reading a `vec(funcidx)` here, which is a dense encoding
      // for a sequence of `((ref.func y) end)` instructions.
      if (
        this.result &&
        (<IOperatorInformation>this.result).code === OperatorCode.ref_func
      ) {
        code = OperatorCode.end;
      } else {
        if (!this.hasVarIntBytes()) return false;
        code = OperatorCode.ref_func;
        funcIndex = this.readVarUint32();
      }
    } else {
      const MAX_CODE_OPERATOR_SIZE = 11; // i64.const or load/store
      var pos = this._pos;
      if (!this._eof && pos + MAX_CODE_OPERATOR_SIZE > this._length) {
        return false;
      }
      code = this._data[this._pos++];
      switch (code) {
        case OperatorCode.block:
        case OperatorCode.loop:
        case OperatorCode.if:
        case OperatorCode.try:
          blockType = this.readType();
          break;
        case OperatorCode.br:
        case OperatorCode.br_if:
        case OperatorCode.br_on_null:
        case OperatorCode.br_on_non_null:
          brDepth = this.readVarUint32();
          break;
        case OperatorCode.br_table:
          var tableCount = this.readVarUint32();
          if (!this.hasBytes(tableCount + 1)) {
            // We need at least (tableCount + 1) bytes
            this._pos = pos;
            return false;
          }
          brTable = [];
          for (var i = 0; i <= tableCount; i++) {
            // including default
            if (!this.hasVarIntBytes()) {
              this._pos = pos;
              return false;
            }
            brTable.push(this.readVarUint32());
          }
          break;
        case OperatorCode.rethrow:
        case OperatorCode.delegate:
          relativeDepth = this.readVarUint32();
          break;
        case OperatorCode.catch:
        case OperatorCode.throw:
          tagIndex = this.readVarInt32();
          break;
        case OperatorCode.ref_null:
          refType = this.readHeapType();
          break;
        case OperatorCode.call:
        case OperatorCode.return_call:
        case OperatorCode.ref_func:
          funcIndex = this.readVarUint32();
          break;
        case OperatorCode.call_indirect:
        case OperatorCode.return_call_indirect:
          typeIndex = this.readVarUint32();
          reserved = this.readVarUint1();
          break;
        case OperatorCode.local_get:
        case OperatorCode.local_set:
        case OperatorCode.local_tee:
          localIndex = this.readVarUint32();
          break;
        case OperatorCode.global_get:
        case OperatorCode.global_set:
          globalIndex = this.readVarUint32();
          break;
        case OperatorCode.table_get:
        case OperatorCode.table_set:
          tableIndex = this.readVarUint32();
          break;
        case OperatorCode.call_ref:
        case OperatorCode.return_call_ref:
          typeIndex = this.readHeapType();
          break;
        case OperatorCode.i32_load:
        case OperatorCode.i64_load:
        case OperatorCode.f32_load:
        case OperatorCode.f64_load:
        case OperatorCode.i32_load8_s:
        case OperatorCode.i32_load8_u:
        case OperatorCode.i32_load16_s:
        case OperatorCode.i32_load16_u:
        case OperatorCode.i64_load8_s:
        case OperatorCode.i64_load8_u:
        case OperatorCode.i64_load16_s:
        case OperatorCode.i64_load16_u:
        case OperatorCode.i64_load32_s:
        case OperatorCode.i64_load32_u:
        case OperatorCode.i32_store:
        case OperatorCode.i64_store:
        case OperatorCode.f32_store:
        case OperatorCode.f64_store:
        case OperatorCode.i32_store8:
        case OperatorCode.i32_store16:
        case OperatorCode.i64_store8:
        case OperatorCode.i64_store16:
        case OperatorCode.i64_store32:
          memoryAddress = this.readMemoryImmediate();
          break;
        case OperatorCode.memory_size:
        case OperatorCode.memory_grow:
          reserved = this.readVarUint1();
          break;
        case OperatorCode.i32_const:
          literal = this.readVarInt32();
          break;
        case OperatorCode.i64_const:
          literal = this.readVarInt64();
          break;
        case OperatorCode.f32_const:
          literal = new DataView(
            this._data.buffer,
            this._data.byteOffset
          ).getFloat32(this._pos, true);
          this._pos += 4;
          break;
        case OperatorCode.f64_const:
          literal = new DataView(
            this._data.buffer,
            this._data.byteOffset
          ).getFloat64(this._pos, true);
          this._pos += 8;
          break;
        case OperatorCode.select_with_type:
          const num_types = this.readVarInt32();
          // Only 1 is a valid value currently.
          if (num_types == 1) {
            selectType = this.readType();
          }
          break;
        case OperatorCode.prefix_0xfb:
          if (this.readCodeOperator_0xfb()) {
            return true;
          }
          this._pos = pos;
          return false;
        case OperatorCode.prefix_0xfc:
          if (this.readCodeOperator_0xfc()) {
            return true;
          }
          this._pos = pos;
          return false;
        case OperatorCode.prefix_0xfd:
          if (this.readCodeOperator_0xfd()) {
            return true;
          }
          this._pos = pos;
          return false;
        case OperatorCode.prefix_0xfe:
          if (this.readCodeOperator_0xfe()) {
            return true;
          }
          this._pos = pos;
          return false;
        case OperatorCode.unreachable:
        case OperatorCode.nop:
        case OperatorCode.else:
        case OperatorCode.unwind:
        case OperatorCode.end:
        case OperatorCode.return:
        case OperatorCode.catch_all:
        case OperatorCode.drop:
        case OperatorCode.select:
        case OperatorCode.i32_eqz:
        case OperatorCode.i32_eq:
        case OperatorCode.i32_ne:
        case OperatorCode.i32_lt_s:
        case OperatorCode.i32_lt_u:
        case OperatorCode.i32_gt_s:
        case OperatorCode.i32_gt_u:
        case OperatorCode.i32_le_s:
        case OperatorCode.i32_le_u:
        case OperatorCode.i32_ge_s:
        case OperatorCode.i32_ge_u:
        case OperatorCode.i64_eqz:
        case OperatorCode.i64_eq:
        case OperatorCode.i64_ne:
        case OperatorCode.i64_lt_s:
        case OperatorCode.i64_lt_u:
        case OperatorCode.i64_gt_s:
        case OperatorCode.i64_gt_u:
        case OperatorCode.i64_le_s:
        case OperatorCode.i64_le_u:
        case OperatorCode.i64_ge_s:
        case OperatorCode.i64_ge_u:
        case OperatorCode.f32_eq:
        case OperatorCode.f32_ne:
        case OperatorCode.f32_lt:
        case OperatorCode.f32_gt:
        case OperatorCode.f32_le:
        case OperatorCode.f32_ge:
        case OperatorCode.f64_eq:
        case OperatorCode.f64_ne:
        case OperatorCode.f64_lt:
        case OperatorCode.f64_gt:
        case OperatorCode.f64_le:
        case OperatorCode.f64_ge:
        case OperatorCode.i32_clz:
        case OperatorCode.i32_ctz:
        case OperatorCode.i32_popcnt:
        case OperatorCode.i32_add:
        case OperatorCode.i32_sub:
        case OperatorCode.i32_mul:
        case OperatorCode.i32_div_s:
        case OperatorCode.i32_div_u:
        case OperatorCode.i32_rem_s:
        case OperatorCode.i32_rem_u:
        case OperatorCode.i32_and:
        case OperatorCode.i32_or:
        case OperatorCode.i32_xor:
        case OperatorCode.i32_shl:
        case OperatorCode.i32_shr_s:
        case OperatorCode.i32_shr_u:
        case OperatorCode.i32_rotl:
        case OperatorCode.i32_rotr:
        case OperatorCode.i64_clz:
        case OperatorCode.i64_ctz:
        case OperatorCode.i64_popcnt:
        case OperatorCode.i64_add:
        case OperatorCode.i64_sub:
        case OperatorCode.i64_mul:
        case OperatorCode.i64_div_s:
        case OperatorCode.i64_div_u:
        case OperatorCode.i64_rem_s:
        case OperatorCode.i64_rem_u:
        case OperatorCode.i64_and:
        case OperatorCode.i64_or:
        case OperatorCode.i64_xor:
        case OperatorCode.i64_shl:
        case OperatorCode.i64_shr_s:
        case OperatorCode.i64_shr_u:
        case OperatorCode.i64_rotl:
        case OperatorCode.i64_rotr:
        case OperatorCode.f32_abs:
        case OperatorCode.f32_neg:
        case OperatorCode.f32_ceil:
        case OperatorCode.f32_floor:
        case OperatorCode.f32_trunc:
        case OperatorCode.f32_nearest:
        case OperatorCode.f32_sqrt:
        case OperatorCode.f32_add:
        case OperatorCode.f32_sub:
        case OperatorCode.f32_mul:
        case OperatorCode.f32_div:
        case OperatorCode.f32_min:
        case OperatorCode.f32_max:
        case OperatorCode.f32_copysign:
        case OperatorCode.f64_abs:
        case OperatorCode.f64_neg:
        case OperatorCode.f64_ceil:
        case OperatorCode.f64_floor:
        case OperatorCode.f64_trunc:
        case OperatorCode.f64_nearest:
        case OperatorCode.f64_sqrt:
        case OperatorCode.f64_add:
        case OperatorCode.f64_sub:
        case OperatorCode.f64_mul:
        case OperatorCode.f64_div:
        case OperatorCode.f64_min:
        case OperatorCode.f64_max:
        case OperatorCode.f64_copysign:
        case OperatorCode.i32_wrap_i64:
        case OperatorCode.i32_trunc_f32_s:
        case OperatorCode.i32_trunc_f32_u:
        case OperatorCode.i32_trunc_f64_s:
        case OperatorCode.i32_trunc_f64_u:
        case OperatorCode.i64_extend_i32_s:
        case OperatorCode.i64_extend_i32_u:
        case OperatorCode.i64_trunc_f32_s:
        case OperatorCode.i64_trunc_f32_u:
        case OperatorCode.i64_trunc_f64_s:
        case OperatorCode.i64_trunc_f64_u:
        case OperatorCode.f32_convert_i32_s:
        case OperatorCode.f32_convert_i32_u:
        case OperatorCode.f32_convert_i64_s:
        case OperatorCode.f32_convert_i64_u:
        case OperatorCode.f32_demote_f64:
        case OperatorCode.f64_convert_i32_s:
        case OperatorCode.f64_convert_i32_u:
        case OperatorCode.f64_convert_i64_s:
        case OperatorCode.f64_convert_i64_u:
        case OperatorCode.f64_promote_f32:
        case OperatorCode.i32_reinterpret_f32:
        case OperatorCode.i64_reinterpret_f64:
        case OperatorCode.f32_reinterpret_i32:
        case OperatorCode.f64_reinterpret_i64:
        case OperatorCode.i32_extend8_s:
        case OperatorCode.i32_extend16_s:
        case OperatorCode.i64_extend8_s:
        case OperatorCode.i64_extend16_s:
        case OperatorCode.i64_extend32_s:
        case OperatorCode.ref_is_null:
        case OperatorCode.ref_as_non_null:
        case OperatorCode.ref_eq:
          break;
        default:
          this.error = new Error(`Unknown operator: ${code}`);
          this.state = BinaryReaderState.ERROR;
          return true;
      }
    }
    this.result = {
      code,
      blockType,
      selectType,
      refType,
      srcType: undefined,
      brDepth,
      brTable,
      relativeDepth,
      tableIndex,
      funcIndex,
      typeIndex,
      localIndex,
      globalIndex,
      fieldIndex: undefined,
      tagIndex,
      memoryAddress,
      literal,
      segmentIndex: undefined,
      destinationIndex: undefined,
      len: undefined,
      lines: undefined,
      lineIndex: undefined,
    };
    return true;
  }
  private readFunctionBody(): boolean {
    if (this._sectionEntriesLeft === 0) {
      this.skipSection();
      return this.read();
    }
    if (!this.hasVarIntBytes()) return false;
    var pos = this._pos;
    var size = this.readVarUint32();
    var bodyEnd = this._pos + size;
    if (!this.hasVarIntBytes()) {
      this._pos = pos;
      return false;
    }
    var localCount = this.readVarUint32();
    var locals: Array<ILocals> = [];
    for (var i = 0; i < localCount; i++) {
      if (!this.hasVarIntBytes()) {
        this._pos = pos;
        return false;
      }
      var count = this.readVarUint32();
      if (!this.hasVarIntBytes()) {
        this._pos = pos;
        return false;
      }
      var type = this.readType();
      locals.push({ count: count, type: type });
    }
    var bodyStart = this._pos;
    this.state = BinaryReaderState.BEGIN_FUNCTION_BODY;
    this.result = {
      locals: locals,
    };
    this._functionRange = new DataRange(bodyStart, bodyEnd);
    this._sectionEntriesLeft--;
    return true;
  }
  private readSectionHeader(): boolean {
    if (this._pos >= this._length && this._eof) {
      this._sectionId = SectionCode.Unknown;
      this._sectionRange = null;
      this.result = null;
      this.state = BinaryReaderState.END_WASM;
      return true;
    }
    // TODO: Handle _eof.
    if (this._pos < this._length - 4) {
      var magicNumber = this.peekInt32();
      if (magicNumber === WASM_MAGIC_NUMBER) {
        this._sectionId = SectionCode.Unknown;
        this._sectionRange = null;
        this.result = null;
        this.state = BinaryReaderState.END_WASM;
        return true;
      }
    }
    if (!this.hasVarIntBytes()) return false;
    var sectionStart = this._pos;
    var id = this.readVarUint7();
    if (!this.hasVarIntBytes()) {
      this._pos = sectionStart;
      return false;
    }
    var payloadLength = this.readVarUint32();
    var name = null;
    var payloadEnd = this._pos + payloadLength;
    if (id == 0) {
      if (!this.hasStringBytes()) {
        this._pos = sectionStart;
        return false;
      }
      name = this.readStringBytes();
    }
    this.result = { id: id, name: name };
    this._sectionId = id;
    this._sectionRange = new DataRange(this._pos, payloadEnd);
    this.state = BinaryReaderState.BEGIN_SECTION;
    return true;
  }
  private readSectionRawData(): boolean {
    var payloadLength = this._sectionRange.end - this._sectionRange.start;
    if (!this.hasBytes(payloadLength)) {
      return false;
    }
    this.state = BinaryReaderState.SECTION_RAW_DATA;
    this.result = this.readBytes(payloadLength);
    return true;
  }
  private readSectionBody(): boolean {
    if (this._pos >= this._sectionRange.end) {
      this.result = null;
      this.state = BinaryReaderState.END_SECTION;
      this._sectionId = SectionCode.Unknown;
      this._sectionRange = null;
      return true;
    }
    var currentSection = <ISectionInformation>this.result;
    switch (currentSection.id) {
      case SectionCode.Type:
        if (!this.hasSectionPayload()) return false;
        this._sectionEntriesLeft = this.readVarUint32();
        this._recGroupTypesLeft = -1;
        return this.readTypeEntry();
      case SectionCode.Import:
        if (!this.hasSectionPayload()) return false;
        this._sectionEntriesLeft = this.readVarUint32();
        return this.readImportEntry();
      case SectionCode.Export:
        if (!this.hasSectionPayload()) return false;
        this._sectionEntriesLeft = this.readVarUint32();
        return this.readExportEntry();
      case SectionCode.Function:
        if (!this.hasSectionPayload()) return false;
        this._sectionEntriesLeft = this.readVarUint32();
        return this.readFunctionEntry();
      case SectionCode.Table:
        if (!this.hasSectionPayload()) return false;
        this._sectionEntriesLeft = this.readVarUint32();
        return this.readTableEntry();
      case SectionCode.Memory:
        if (!this.hasSectionPayload()) return false;
        this._sectionEntriesLeft = this.readVarUint32();
        return this.readMemoryEntry();
      case SectionCode.Global:
        if (!this.hasVarIntBytes()) return false;
        this._sectionEntriesLeft = this.readVarUint32();
        return this.readGlobalEntry();
      case SectionCode.Start:
        if (!this.hasVarIntBytes()) return false;
        this.state = BinaryReaderState.START_SECTION_ENTRY;
        this.result = { index: this.readVarUint32() };
        return true;
      case SectionCode.Code:
        if (!this.hasVarIntBytes()) return false;
        this._sectionEntriesLeft = this.readVarUint32();
        this.state = BinaryReaderState.READING_FUNCTION_HEADER;
        return this.readFunctionBody();
      case SectionCode.Element:
        if (!this.hasVarIntBytes()) return false;
        this._sectionEntriesLeft = this.readVarUint32();
        return this.readElementEntry();
      case SectionCode.Data:
        if (!this.hasVarIntBytes()) return false;
        this._sectionEntriesLeft = this.readVarUint32();
        return this.readDataEntry();
      case SectionCode.DataCount:
        if (!this.hasVarIntBytes()) return false;
        this._sectionEntriesLeft = this.readVarUint32();
        return this.readDataCountEntry();
      case SectionCode.Tag:
        if (!this.hasVarIntBytes()) return false;
        this._sectionEntriesLeft = this.readVarUint32();
        return this.readTagEntry();
      case SectionCode.Custom:
        var customSectionName = bytesToString(currentSection.name);
        if (customSectionName === "name") {
          return this.readNameEntry();
        }
        if (customSectionName.indexOf("reloc.") === 0) {
          return this.readRelocHeader();
        }
        if (customSectionName === "linking") {
          if (!this.hasVarIntBytes()) return false;
          this._sectionEntriesLeft = this.readVarUint32();
          return this.readLinkingEntry();
        }
        if (customSectionName === "sourceMappingURL") {
          return this.readSourceMappingURL();
        }
        return this.readSectionRawData();
      default:
        this.error = new Error(`Unsupported section: ${this._sectionId}`);
        this.state = BinaryReaderState.ERROR;
        return true;
    }
  }
  public read(): boolean {
    switch (this.state) {
      case BinaryReaderState.INITIAL:
        if (!this.hasBytes(8)) return false;
        var magicNumber = this.readUint32();
        if (magicNumber != WASM_MAGIC_NUMBER) {
          this.error = new Error("Bad magic number");
          this.state = BinaryReaderState.ERROR;
          return true;
        }
        var version = this.readUint32();
        if (
          version != WASM_SUPPORTED_VERSION &&
          version != WASM_SUPPORTED_EXPERIMENTAL_VERSION
        ) {
          this.error = new Error(`Bad version number ${version}`);
          this.state = BinaryReaderState.ERROR;
          return true;
        }
        this.result = { magicNumber: magicNumber, version: version };
        this.state = BinaryReaderState.BEGIN_WASM;
        return true;
      case BinaryReaderState.END_WASM:
        this.result = null;
        this.state = BinaryReaderState.BEGIN_WASM;
        if (this.hasMoreBytes()) {
          this.state = BinaryReaderState.INITIAL;
          return this.read();
        }
        return false;
      case BinaryReaderState.ERROR:
        return true;
      case BinaryReaderState.BEGIN_WASM:
      case BinaryReaderState.END_SECTION:
        return this.readSectionHeader();
      case BinaryReaderState.BEGIN_SECTION:
        return this.readSectionBody();
      case BinaryReaderState.SKIPPING_SECTION:
        if (!this.hasSectionPayload()) {
          return false;
        }
        this.state = BinaryReaderState.END_SECTION;
        this._pos = this._sectionRange.end;
        this._sectionId = SectionCode.Unknown;
        this._sectionRange = null;
        this.result = null;
        return true;
      case BinaryReaderState.SKIPPING_FUNCTION_BODY:
        this.state = BinaryReaderState.END_FUNCTION_BODY;
        this._pos = this._functionRange.end;
        this._functionRange = null;
        this.result = null;
        return true;
      case BinaryReaderState.TYPE_SECTION_ENTRY:
        if (this._recGroupTypesLeft >= 0) {
          return this.readRecGroupEntry();
        }
        return this.readTypeEntry();
      case BinaryReaderState.BEGIN_REC_GROUP:
        return this.readRecGroupEntry();
      case BinaryReaderState.END_REC_GROUP:
        return this.readTypeEntry();
      case BinaryReaderState.IMPORT_SECTION_ENTRY:
        return this.readImportEntry();
      case BinaryReaderState.EXPORT_SECTION_ENTRY:
        return this.readExportEntry();
      case BinaryReaderState.FUNCTION_SECTION_ENTRY:
        return this.readFunctionEntry();
      case BinaryReaderState.TABLE_SECTION_ENTRY:
        return this.readTableEntry();
      case BinaryReaderState.MEMORY_SECTION_ENTRY:
        return this.readMemoryEntry();
      case BinaryReaderState.TAG_SECTION_ENTRY:
        return this.readTagEntry();
      case BinaryReaderState.GLOBAL_SECTION_ENTRY:
      case BinaryReaderState.END_GLOBAL_SECTION_ENTRY:
        return this.readGlobalEntry();
      case BinaryReaderState.BEGIN_GLOBAL_SECTION_ENTRY:
        return this.readInitExpressionBody();
      case BinaryReaderState.ELEMENT_SECTION_ENTRY:
      case BinaryReaderState.END_ELEMENT_SECTION_ENTRY:
        return this.readElementEntry();
      case BinaryReaderState.BEGIN_ELEMENT_SECTION_ENTRY:
        if (isActiveElementSegmentType(this._segmentType)) {
          return this.readOffsetExpressionBody();
        } else {
          // passive or declared element segment
          return this.readElementEntryBody();
        }
      case BinaryReaderState.ELEMENT_SECTION_ENTRY_BODY:
        if (!this.hasVarIntBytes()) return false;
        this._segmentEntriesLeft = this.readVarUint32();
        if (this._segmentEntriesLeft === 0) {
          this.state = BinaryReaderState.END_ELEMENT_SECTION_ENTRY;
          this.result = null;
          return true;
        }
        return this.readInitExpressionBody();
      case BinaryReaderState.DATA_COUNT_SECTION_ENTRY:
        return this.readDataCountEntry();
      case BinaryReaderState.DATA_SECTION_ENTRY:
      case BinaryReaderState.END_DATA_SECTION_ENTRY:
        return this.readDataEntry();
      case BinaryReaderState.BEGIN_DATA_SECTION_ENTRY:
        if (isActiveDataSegmentType(this._segmentType)) {
          return this.readOffsetExpressionBody();
        } else {
          // passive data segment
          return this.readDataEntryBody();
        }
      case BinaryReaderState.DATA_SECTION_ENTRY_BODY:
        this.state = BinaryReaderState.END_DATA_SECTION_ENTRY;
        this.result = null;
        return true;
      case BinaryReaderState.END_INIT_EXPRESSION_BODY:
        switch (this._sectionId) {
          case SectionCode.Global:
            this.state = BinaryReaderState.END_GLOBAL_SECTION_ENTRY;
            return true;
          case SectionCode.Element:
            if (--this._segmentEntriesLeft > 0) {
              return this.readInitExpressionBody();
            }
            this.state = BinaryReaderState.END_ELEMENT_SECTION_ENTRY;
            this.result = null;
            return true;
        }
        this.error = new Error(`Unexpected section type: ${this._sectionId}`);
        this.state = BinaryReaderState.ERROR;
        return true;
      case BinaryReaderState.END_OFFSET_EXPRESSION_BODY:
        if (this._sectionId === SectionCode.Data) {
          return this.readDataEntryBody();
        } else {
          return this.readElementEntryBody();
        }
      case BinaryReaderState.NAME_SECTION_ENTRY:
        return this.readNameEntry();
      case BinaryReaderState.RELOC_SECTION_HEADER:
        if (!this.hasVarIntBytes()) return false;
        this._sectionEntriesLeft = this.readVarUint32();
        return this.readRelocEntry();
      case BinaryReaderState.LINKING_SECTION_ENTRY:
        return this.readLinkingEntry();
      case BinaryReaderState.SOURCE_MAPPING_URL:
        this.state = BinaryReaderState.END_SECTION;
        this.result = null;
        return true;
      case BinaryReaderState.RELOC_SECTION_ENTRY:
        return this.readRelocEntry();
      case BinaryReaderState.READING_FUNCTION_HEADER:
      case BinaryReaderState.END_FUNCTION_BODY:
        return this.readFunctionBody();
      case BinaryReaderState.BEGIN_FUNCTION_BODY:
        this.state = BinaryReaderState.CODE_OPERATOR;
        return this.readCodeOperator();
      case BinaryReaderState.BEGIN_INIT_EXPRESSION_BODY:
        this.state = BinaryReaderState.INIT_EXPRESSION_OPERATOR;
        return this.readCodeOperator();
      case BinaryReaderState.BEGIN_OFFSET_EXPRESSION_BODY:
        this.state = BinaryReaderState.OFFSET_EXPRESSION_OPERATOR;
        return this.readCodeOperator();
      case BinaryReaderState.CODE_OPERATOR:
      case BinaryReaderState.INIT_EXPRESSION_OPERATOR:
      case BinaryReaderState.OFFSET_EXPRESSION_OPERATOR:
        return this.readCodeOperator();
      case BinaryReaderState.READING_SECTION_RAW_DATA:
        return this.readSectionRawData();
      case BinaryReaderState.START_SECTION_ENTRY:
      case BinaryReaderState.SECTION_RAW_DATA:
        this.state = BinaryReaderState.END_SECTION;
        this.result = null;
        return true;
      default:
        this.error = new Error(`Unsupported state: ${this.state}`);
        this.state = BinaryReaderState.ERROR;
        return true;
    }
  }
  public skipSection(): void {
    if (
      this.state === BinaryReaderState.ERROR ||
      this.state === BinaryReaderState.INITIAL ||
      this.state === BinaryReaderState.END_SECTION ||
      this.state === BinaryReaderState.BEGIN_WASM ||
      this.state === BinaryReaderState.END_WASM
    )
      return;
    this.state = BinaryReaderState.SKIPPING_SECTION;
  }
  public skipFunctionBody(): void {
    if (
      this.state !== BinaryReaderState.BEGIN_FUNCTION_BODY &&
      this.state !== BinaryReaderState.CODE_OPERATOR
    )
      return;
    this.state = BinaryReaderState.SKIPPING_FUNCTION_BODY;
  }
  public skipInitExpression(): void {
    while (this.state === BinaryReaderState.INIT_EXPRESSION_OPERATOR)
      this.readCodeOperator();
  }
  public fetchSectionRawData(): void {
    if (this.state !== BinaryReaderState.BEGIN_SECTION) {
      this.error = new Error(`Unsupported state: ${this.state}`);
      this.state = BinaryReaderState.ERROR;
      return;
    }
    this.state = BinaryReaderState.READING_SECTION_RAW_DATA;
  }
}

declare var escape: (string) => string;
declare class TextDecoder {
  public constructor(encoding: string);
  public decode(bytes: Uint8Array): string;
}

export var bytesToString: (bytes: Uint8Array) => string;
if (typeof TextDecoder !== "undefined") {
  try {
    bytesToString = (function () {
      var utf8Decoder = new TextDecoder("utf-8");
      utf8Decoder.decode(new Uint8Array([97, 208, 144]));
      return (b) => utf8Decoder.decode(b);
    })();
  } catch (_) {
    /* ignore */
  }
}
if (!bytesToString) {
  bytesToString = (b) => {
    var str = String.fromCharCode.apply(null, b);
    return decodeURIComponent(escape(str));
  };
}

export interface IBinaryReaderData {
  state: BinaryReaderState;
  result?: BinaryReaderResult;
}
