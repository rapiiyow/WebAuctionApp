using System;

namespace WebAuctionAPI.Models
{
    public class ItemModel
    {
        private string _base64String = null;
        public int ItemId { get; set; }
        public int UserId { get; set; }
        public string ItemName { get; set; }
        public string ItemDescription { get; set; }
        public decimal ItemPrice { get; set; }
        public string CloseDateTime { get; set; }
        public byte[] ItemImage { get; set; }
        public string Base64String
        {
            get
            {
                if (_base64String != null)
                {
                    return _base64String;
                }
                _base64String = "data:image/JPEG;base64," + Convert.ToBase64String(ItemImage);
                return _base64String;
            }
        }

        public decimal BidAmount { get; set; }
        public decimal UserBudget { get; set; }
        public int TopBidder { get; set; }
    }
}
