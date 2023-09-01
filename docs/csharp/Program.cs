using Microsoft.EntityFrameworkCore;

await using var db = new BloggingContext();

// Note: This sample requires the database to be created before running.
// For more information on creating a database, see https://aka.ms/efcore
Console.Write($"Database path: {db.DbPath}.");

// Read
Console.WriteLine("Querying for blogs");

// var results = await db.Blogs
//     .OrderBy(b => b.BlogId)
//     .ToListAsync();

var results =
  from blog in db.Blogs
  where blog.BlogId == 1
  select blog;

await foreach (var s in results.AsAsyncEnumerable())
{
  Console.WriteLine("Blog id: {0}   BlogUrl: {1}", s.BlogId, s.Url);
}
