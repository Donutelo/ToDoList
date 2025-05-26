export const dataStuff = (() => {
  let allFormsData, formsData;

  function getFormsData(forms) {
    // Kinda of a bad name, but I don't have any other ideias at the moment
    allFormsData = new FormData(forms);
    formsData = {};

    allFormsData.forEach((value, key) => {
      formsData[key] = value;
    });
  }

  function setFormsData() {
    return formsData;
  }

  return { getFormsData, setFormsData };
})();
