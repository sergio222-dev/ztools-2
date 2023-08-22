import type { Loader } from "@builder.io/qwik-city";
import type { FormProps, InitialValues, ResponseData } from "@modular-forms/qwik";
import type { FieldValues } from "@modular-forms/qwik/dist/types/types";

export interface FormLoaderProperty<T extends  FieldValues, D extends ResponseData> extends Omit<FormProps<T, D>, 'on' | 'of' | 'children'> {
  loader: ReturnType<Loader<InitialValues<T>>>
}

export interface CommonFormProperties<T extends FieldValues, D extends ResponseData = undefined> extends FormLoaderProperty<T, D> {}
