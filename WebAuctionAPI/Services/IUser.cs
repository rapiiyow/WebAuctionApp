using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAuctionAPI.Models;

namespace WebAuctionAPI.Services
{
    public interface IUser
    {
        UserModel GetUser(string userName);
    }
}
