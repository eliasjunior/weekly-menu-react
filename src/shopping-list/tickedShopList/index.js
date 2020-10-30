import cloneDeep from "lodash.clonedeep";

import TicketFactory from "./TickedHelper";
const { filterByPicked } = TicketFactory({ getDeepCopy: cloneDeep });

export const buildPickedList = filterByPicked;
