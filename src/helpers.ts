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


'Spaghetti Recipe Ingredients Spaghetti Marinara Sauce Salt Water Instructions Bring water to a boil. Add spaghetti to boiling water. Add salt to taste. Cook for 10 minutes, stirring occasionally. Add marinara sauce to a pan, bringing to a simmer. Mix cooked spaghetti with marinara sauce. Enjoy! Spaghetti Recipe Ingredients Spaghetti Marinara Sauce Salt Water Instructions Bring water to a boil. Add spaghetti to boiling water. Add salt to taste. Cook for 10 minutes, stirring occasionally. Add marinara sauce to a pan, bringing to a simmer. Mix cooked spaghetti with marinara sauce. Enjoy!'
'Spaghetti Recipe Ingredients Spaghetti Marinara Sauce Salt Water Instructions Bring water to a boil. Add spaghetti to boiling water. Add salt to taste. Cook for 10 minutes, stirring occasionally. Add marinara sauce to a pan, bringing to a simmer. Mix cooked spaghetti with marinara sauce. Enjoy!'