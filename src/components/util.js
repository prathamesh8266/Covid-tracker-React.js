export const sortData = (data) => {
  const sortedData = [...data];
  // sortedData.sort((a, b) => {
  //   if (a.cases > b.cases) {
  //     return -1;
  //   } else {
  //     return 1;
  //   }
  // });
  sortedData.sort((a, b) => b.cases - a.cases);
  return sortedData;
};
