using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAuctionAPI.Models;

namespace WebAuctionAPI.Services
{
    public class User : IUser
    {
        /// <summary>
        /// Static dummy user
        /// </summary>
        private List<UserModel> users = new List<UserModel>()
        {
            new UserModel()
            {
                UserId = 1,
                Username = "user1"
            },
            new UserModel()
            {
                UserId = 2,
                Username = "user2"
            }
        };

        /// <summary>
        /// Get user details by username
        /// </summary>
        /// <param name="userName">Username of user</param>
        /// <returns>Returns details of user</returns>
        public UserModel GetUser(string userName)
        {
            return users.SingleOrDefault(x => x.Username == userName);
        }
    }
}
