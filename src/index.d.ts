import { FC } from "react";
import {
  FormProps,
  InputProps,
  PrimaryValidateObject,
  SelectProps,
  TextareaProps,
  ValidationResult,
  CustomValidate,
} from "./types";

export declare const Form: FC<FormProps>;
export declare const Input: FC<InputProps>;
export declare const Select: FC<SelectProps>;
export declare const Textarea: FC<TextareaProps>;
export declare function useFormValidation<
  T extends {
    [id: string]: ValidationResult;
  }
>(ids: string[]): () => T;
export declare function useFormValidation<
  T extends {
    [id: string]: ValidationResult;
  }
>(...ids: string[]): () => T;
export declare const getValidationResult: (
  value: string | readonly string[] | number,
  identity: string,
  validation?: PrimaryValidateObject | undefined,
  customValidation?: Partial<CustomValidate> | undefined
) => ValidationResult;
export declare const FormValidation: FC;
export default FormValidation;