function formatDate(date) {
  var d = new Date(date);
  var date_format_str =
    d.getFullYear().toString() +
    "/" +
    ((d.getMonth() + 1).toString().length === 2
      ? (d.getMonth() + 1).toString()
      : "0" + (d.getMonth() + 1).toString()) +
    "/" +
    (d.getDate().toString().length === 2
      ? d.getDate().toString()
      : "0" + d.getDate().toString()) +
    " " +
    (d.getHours().toString().length === 2
      ? d.getHours().toString()
      : "0" + d.getHours().toString()) +
    ":" +
    ((parseInt(d.getMinutes() / 5) * 5).toString().length === 2
      ? (parseInt(d.getMinutes() / 5) * 5).toString()
      : "0" + (parseInt(d.getMinutes() / 5) * 5).toString()) +
    ":00";

  return date_format_str;
}

export { formatDate };
