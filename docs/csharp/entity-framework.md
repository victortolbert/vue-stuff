## Asynchronous EF methods in ASP.NET Core web apps

Asynchronous programming is the default mode for ASP.NET Core and EF Core.

A web server has a limited number of threads available, and in high load
situations all of the available threads might be in use. When that happens,
the server can't process new requests until the threads are freed up. With
synchronous code, many threads may be tied up while they aren't doing work
because they're waiting for I/O to complete. With asynchronous code, when a
process is waiting for I/O to complete, its thread is freed up for the server
to use for processing other requests. As a result, asynchronous code enables
server resources to be used more efficiently, and the server can handle more
traffic without delays.

Asynchronous code does introduce a small amount of overhead at run time. For
low traffic situations, the performance hit is negligible, while for high
traffic situations, the potential performance improvement is substantial.

In the following code, the [async] keyword, `Task` return value, `await`
keyword, and `ToListAsync` method make the code execute asynchronously.

```csharp
public async Task OnGetAsync()
{
    Students = await _context.Students.ToListAsync();
}
```

- The async keyword tells the compiler to:
  - Generate callbacks for parts of the method body.
  - Create the [Task] object that's returned.
- The `Task` return type represents ongoing work.
- The `await` keyword causes the compiler to split the method into two parts.
  The first part ends with the operation that's started asynchronously.
  The second part is put into a callback method that's called when the
  operation completes.
- `ToListAsync` is the asynchronous version of the `ToList` extension method.

Some things to be aware of when writing asynchronous code that uses EF Core:

- Only statements that cause queries or commands to be sent to the database are
  executed asynchronously. That includes `ToListAsync`, `SingleOrDefaultAsync`,
  `FirstOrDefaultAsync`, and `SaveChangesAsync`. It doesn't include statements that
  just change an `IQueryable`, such as
  `var students = context.Students.Where(s => s.LastName == "Davolio")`.
- An EF Core context isn't thread safe: don't try to do multiple operations in
- parallel.
- To take advantage of the performance benefits of async code, verify that
  library packages (such as for paging) use async if they call EF Core methods
  that send queries to the database.

In general, a web page shouldn't be loading an arbitrary number of rows.
A query should use paging or a limiting approach. For example, the preceding
query could use Take to limit the rows returned:

```csharp
public async Task OnGetAsync()
{
    Student = await _context.Students.Take(10).ToListAsync();
}
```
