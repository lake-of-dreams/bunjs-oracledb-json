# Bun Javascript engine with Oracle DB

[Bun](https://bun.sh) is a fast all-in-one JavaScript runtime which makes running Javascript/Typescript based applications faster and is designed with several other [improvements](https://bun.sh/docs#design-goals). The Oracle database natively supports [JSON data type](https://docs.oracle.com/en/database/oracle/oracle-database/23/adjsn/overview-json-oracle-database.html#GUID-D7BCE045-EF6D-47E9-9BB2-30C01933248E) and makes it easy storing and accessing JSON data using Typescript interfaces.

This example demonstrates the simplicity of using an Oracle Database from Typescript applications using [node-oracledb](https://github.com/oracle/node-oracledb) which is also interoperable with Bun.

# Prerequisites
The database run as a [Oracle Database 23ai](https://www.oracle.com/in/database/free/get-started/) container and therefore requires a container engine like [podman](https://podman.io/docs/installation). 

Bun can be installed using the [Bun installation instructions](https://bun.sh/docs/installation).

# Get Started
Start the database container and wait till the status is `healthy`.

```bash
podman run --name oracledb -p 1521:1521 -e ORACLE_PWD=oracle container-registry.oracle.com/database/free:latest
```
To install dependencies:

```bash
bun install
```

To run:

```bash
bun run productCatalog.ts
```
The simple application 
- connects to the Oracle Database container 
- creates a table with a JSON column `product_attributes`
- inserts and queries few products of type laptop
