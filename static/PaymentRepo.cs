namespace Exemplar.Api.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Exemplar.Data;
    using Exemplar.Domain;
    using Microsoft.EntityFrameworkCore;

    public class PaymentRepo
    {
        private ExemplarContext context;

        public PaymentRepo(ExemplarContext context)
        {
            this.context = context;
        }

        public async Task<CustomerPaymentProfile> GetPaymentInfo(int id)
        {
            return await context.CustomerPaymentProfile.Where(x => x.MerchantCustomerId == id).FirstOrDefaultAsync();
        }

        public async Task<CustomerPaymentProfile> InsertAsync(CustomerPaymentProfile paymentProfile)
        {
            context.CustomerPaymentProfile.Add(paymentProfile);
            await context.SaveChangesAsync();
            return paymentProfile;
        }
    }
}
