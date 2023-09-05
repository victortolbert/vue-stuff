## Supabase

```csharp
var url = Environment.GetEnvironmentVariable("SUPABASE_URL");
var key = Environment.GetEnvironmentVariable("SUPABASE_KEY");

var options = new Supabase.SupabaseOptions
{
    AutoConnectRealtime = true
};

var supabase = new Supabase.Client(url, key, options);
await supabase.InitializeAsync();
```

## Three methods of the DbSet class

| Method         | Description                                                   |
| -------------- | ------------------------------------------------------------- |
| **Add**(entity)    | Adds an entity to the DbSet collection and marks it as Added. |
| **Update**(entity) | Marks an entity as Modified                                   |
| **Remove**(entity) | Marks as entity as Deleted                                    |

## One method of the DbContext class

| Method     | Description                   |
| ---------- | ----------------------------- |
| **SaveChages**() | Saves changes to the database |

## Code that adds a new movie to the database

```csharp
var movie = new Movie { Name = "Taxi Driver", Year = 1976, Rating = 4};
context.Movies.Add(movie)
context.SaveChanges();
```

## An appsettings.json file that displays the generated SQL statements

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.EntityFrameworkCore.Database.Command": "Debug"
    }
  }
}
```

## Code that selects movies from the database

```csharp
var movies = context.Movies.OrderBy(m => m.Name).ToList();
```

## The generated SQL statement

```sql
SELECT [m].[MovieId], [m].[Name], [m].[Rating], [m].[Year]
FROM [Movies] AS [m]
ORDER BY [m].[Name]
```
