const buildSpecGenCommandWithOptions = require("./buildSpecGenCommandWithOptions");

describe("Build spec gen command test", () => {
  const pathToSpecFile = "/spec/input.json";
  const codeOutputFolder = "/output";
  const pathToTemplate = "/template";
  const pathToSwaggerJar = "/swagger.jar";
  const baseCommand =
    "java -jar /swagger.jar generate -l typescript-fetch --template-dir /template -i /spec/input.json -o /output";
  test("should create command for no options passed", () => {
    const options = {};
    const result = buildSpecGenCommandWithOptions(
      pathToSwaggerJar,
      pathToTemplate,
      pathToSpecFile,
      codeOutputFolder,
      options
    );
    expect(result).toBe(
      `${baseCommand} --additional-properties=dataSourceName=RESTDataSource`
    );
  });

  test("should create command for custom datasource passed", () => {
    const options = {
      dataSourceImport: "@app/apis/DataSource#CustomDataSource",
    };
    const result = buildSpecGenCommandWithOptions(
      pathToSwaggerJar,
      pathToTemplate,
      pathToSpecFile,
      codeOutputFolder,
      options
    );
    expect(result).toBe(
      `${baseCommand} --additional-properties=dataSourceName=CustomDataSource,dataSourceImportString="@app/apis/DataSource"`
    );
  });

  test("should create command for custom datasource passed", () => {
    const options = {
      dataSourceImport: "@app/apis/DataSource#CustomDataSource",
    };
    const result = buildSpecGenCommandWithOptions(
      pathToSwaggerJar,
      pathToTemplate,
      pathToSpecFile,
      codeOutputFolder,
      options
    );
    expect(result).toBe(
      `${baseCommand} --additional-properties=dataSourceName=CustomDataSource,dataSourceImportString="@app/apis/DataSource"`
    );
  });

  test("should create command for circuit breaker options", () => {
    const options = { withCircuitBreaker: "--withCircuitBreaker" };
    const result = buildSpecGenCommandWithOptions(
      pathToSwaggerJar,
      pathToTemplate,
      pathToSpecFile,
      codeOutputFolder,
      options
    );
    expect(result).toBe(
      `${baseCommand} --additional-properties=withCircuitBreaker=true,dataSourceName=RESTDataSource`
    );
  });
});
