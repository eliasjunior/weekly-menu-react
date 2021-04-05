import cloneDeep from "lodash.clonedeep";

import helper from "./TickedHelper";
const { filterByPicked } = helper({ getDeepCopy: cloneDeep });

export const buildPickedList = filterByPicked;
