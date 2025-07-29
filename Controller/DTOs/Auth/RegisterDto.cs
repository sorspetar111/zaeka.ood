using System.ComponentModel.DataAnnotations;

public class RegisterDto
{
    [Required]
    [StringLength(100, MinimumLength = 3)]
    public string UserName { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [StringLength(100, MinimumLength = 8)]
    public string Password { get; set; }

    [Required]
    [Compare("Password", ErrorMessage = "Паролите не съвпадат.")]
    public string ConfirmPassword { get; set; }
}