using Microsoft.AspNetCore.Http;

namespace EnterpriseAnalytics.API.Services.Interfaces
{
    public interface ICsvImportService
    {
        Task ImportProductsAsync(IFormFile file);
        Task ImportSalesAsync(IFormFile file);
    }
}

/*
Task ImportProductsAsync(IFormFile file);

Means:

Accept uploaded CSV file
        ↓
Import products asynchronously
WHY Task?

Because:

file reading
parsing
DB inserts

are I/O operations.

So enterprise apps use async.

WHY INTERFACE?

This is enterprise architecture principle:

Program against abstraction,
not implementation

Benefits:

cleaner code
easier testing
scalable architecture
replaceable implementations
*/