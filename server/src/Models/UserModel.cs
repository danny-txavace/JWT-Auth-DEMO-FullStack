/*
* @author Ramadan Ismael
*/

using Microsoft.AspNetCore.Identity;

namespace server.src.Models
{
    public class UserModel : IdentityUser
    {
        public string? FullName { get; set; }
    }
}