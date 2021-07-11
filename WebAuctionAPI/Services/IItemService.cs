using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAuctionAPI.Models;

namespace WebAuctionAPI.Services
{
    interface IItemService
    {
        IEnumerable<ItemModel> GetItems();

        IEnumerable<ItemModel> GetItemDetail(int itemId, int userId);

        void AddBidding(ItemModel itemModel);

        void SubmitAutoBid(ItemModel itemModel);
    }
}
