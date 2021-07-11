using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebAuctionAPI.Models;

namespace WebAuctionAPI.Services
{
    public class ItemService : IItemService
    {
        private readonly IConfiguration _configuration;

        public ItemService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        /// <summary>
        /// Add bidding
        /// </summary>
        /// <param name="itemModel">Item model object</param>
        public void AddBidding(ItemModel itemModel)
        {
            using var conn = new SqlConnection(_configuration.GetConnectionString("AuctionConn"));

            conn.Execute("ADD_BIDDING", new { ITEM_ID = itemModel.ItemId, USER_ID = itemModel.UserId, AMOUNT = itemModel.BidAmount }, commandType: CommandType.StoredProcedure);
        }

        /// <summary>
        /// Get item details
        /// </summary>
        /// <param name="itemId">Id of Item</param>
        /// <param name="userId">Id of User</param>
        /// <returns>Returns specific Item detail</returns>
        public IEnumerable<ItemModel> GetItemDetail(int itemId, int userId)
        {
            using var conn = new SqlConnection(_configuration.GetConnectionString("AuctionConn"));

            return conn.Query<ItemModel>("GET_ITEM_DETAILS", new { ITEM_ID = itemId, USER_ID = userId }, commandType: CommandType.StoredProcedure);
        }

        /// <summary>
        /// Get all items 
        /// </summary>
        /// <returns>Returns list of items</returns>
        public IEnumerable<ItemModel> GetItems()
        {
            using var conn = new SqlConnection(_configuration.GetConnectionString("AuctionConn"));

            return conn.Query<ItemModel>("GET_ITEMS", commandType: CommandType.StoredProcedure);
        }

        /// <summary>
        /// Add auto bidding
        /// </summary>
        /// <param name="itemModel">Item Model Object</param>
        /// <returns>Returns save message</returns>
        public void SubmitAutoBid(ItemModel itemModel)
        {
            using var conn = new SqlConnection(_configuration.GetConnectionString("AuctionConn"));

            conn.Execute("ADD_AUTO_BID", new { ITEM_ID = itemModel.ItemId, USER_ID = itemModel.UserId, BID_FUND = itemModel.UserBudget }, commandType: CommandType.StoredProcedure);
        }
    }
}
