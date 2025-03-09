/*
*@author Ramadan Ismael
*/

using System.ComponentModel.DataAnnotations;

namespace server.src.DTOs
{
    public class CreateRoleDto
    {
        [Required(ErrorMessage = "Role name is required")]
        public string RoleName { get; set; } = null!;
    }
}