using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SampleService.Models;
using System.Security.Claims;

namespace SampleServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendanceController : ControllerBase
    {
        private readonly EventContext _context;

        public AttendanceController(EventContext context)
        {
            _context = context;
        }

        [HttpPost("confirm")]
        public async Task<ActionResult> ConfirmAttendance(AttendanceModel model)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return Unauthorized();
            }
            int userId = int.Parse(userIdClaim.Value);
            model.UserId = userId;

            if (await _context.Attendances.AnyAsync(a => a.EventId == model.EventId && a.UserId == model.UserId))
            {
                return BadRequest("Attendance already confirmed");
            }

            _context.Attendances.Add(model);
            await _context.SaveChangesAsync();

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return BadRequest("User not found");
            }

            return Ok(new { message = "Attendance confirmed", userEmail = user.Username });
        }

        [HttpGet("count/{eventId}")]
        public async Task<ActionResult<int>> GetAttendanceCount(int eventId)
        {
            var count = await _context.Attendances.CountAsync(a => a.EventId == eventId);
            return Ok(count);
        }
    }
}