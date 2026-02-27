import { atom } from "jotai";
import { Insight } from "../schemas/insight.ts";

export const allInsightsAtom = atom<Insight[]>([]);
