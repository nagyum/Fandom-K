const BASE_URL = "https://fandom-k-api.vercel.app/";

export async function getIdolData({ pageSize = 16 }) {
  const query = `12-9/idols?pageSize=${pageSize}`;
  const response = await fetch(`${BASE_URL}/${query}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }
  return response.json();
}
