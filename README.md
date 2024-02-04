<h1>Project requirements</h1>

## Client

- Node v20.11.0
- pnpm is used to install and run the project

```bash
    # Steps in order to run the client app

    npm install pnpm -g

    cd ./Client
    pnpm run dev
```

## Server

- .NET v8.0.101
- SQL Server Express

```bash
    # Steps in order to run the server app

    cd ./Server
    dotnet run
```

For ease of starting the project ASAP, I have included the appsettings.json, which includes the DB connection string, make sure its correct for you.

```json
"DefaultConnection": "Server=.\\SQLEXPRESS;Database=Investments;Trusted_Connection=True;Encrypt=False;"
```
