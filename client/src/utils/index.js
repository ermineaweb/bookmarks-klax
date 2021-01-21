function formatDate(date) {
  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  if (!date) return;
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

export { formatDate };
