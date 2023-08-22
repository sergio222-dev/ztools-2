import { createContextId } from "@builder.io/qwik";
import type { UserAggregate } from "~/lib/user/domain/User.aggregate";

export const UserContext = createContextId<UserAggregate>('ZDM.user');
