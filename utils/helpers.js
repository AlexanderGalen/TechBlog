module.exports = {
    format_date: (date) => {
      console.log(date);
      // Format date as MM/DD/YYYY
      return date.toLocaleDateString();
      // return false;
    },
};