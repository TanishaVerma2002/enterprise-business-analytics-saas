using EnterpriseAnalytics.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using EnterpriseAnalytics.API.Services;
using EnterpriseAnalytics.API.Services.Interfaces;
using EnterpriseAnalytics.API.Middleware;


var builder = WebApplication.CreateBuilder(args);

builder.Logging.ClearProviders();

builder.Logging.AddConsole();

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(
    options =>
        options.UseNpgsql(
            builder.Configuration.GetConnectionString(
                "DefaultConnection"
            )
        )
);

builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<
    ICsvImportService,
    CsvImportService>();  //Registering the service for CSV Upload

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins(
                "https://enterprise-business-analytics-git-4b243b-tanisha-s-projects2002.vercel.app/"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
});
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,

            ValidateAudience = true,

            ValidateLifetime = true,

            ValidateIssuerSigningKey = true,

            ValidIssuer = builder.Configuration["JWT:Issuer"],

            ValidAudience = builder.Configuration["JWT:Audience"],

            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(
                    builder.Configuration["JWT:Key"]!
                ))
        };
    });

//Adding Swagger Services

builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();  

//temp for testing JWT Authentication
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Enterprise Analytics API",
        Version = "v1"
    });

    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",

        Type = SecuritySchemeType.Http,

        Scheme = "bearer",

        BearerFormat = "JWT",

        In = ParameterLocation.Header,

        Description = "Enter JWT Token"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,

                    Id = "Bearer"
                }
            },

            Array.Empty<string>()
        }
    });
});

var port =
    Environment.GetEnvironmentVariable("PORT");

if (!string.IsNullOrEmpty(port))
{
    builder.WebHost.UseUrls(
        $"http://*:{port}"
    );
}

var app = builder.Build();

app.UseCors("AllowFrontend");

app.UseMiddleware<ExceptionMiddleware>();

app.UseHttpsRedirection();

//Middleware pipeline - for authentication

app.UseAuthentication();

app.UseAuthorization();


//Enabling SWAGGER Middleware

app.UseSwagger();
app.UseSwaggerUI();

app.MapControllers();
app.Run();
