/*
* @author Ramadan Ismael
*/

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace server.src.Configs
{
    public static class SwaggerConfig
    {
        public static void AddSwaggerConfiguration(this IServiceCollection service)
        {
            service.AddSwaggerGen(options =>
            {
                ConfigureSwaggerDoc(options);
                ConfigureJWTAuthentication(options);
            });

            static void ConfigureSwaggerDoc(SwaggerGenOptions options)
            {
                options.SwaggerDoc("v2", new OpenApiInfo
                {
                    Title = "JwtAuth API",
                    Version = "v2",
                    Description = "A ASP.NET Core Web API",
                    TermsOfService = new Uri("https://example.com/terms"),
                    Contact = new OpenApiContact
                    {
                        Name = "Ramadan Ismael",
                        Email = "ramadan.ismael02@gmail.com",
                        Url = new Uri("https://github.com/RamadanismaeL")
                    }
                });
            }

            // um token tem tres partes separadas: header.payload.signature
            static void ConfigureJWTAuthentication(SwaggerGenOptions ram)
            {
                var securitySchema = new OpenApiSecurityScheme
                {
                    Description = @"Enter JWT Bearer {token} to access this API",
                    Name = "Authorization", //Nome do cabeçalho que vai armazenar o token
                    Type = SecuritySchemeType.ApiKey, // Tipo de esquema de segurança (Com ApiKey, o token é enviado no cabeçalho, e primeiro de digitar para validar "
                    // Bearer {token}
                    // e Para Http, não precisar digitar Bearer, pois é gerado automáticamente
                    // ")
                    In = ParameterLocation.Header, // A localização do token (no cabeçalho)                    
                    Scheme = "Bearer", // Esquema do token
                    BearerFormat = "JWT" // Formato do token
                };

                var securityRequirement = new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = JwtBearerDefaults.AuthenticationScheme // Referência ao nome do esquema de segurança
                            },
                            Scheme = "oauth2",
                            Name = "Bearer",
                            In = ParameterLocation.Header
                        },
                        new List<string>()
                    }
                };

                // Definindo o esquema de segurança no Swagger
                ram.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme, securitySchema);

                // Adicionando o requisito de segurança para a API
                ram.AddSecurityRequirement(securityRequirement);
            }
        }

        /// <summary>
        /// DisplayRequestDuration() -> Mostra o tempo de resposta de cada requisição na UI do Swagger
        /// EnableFilter() -> Habilita a caixa de pesquisa na UI do Swagger
        /// EnableDeepLinking() -> Habilita a navegação profunda na UI do Swagger e Permite o uso de links diretos (URLs) prar endpoints específicos no Swagger UI. Ao recarregar a página, mantém o endpoint aberto
        /// EnableValidator() -> Ativa a validação JSON Schema dos parâmentos e repostas no Swagger UI. Ajuda a identificar erros na estrutura dos requests/responses.
        /// DisplayOperationId() -> Mostra o ID da operação na UI do Swagger
        /// DocExpansion(Swashbuckle.AspNetCore.SwaggerUI.DocExpansion.None) -> Define o modo de expansão da documentação na UI do Swagger. i.e, Define que as seções dos endpoints ficarão colapsadas por padrão
        /// </summary>
        public static void UseSwaggerConfiguration(this IApplicationBuilder app)
        {
            app.UseSwagger();
            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/swagger/v2/swagger.json", "JwtAuth API, v.2");
                options.RoutePrefix = string.Empty;

                options.DocumentTitle = "JwtAuth API Docs";
                options.DisplayRequestDuration();
                options.EnableFilter();
                options.EnableDeepLinking();
                options.EnableValidator();
                options.DisplayOperationId();
                options.DocExpansion(Swashbuckle.AspNetCore.SwaggerUI.DocExpansion.None);
            });
        }
    }
}