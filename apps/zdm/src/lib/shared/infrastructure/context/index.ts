import { createContextId } from "@builder.io/qwik";

export const SimpleContext = createContextId<{a: string, b: string}>('SimpleContext');
