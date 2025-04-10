import { useSearchParams } from "react-router-dom";

export function useUrlParams() {
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy");
  const post_id = searchParams.get("post_id");

  return { post_id, sortBy };
}
