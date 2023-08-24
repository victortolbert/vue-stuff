namespace Exemplar.Web.Areas.Payments.Controllers
{
    using System;
    using System.Net.Http;
    using System.Threading.Tasks;
    using Exemplar.Services.ExemplarMessageService;
    using Exemplar.Web.Controllers;
    using Exemplar.Web.Helper;
    using Hancock.Web.Core.Utilities;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.Options;

    [Authorize]
    [Area(ExemplarWebAreas.Payment)]
    public class PaymentsController : BaseController
    {
        private readonly string exemplarApiClient = "ExemplarApiClient";
        private readonly IHttpClientFactory httpClientFactory;

        public PaymentsController(IExemplarMessageService exemplarMessageService, IOptions<AppSettings> appSettings, IConfiguration configuration, IHttpClientFactory httpClientFactory)
        : base(httpClientFactory, exemplarMessageService, configuration, appSettings)
        {
            httpClientFactory = httpClientFactory ?? throw new ArgumentNullException(nameof(httpClientFactory));
        }

        public async Task<IActionResult> Index()
        {
            return await DirectPage(ViewData, ExemplarWebControllers.Payments, ExemplarWebAreas.Payment);
        }

        //[HttpGet]
        //public async Task<IActionResult> GetIndpAdjusterInfo(int adjusterId = 72087, bool onExternalForm = true)
        //{
        //    //var apiClient = httpClientFactory.CreateClient(exemplarApiClient);
        //    //var request = new HttpRequestMessage(HttpMethod.Get, $"paymentGateway/GetIndpAdjusterInfobyUserId/{adjusterId}");
        //    //var response = await apiClient.GetAsync(request, HttpCompletionOption.ResponseHeadersRead).ConfigureAwait(false);

        //    //return Json(dataAccessResult.Model);
        //}
    }
}
