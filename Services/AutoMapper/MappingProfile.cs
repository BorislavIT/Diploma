using AutoMapper;
using Data.Models;
using Server.DTOs;

namespace Services.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Account, AccountDTO>();
            CreateMap<AccountDTO, Account>();

            CreateMap<ShoppingCart, ShoppingCartDTO>();
            CreateMap<ShoppingCartDTO, ShoppingCart>();
        }
    }
}