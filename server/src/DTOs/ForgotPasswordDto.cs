/*
*@author Ramadan Ismael
*/

using System.ComponentModel.DataAnnotations;

namespace server.src.DTOs
{
    public class ForgotPasswordDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
    }
}