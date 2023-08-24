namespace Exemplar.Web.Areas.Claim.Helpers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Exemplar.Dto;
    using Exemplar.Services.DataAccessService;

    public interface IExternalFormHelper
    {
        string ExemplarCoreUrl { get; }

        Task<DataAccessResult<ServiceAreaPostalCodeDto>> IsAreaCovered(string postalCode);

        Task<DataAccessResult<ServiceAreaPostalCodeDto>> GetServiceAreaId(string postalCode);

        Task<DataAccessResult<List<TimeSlotDto>>> GetScheduledDateTimeSlots(int serviceAreaId, string scheduledDate, int serviceTypeDuration);

        Task<DataAccessResult<int>> AreRoutesAvailable(int serviceAreaId, string scheduledDate); 
    }
}