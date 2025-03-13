/*
* @author Ramadan Ismael
*/

using Microsoft.AspNetCore.Identity;

namespace server.src.Models
{
    public class UserModel : IdentityUser
    {
        public string? FullName { get; set; }
        
        // Implement JWT Refresh Token -> After go to LoginController
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }
    }
}