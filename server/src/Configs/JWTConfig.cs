/*
*@author Ramadan Ismael
*/

using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace server.src.Configs
{
    public static class JWTConfig
    {
        public static void AddJWTAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            string audience = configuration["JWTSettings:validAudience"] ?? throw new InvalidOperationException("JWT: validAudience is not set");
            string issuer = configuration["JWTSettings:validIssuer"] ?? throw new InvalidOperationException("JWT: validIssuer is not set");
            var signingKey = Environment.GetEnvironmentVariable("JWT_SIGNING_KEY") ?? throw new InvalidOperationException("JWT_SINGNING_KEY is not set");

            //Console.WriteLine($"Audience: {audience} \n Issuer: {issuer} \n Signing Key: {signingKey}");

            services.AddAuthentication(ram =>
            {
                ram.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                ram.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                ram.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(ram =>
            {
                ram.RequireHttpsMetadata = true; // Apenas para desenvolvimento e value TRUE para produção
                ram.SaveToken = true;
                ram.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = issuer,

                    ValidateAudience = true,
                    ValidAudience = audience,
                    RequireAudience = true,

                    ValidateLifetime = true,
                    RequireExpirationTime = true,

                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(signingKey)),
                    RequireSignedTokens = true,
                    ClockSkew = TimeSpan.FromMinutes(5)
                };
            });
        }
    }
}