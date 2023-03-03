import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

export const date = (date: Date | number) => {};

export const dateDistance = (date: Date | number) =>
  formatDistanceToNow(date, { locale: fr });
