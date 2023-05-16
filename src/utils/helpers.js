export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number / 100);
};

export const capitalize = (str) => {
  const arr = str.split(' ');
  const capitalizedArr = arr.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalizedArr.join(' ');
};

export const toInt = (number) => {
  return Number.isNaN(parseInt(number)) ? -1 : parseInt(number);
};
