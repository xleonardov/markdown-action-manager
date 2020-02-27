import { Parent } from "unist";
import { RuleOption } from "./rschedule";
import { Repeat } from "./types";
export declare const getLeadingNumbers: (input: string) => number[];
export declare const isDay: (input: string) => input is "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
export declare const isMonth: (input: string) => input is "jan" | "feb" | "mar" | "apr" | "may" | "jun" | "jul" | "aug" | "sep" | "oct" | "nov" | "dec";
export declare const isUnit: (input: string) => input is "day" | "month" | "week";
export declare const isDayOfMonth: (input: number) => input is RuleOption.ByDayOfMonth;
export declare const dayInputToDayOfWeek: (input: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun") => RuleOption.ByDayOfWeek;
export declare const monthsInputToMonthOfYear: (input: "jan" | "feb" | "mar" | "apr" | "may" | "jun" | "jul" | "aug" | "sep" | "oct" | "nov" | "dec") => import("@rschedule/core/DateAdapter").DateAdapter.Month;
export declare const getRepeatParams: (input: string) => Repeat;
export declare const repeatTasks: (root: Parent) => Parent;
