## Chimp DataSources Generator

## What

Helper that autogenerates DataSource-compatible APIs per controller for a given microservice, based on OpenAPI/Swagger specification.

You can see a real-life usage (article with a video) here: [https://www.xolv.io/blog/generate-your-apollo-datasources-2/](https://www.xolv.io/blog/generate-your-apollo-datasources-2/).

## Why

It's error-prone, slow and boring to create all those connectors manually. Most people either skip typing them, or type them manually (which is again error-prone, slow and boring). Having them generated makes the Developer Experience much nicer and the whole system significantly more maintainable.

## Usage
```
Usage: chimp-datasources-generator create [options] <directory> <api-location>

Generate RestDatasource from swagger specs.
Examples: 
   chimp-datasources-generator create ./generated/external-apis https://domain.com/v3/api-docs.yaml --withCircuitBreaker
   chimp-datasources-generator create ./generated/external-apis ./api-docs.yaml
   chimp-datasources-generator create ./generated/external-apis ./api-docs.yaml "@app/apis/DataSource#DataSource"

Arguments:
  directory                            Directory for the generated source files.
  api-location                         Location/URL for the json/yaml swagger specs. Use http/https when pointing to a URL and relative location when pointing to a file.

Options:
  -ds, --dataSourceImport <string>     You can also specify your own custom data source import. 
   "@app/apis/DataSource#DataSource" will use an import of:
   import { DataSource } from "@app/apis/DataSource"
  For a default import just use the path:
   "@app/apis/BaseDataSource"
  -cb, --withCircuitBreaker <boolean>  Add circuit breakers for api calls. (default: false)
  -h, --help                           display help for command
```

In your code create dataSources.ts file like this one:

```typescript
import { Controllers } from "@generated/external-apis";

export const dataSources = () => ({
  todoListsApi: new Controllers("http://localhost:8090/"),
});

export type DataSources = ReturnType<typeof dataSources>;

```

Add the dataSources to your ApolloServer configuration
```typescript
new ApolloServer({
    schema,
    dataSources,
  });
```

Make sure to add the DataSources to the GqlContext type in ./src/context.ts

```typescript
import { DataSources } from "@app/dataSources";

export type GqlContext = { dataSources: DataSources };
```

## How

We are using the swagger-codegen-cli with custom templates and a bit of extra scripting. 
