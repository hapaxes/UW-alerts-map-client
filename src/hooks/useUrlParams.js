import { useSearchParams } from "react-router-dom";

export function useUrlParams() {
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy");
  const post_id = searchParams.get("post_id");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return { post_id, location: [lat, lng], sortBy };
}
