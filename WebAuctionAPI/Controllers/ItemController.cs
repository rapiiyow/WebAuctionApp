using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WebAuctionAPI.Models;
using WebAuctionAPI.Services;

namespace WebAuctionAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ItemController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        /// <summary>
        /// Get all items 
        /// </summary>
        /// <returns>Returns list of items</returns>
        [HttpGet]
        public IEnumerable<ItemModel> GetItems()
        {
            ItemService itemService = new ItemService(_configuration);

            return itemService.GetItems();
        }

        /// <summary>
        /// Get item details
        /// </summary>
        /// <param name="itemId">Id of Item</param>
        /// <param name="userId">Id of User</param>
        /// <returns>Returns specific Item detail</returns>
        [HttpGet("{itemId}/{userId}")]
        public IEnumerable<ItemModel> GetItemDetail(int itemId, int userId)
        {
            ItemService itemService = new ItemService(_configuration);

            return itemService.GetItemDetail(itemId, userId);
        }

        /// <summary>
        /// Add bidding
        /// </summary>
        /// <param name="itemModel">Item Model Object</param>
        /// <returns>Returns save message</returns>
        [HttpPost]
        public IActionResult AddBidding([FromBody] ItemModel itemModel)
        {
            ItemService itemService = new ItemService(_configuration);

            itemService.AddBidding(itemModel);

            return Ok("Saved");
        }

        /// <summary>
        /// Add auto bidding
        /// </summary>
        /// <param name="itemModel">Item Model Object</param>
        /// <returns>Returns save message</returns>
        [HttpPost("AutoBid")]
        public IActionResult SubmitAutoBid([FromBody] ItemModel itemModel)
        {
            ItemService itemService = new ItemService(_configuration);

            itemService.SubmitAutoBid(itemModel);

            return Ok("Saved");
        }


    }
}
