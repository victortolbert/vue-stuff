namespace Exemplar.Web.Areas.Claim.Helpers
{
    using System;
    using System.Collections.Generic;
    using System.Drawing;
    using System.Drawing.Imaging;
    using System.IO;
    using System.Linq;
    using System.Threading.Tasks;
    using Exemplar.Dto;
    using Exemplar.Services.DataAccessService;
    using Exemplar.Services.ExemplarMessageService;
    using Exemplar.Services.Repos;
    using Exemplar.Web.Helpers;
    using Hancock.Web.Core.Utilities;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.Options;

    public class ExternalFormHelper : IExternalFormHelper
    {
        private readonly IOptions<AppSettings> appSettings;                
        private readonly IConfiguration configuration;
        private readonly IExemplarMessageService exemplarMessageService;
        private readonly IExternalWebFormRepo externalWebFormRepo;

        public ExternalFormHelper(
            IExemplarMessageService exemplarMessageService, 
            IConfiguration configuration, 
            IOptions<AppSettings> appSettings,  
            IExternalWebFormRepo externalWebFormRepo)
        {
            this.appSettings = appSettings;
            this.configuration = configuration;
            this.externalWebFormRepo = externalWebFormRepo;            
            this.exemplarMessageService = exemplarMessageService;
        }
      
        public string ExemplarCoreUrl
        {
            get { return configuration["ExemplarCoreUrl"] ?? appSettings.Value.ExemplarCoreUrl; }
        }

        public async Task<DataAccessResult<ServiceAreaPostalCodeDto>> IsAreaCovered(string postalCode)
        {
            return await externalWebFormRepo.GetPostalCodeById(0, postalCode);
        }

        public async Task<DataAccessResult<ServiceAreaPostalCodeDto>> GetServiceAreaId(string postalCode)
        {
            return await externalWebFormRepo.GetPostalCodeById(0, postalCode);
        }

        public async Task<DataAccessResult<List<TimeSlotDto>>> GetScheduledDateTimeSlots(int serviceAreaId, string scheduledDate, int duration)
        {            
            var response = await externalWebFormRepo.GetTimeSlots(serviceAreaId, scheduledDate, duration);
            if (!response.Result)
                return null;

            return response;
        }

        public async Task<DataAccessResult<int>> AreRoutesAvailable(int serviceAreaId, string scheduledDate)
        {
            var response = await externalWebFormRepo.AreRoutesAvailable(serviceAreaId, scheduledDate);
            if (!response.Result)
                return null;

            return response;
        }
    }
}
