using AutoMapper;
using Models;
using Server.DTOs;

namespace Services.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Investment, InvestmentDTO>();
            CreateMap<InvestmentDTO, Investment>();
        }
    }
}