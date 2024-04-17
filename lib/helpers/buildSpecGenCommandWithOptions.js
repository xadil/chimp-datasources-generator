const extractor = require("./customDataSourceExtractor");

const buildSpecGenCommandWithOptions = (
  pathToSwaggerJar,
  pathToTemplate,
  pathToSpecFile,
  codeOutputFolder,
  options
) => {
  const additionalProps = [];
  let shellCommand = `java -jar ${pathToSwaggerJar} generate -l typescript-fetch --template-dir ${pathToTemplate} -i ${pathToSpecFile} -o ${codeOutputFolder}`;

  if (options.withCircuitBreaker) {
    additionalProps.push("withCircuitBreaker=true");
  }

  if (options.dataSourceImport) {
    const { dataSourceName, importString } = extractor(
      options.dataSourceImport
    );
    additionalProps.push(`dataSourceName=${dataSourceName}`);
    additionalProps.push(`dataSourceImportString="${importString}"`);
  } else {
    additionalProps.push("dataSourceName=RESTDataSource");
  }

  if (additionalProps.length > 0) {
    shellCommand = shellCommand.concat(
      ` --additional-properties=${additionalProps.toString()}`
    );
  }
  return shellCommand;
};

module.exports = buildSpecGenCommandWithOptions;
