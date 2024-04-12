module.exports = (dataSourcePath) => {
  const split = dataSourcePath.split("#");

  if (split.length > 1) {
    return {
      importString: `${split[0]}`,
      dataSourceName: split[1],
    };
  }
  return {
    importString: `${split[0]}`,
    dataSourceName: "DataSource",
  };
};
