using BallotBinMVC.Data;
using BallotBinMVC.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BallotBinMVC.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BallotBinController : ControllerBase
    {
        private readonly BallotBinContext _context;

        public BallotBinController(BallotBinContext context)
        {
            _context = context;
        }

        [HttpGet("users")]
        public async Task<ActionResult<IEnumerable<TableUser>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }

        // 🔽 Add this below your existing methods
        [HttpGet("ping")]
        public IActionResult Ping()
        {
            return Ok("pong");
        }
    }
}