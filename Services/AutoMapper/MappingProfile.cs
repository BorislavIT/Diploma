using AutoMapper;
using Data.Models;
using Services.DTOs;

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