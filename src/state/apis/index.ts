export const requestLoadSource = async (id: string) => {
  const resp = await fetch(`/api/sources/${id}`);
  const data = await resp.json();

  return data.source;
};
