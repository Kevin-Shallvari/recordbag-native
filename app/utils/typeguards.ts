import { PostgrestError } from "@supabase/supabase-js";

export const isPostGresError = (error: any): error is PostgrestError => {
  return (
    "message" in error &&
    "hint" in error &&
    "details" in error &&
    "code" in error
  );
};
