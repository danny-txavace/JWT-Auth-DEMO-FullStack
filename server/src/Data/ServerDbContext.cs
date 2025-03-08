/*
*@author Ramadan Ismael
*/

using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using server.src.Models;

namespace server.src.Data
{
    public class ServerDbContext : IdentityDbContext<UserModel>
    {
        public ServerDbContext(DbContextOptions<ServerDbContext> options) : base(options)
        {}
    }
}