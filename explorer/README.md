# Multichain Giant Squid Explorer

- install dependency

```
yarn 
```

- Set environment

copy .env.example and rename to .env

- intstall docker service

- install subsquid-cli if not exit

```
npm i -g @subsquid/cli@latest
```

- execute subsquid command

```
sqd up  // start database use 'sqd down' to stop

sqd build  // Build the squid project
sqd codegen // Generate model

sqd migration:generate 
sqd migration:apply  //migration:apply
sqd process // tart the squid processor

sqd serve // Start the GraphQL API server

```

- get into GraphQL API server http://localhost:4350/graphql
