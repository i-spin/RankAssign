## Requirements:
- Deno version at least: 1.19.2
- Sqlite3 version at least: 3.36.0

## To run:
​	Create a config.yml file with the following contents:
```yml
prefix: <Replace this with the prefix you want>
token: <Replace this with your own token>
```

​	Then create a database:
```sh
sqlite3 database.db < sql/schema.sql
```

​	Finally, you can start the bot by running:
```sh
deno run --unstable --allow-env --allow-read --allow-write --allow-net src/index.ts
```