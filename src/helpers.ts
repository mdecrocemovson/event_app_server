export const separateResponsesByCategory = (responses) => {
  const attending = responses
    .filter((r) => r.response === 1)
    .map((r) => r.user);
  const maybe = responses.filter((r) => r.response === 2).map((r) => r.user);
  const notAttending = responses
    .filter((r) => r.response === 3)
    .map((r) => r.user);

  return {
    attending,
    maybe,
    notAttending,
  };
};
