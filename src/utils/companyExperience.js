export const getCompanyExperience = () => {
  const foundedYear = 2012;
  return new Date().getFullYear() - foundedYear;
};
