using System.ComponentModel.DataAnnotations;

namespace Data.Models
{
    public class ShoppingCartMp3
    {
        public int ShoppingCartId { get; set; }
        public ShoppingCart ShoppingCart { get; set; }

        public int Mp3Id { get; set; }
        public Mp3 Mp3 { get; set; }
    }
}