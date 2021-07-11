using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAuctionAPI.Services;

namespace WebAuctionAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUser _user;
        public UsersController(IUser user)
        {
            _user = user;
        }

        /// <summary>
        /// Get user details by username
        /// </summary>
        /// <param name="userName">Username of user</param>
        /// <returns>Returns details of user</returns>
        [HttpGet("{userName}")]
        public IActionResult GetUser(string userName)
        {
            var user = _user.GetUser(userName);

            if(user != null)
            {
                return Ok(_user.GetUser(userName));
            }

            return NotFound("Access denied");
        }
    }
}
