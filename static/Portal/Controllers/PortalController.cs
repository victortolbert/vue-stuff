namespace Exemplar.Web.Areas.Portal.Controllers
{
    using System;
    using System.Linq;
    using System.Net.Http;
    using System.Threading.Tasks;
    using Exemplar.Dto.Enums;
    using Exemplar.Services;
    using Exemplar.Services.DataAccessService;
    using Exemplar.Services.ExemplarMessageService;
    using Exemplar.Web.Controllers;
    using Exemplar.Web.Helper;
    using Hancock.Web.Core.Utilities;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.Options;

    [Authorize]
    [Area(ExemplarWebAreas.Portal)]
    public class PortalController : BaseController
    {
        public PortalController(IExemplarMessageService exemplarMessageService, IOptions<AppSettings> appSettings, IConfiguration configuration, IHttpClientFactory httpClientFactory)
        : base(httpClientFactory, exemplarMessageService, configuration, appSettings)
        {
            httpClientFactory = httpClientFactory ?? throw new ArgumentNullException(nameof(httpClientFactory));
        }

        public async Task<IActionResult> Index(string projectNumber = "")
        {            
            ViewData["GoogleMapsApiKey"] = configuration.GetValue<string>("AppSettings:GoogleDirectionsApiKey");

            ViewData["CurrentUser"] = CurrentUser;

            return await DirectPage(ViewData, ExemplarWebControllers.Portal, ExemplarWebAreas.Portal);
        }
    }
}
