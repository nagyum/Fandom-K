const BASE_URL = "http://fandom-k-api.vercel.app";
// const k = 1;
export async function getVoteData(pageSize = 6) {
  const query = `/12-9/idols?pageSize=${pageSize}`;
  const response = await fetch(`${BASE_URL}/${query}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }
  return response.json();
}

//이미지, 순위의 숫자, 이름, 투표수 api ?

export async function getIdolData({ pageSize = 16 }) {
  const query = `12-9/idols?pageSize=${pageSize}`;
  const response = await fetch(`${BASE_URL}/${query}`);
  if (!response.ok) {
    throw new Error("후원데이터를 가져오는데 실패했습니다.");
  }
  const data = await response.json();
  return data;
}

export async function getChartData({ gender, pageSize = 10 }) {
  const url = new URL(`12-9/charts/{gender}`, BASE_URL);
  url.searchParams.append("gender", gender);
  url.searchParams.append("pageSize", pageSize);
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }
  return response.json();
}

export async function getSponsershipData() {
  const response = await fetch(
    `https://fandom-k-api.vercel.app/12-9/donations?pageSize=10`
  );
  if (!response.ok) {
    throw new Error("후원데이터를 가져오는데 실패했습니다.");
  }
  const data = await response.json();
  return data;
}
