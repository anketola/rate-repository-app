const formatNumber = ( toFormat ) => {
    if (toFormat < 1000) {
      return toFormat.toString();
    } else {
      let desimaali = toFormat % 1000;
      let eka = desimaali.toString().substring(0, 1);
      let tuhannet = Math.floor(toFormat / 1000);
      return tuhannet + '.' + eka + 'k';
    }
  }

export default formatNumber;