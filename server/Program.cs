/*
* @author Ramadan Ismael
*/

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using server.src.Configs;
using server.src.Data;
using server.src.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ServerDbContext>(options => options.UseSqlite("Data Source=dbjwtauth.db"));
builder.Services.AddIdentity<UserModel, IdentityRole>()
    .AddEntityFrameworkStores<ServerDbContext>()
    .AddDefaultTokenProviders(); // Permite gerar tokens de redefinição de senha, autenticação de dois fatores, etc

builder.Services.AddOpenApi();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerConfiguration();
builder.Services.AddJWTAuthentication(builder.Configuration);
builder.Services.AddAuthorization();

builder.Services.AddCors(options => {
    options.AddPolicy("MyClient", ram => {
        ram.AllowAnyOrigin()
        .WithMethods("POST", "GET", "PUT", "DELETE")
        .AllowAnyHeader();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwaggerConfiguration();
}

app.UseHttpsRedirection();
app.UseCors("MyClient");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();