using Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Server.Middlewares;
using Services;
using Services.Contracts;

var builder = WebApplication.CreateBuilder(args);

// we are allowed to use the Models project here, since in .NET 5+ projects automatically include transitive references
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull;
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IShoppingCartService, ShoppingCartService>();
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<ICookieService, CookieService>();
builder.Services.AddScoped<IPlaylistService, PlaylistService>();
builder.Services.AddScoped<IMp3Service, Mp3Service>();


builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

var CORS_POLICY = "AllowSpecificOrigin";
builder.Services.AddCors((options) =>
{
    options.AddPolicy(CORS_POLICY,
    builder => builder.WithOrigins("http://localhost:3000")
                      .AllowAnyMethod()
                      .AllowAnyHeader()
                      .AllowCredentials());
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var dbContext = services.GetRequiredService<AppDbContext>();
    dbContext.Database.Migrate();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}

app.UseCors(CORS_POLICY);

app.UseMiddleware<AccessValidationMiddleware>();
app.UseMiddleware<ExceptionHandlingMiddleware>();

string mp3FilesDirectory = Path.Combine(Directory.GetCurrentDirectory(), "Mp3Files");
string imagesDirectory = Path.Combine(Directory.GetCurrentDirectory(), "Thumbnails");

if (!Directory.Exists(mp3FilesDirectory))
{
    Directory.CreateDirectory(mp3FilesDirectory);
}

if (!Directory.Exists(imagesDirectory))
{
    Directory.CreateDirectory(imagesDirectory);
}

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "Mp3Files")),
    RequestPath = "/mp3"
});
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "thumbnails")),
    RequestPath = "/thumbnails"
});
app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthorization();
app.MapControllers();
app.Run();
