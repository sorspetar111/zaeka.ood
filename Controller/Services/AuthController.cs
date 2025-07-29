using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")] //  /api/auth
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")] // POST /api/auth/register
    public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
    {
        // ASP.NET автоматично валидира модела (DTO) заради [ApiController]
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var userDto = await _authService.RegisterAsync(registerDto);

        if (userDto == null)
        {
            return BadRequest("Потребител с това име или и-мейл вече съществува.");
        }

       
        return CreatedAtAction(nameof(Register), new { id = userDto.Id }, userDto);
    }

    [HttpPost("login")] // POST /api/auth/login
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var token = await _authService.LoginAsync(loginDto);
        
        if (token == null)
        {
            return Unauthorized("Невалидно потребителско име или парола.");
        }
        
        return Ok(new { Token = token });
    }
}
 