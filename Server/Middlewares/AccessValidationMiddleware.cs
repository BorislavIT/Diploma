using Data;
using Services;
using Services.TokenHandlers;

public class AccessValidationMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IServiceProvider _serviceProvider;
    private readonly string[] _excludedPaths = { "/Account/Login", "/Account/Register", "/Account/Identify" };

    public AccessValidationMiddleware(RequestDelegate next, IServiceProvider serviceProvider)
    {
        _next = next;
        _serviceProvider = serviceProvider;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        if (_excludedPaths.Any(path => context.Request.Path.StartsWithSegments(path, StringComparison.OrdinalIgnoreCase)))
        {
            await _next(context);
            return;
        }

        if (!context.Request.Cookies.TryGetValue(CookieNames.AUTH_TOKEN, out var token))
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsync("Token is missing.");
            return;
        }

        // Create a scope to resolve the scoped services
        using (var scope = _serviceProvider.CreateScope())
        {
            var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            if (dbContext == null) return;

            // Validate the token using DbContext
            if (!IsValidToken(dbContext, token))
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsync("Invalid token.");
                return;
            }

            if (!IsValidToken(dbContext, token))
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsync("Invalid token.");
                return;
            }
        }

        await _next(context);
    }

    private bool IsValidToken(AppDbContext dbContext, string token)
    {
        var (username, expires) = JWTTokenHandler.ValidateToken(token);
        var account = dbContext.Accounts.FirstOrDefault(acc => acc.Username == username);

        if(account == null)
        {
            throw new UnauthorizedAccessException("Invalid user");
        }

        if (account.token != token)
        {
            throw new UnauthorizedAccessException("Token is invalid");
        }

        if (expires < DateTime.UtcNow)
        {
            throw new UnauthorizedAccessException("Token has expired");
        }

        return true;
    }
}