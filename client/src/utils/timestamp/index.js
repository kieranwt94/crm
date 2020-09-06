export const convertTimestamp = (timestamp) => {
  const regex = /^([0-9]{2,4})-([0-1][0-9])-([0-3][0-9]) (?:([0-2][0-9]):([0-5][0-9]):([0-5][0-9]))?$/;
  const parts = timestamp.replace(regex,"$1 $2 $3 $4 $5 $6").split(' ');
  console.log(parts[0], parts[1] -1, parts[2], parts[3], parts[4], parts[5]);
  return new Date(parts[0], parts[1] -1, parts[2], parts[3], parts[4], parts[5]);
}
