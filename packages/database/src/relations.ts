import { defineRelations } from "drizzle-orm";
import * as schemas from "./schemas/index";

export const relations = defineRelations(schemas, (r) => ({}));
