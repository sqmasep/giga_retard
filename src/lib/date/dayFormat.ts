import { format, formatDistance } from "date-fns";
import { fr } from "date-fns/locale";

export const date = (date: Date | number) => {};

export const dateDistance = (date: Date | number) =>
  formatDistance(Date.now(), date, { locale: fr });
