namespace Exemplar.Api.MappingProfiles
{
    using AutoMapper;
    using Exemplar.Domain;
    using Exemplar.Dto;

    public class CustomerPaymentProfile : Profile
    {
        public CustomerPaymentProfile()
        {
            CreateMap<Exemplar.Domain.CustomerPaymentProfile, CustomerPaymentProfileDto>()
                .ForMember(dest => dest.CustomerProfileId, opt => opt.MapFrom(src => src.CustomerProfileId))
                .ForMember(dest => dest.CustomerPaymentProfileId, opt => opt.MapFrom(src => src.CustomerPaymentProfileId))
                .ForMember(dest => dest.MerchantCustomerId, opt => opt.MapFrom(src => src.MerchantCustomerId))
                .ForMember(dest => dest.DefaultPaymentProfile, opt => opt.MapFrom(src => src.DefaultPaymentProfile))
                .ForAllOtherMembers(vm => vm.Ignore());
        }
    }
}
