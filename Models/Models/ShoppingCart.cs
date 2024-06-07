using System.ComponentModel.DataAnnotations;

namespace Data.Models
{
    public class ShoppingCart
    {
        [Key]
        public int Id { get; set; }

        public int AccountId { get; set; }
        public Account Account { get; set; }

        public ICollection<ShoppingCartMp3> ShoppingCartMp3s { get; set; } = new List<ShoppingCartMp3>();
    }
}