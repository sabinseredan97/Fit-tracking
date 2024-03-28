using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace server.Controllers;

[ApiController]
[Route("/[controller]")]

public class AccountController : ControllerBase
{
    [HttpPost("logout", Name = "Logout")]
    public async Task<IActionResult> Post()
    {
        await HttpContext.SignOutAsync(IdentityConstants.ApplicationScheme);
        return Ok();
    }
}
