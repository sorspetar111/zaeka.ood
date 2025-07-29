using Microsoft.EntityFrameworkCore;

public class AuthService : IAuthService
{
    private readonly ApplicationDbContext _context;

     
    public AuthService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<UserDto?> RegisterAsync(RegisterDto registerDto)
    {
        // 1. Проверка дали потребителят вече съществува
        if (await _context.Users.AnyAsync(u => u.UserName == registerDto.UserName || u.Email == registerDto.Email))
        {
             
            return null;
        }

        
        var passwordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.Password);
 
        var user = new User
        {
            UserName = registerDto.UserName,
            Email = registerDto.Email,
            PasswordHash = passwordHash,
            Role = RoleType.User,  
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

       
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        
        return new UserDto 
        {
            Id = user.Id,
            UserName = user.UserName,
            Email = user.Email,
            Role = user.Role.ToString(),
            IsActive = user.IsActive,
            CreatedAt = user.CreatedAt
        };
    }
    
    public async Task<string?> LoginAsync(LoginDto loginDto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == loginDto.UserName);

        if (user == null || !user.IsActive)
        {
            return null;  
        }

       
        if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
        {
            return null;  
        }

       
        var token = GenerateJwtToken(user);
        return token;
    }

    private string GenerateJwtToken(User user)
    {
        
        return $"dummy-jwt-token-for-{user.UserName}";  
    }
}