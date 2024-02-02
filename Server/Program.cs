using Models;
using Microsoft.EntityFrameworkCore;
using Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IInvestmentsService, InvestmentsService>();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

var CORS_POLICY = "AllowSpecificOrigin";
builder.Services.AddCors((options) =>
{
    options.AddPolicy(CORS_POLICY,
    builder => builder.WithOrigins("http://localhost:3000")
                      .AllowAnyMethod()
                      .AllowAnyHeader());
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

app.UseHttpsRedirection();
app.UseCors(CORS_POLICY);
app.UseAuthorization();
app.MapControllers();
app.Run();
