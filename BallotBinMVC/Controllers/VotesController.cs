using Microsoft.AspNetCore.Mvc;

namespace BallotBinMVC.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BallotsController : ControllerBase
    {
        [HttpGet("GetBallots")]
        public IActionResult GetBallots()
        {
            var ballots = new[]
            {
                new { Candidate = "Alice", Count = 12 },
                new { Candidate = "Bob", Count = 8 }
            };

            return Ok(ballots);
        }
    }
}
