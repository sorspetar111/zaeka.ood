public interface IAuthService
{
    // Връщаме string, който ще бъде JWT токен. Връщаме null при грешка.
    Task<string?> LoginAsync(LoginDto loginDto);
    
    // Връщаме UserDto при успех и null при грешка.
    Task<UserDto?> RegisterAsync(RegisterDto registerDto);
}