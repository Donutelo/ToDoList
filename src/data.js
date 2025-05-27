export const dataStuff = (() => {
  let allFormsData, formsData;

  function getFormsData(forms) {
    // Kinda of a bad name, but I don't have any other ideias at the moment
    allFormsData = new FormData(forms);
    formsData = {};

    formsData = Object.fromEntries(allFormsData.entries());
  }

  function setFormsData() {
    return formsData;
  }

  return { getFormsData, setFormsData };
})();
