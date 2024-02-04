<h1>Useful Links</h1>
- https://nodejs.org/en/download - installing node.js
- https://dotnet.microsoft.com/en-us/download/dotnet/8.0 - installing .NET 8 SDK
- https://www.microsoft.com/en-us/sql-server/sql-server-downloads - installing SQL Server Express

<h1>Running the project</h1>

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

<h1>Tech Stack</h1>

## Client

- pnpm - because it's superior of npm in every way shape and form
- Typescript
- React (Next.js), I used next.js for fun basically, I hadn't used it previously and was interested 😉
- Redux - for state management
- Tailwind css - for styling
- Highcharts - for charts
- primereact - for a component library
- formik - for better handling of forms
- jest, test-library@react and babel - for unit tests

## Server

- ASP.NET Core Web API
- Sql Express
- xUnit and Moq - for unit tests
