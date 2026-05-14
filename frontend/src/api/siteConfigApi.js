import { buildApiUrl } from "../config/api";

export const fetchSiteConfig = async () => {
  const response = await fetch(buildApiUrl("/api/v1/public/site-config"));
  if (!response.ok) throw new Error("Backend not reachable");
  return await response.json();
};
