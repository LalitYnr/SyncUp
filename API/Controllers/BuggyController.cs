using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuggyController : BaseApiController
    {
        [HttpGet("auth")]
        public IActionResult GetAuth()
        {
            return Unauthorized("This is an unauthorized request");
        }

        [HttpGet("bad-request")]
        public IActionResult GetBadRequest()
        {
            throw new Exception("This is a bad request");
        }

        [HttpGet("not-found")]
        public IActionResult GetNotFound()
        {
            return NotFound("This is a not found request");
        }

        [HttpGet("server-error")]
        public IActionResult GetServerError()
        {
            throw new Exception("This is a server error");
        }

    }
}
