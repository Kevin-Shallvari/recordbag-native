import { initial } from "@devexperts/remote-data-ts";
import { UseQueryResult } from "@tanstack/react-query";
import { useState } from "react";

export const useQueryRemote = ({ data, status, error }: UseQueryResult) => {
  const [query, setQuery] = useState(initial);
};
