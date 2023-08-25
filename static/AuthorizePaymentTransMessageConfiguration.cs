namespace Exemplar.Data.Configuration
{
    using Exemplar.Domain;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    public class AuthorizePaymentTransMessageConfiguration : IEntityTypeConfiguration<AuthorizedPaymentTransaction>
    {
        public void Configure(EntityTypeBuilder<AuthorizePaymentTransMessage> builder)
        {
            builder.ToTable("AuthorizePaymentTransMessage", "dbo");
            builder.HasKey(o => o.Id);

            builder.Property(t => t.TransId).IsRequired();
            builder.Property(t => t.ResponseCode).IsRequired();
            builder.Property(t => t.AuthCode).IsRequired();
            builder.Property(t => t.AvsResultCode).IsRequired();
            builder.Property(t => t.CvvResultCode).IsRequired();
            builder.Property(t => t.CavvResultCode).IsRequired();
            builder.Property(t => t.RefTransId).IsRequired();
            builder.Property(t => t.AccountNumber).IsRequired();
            builder.Property(t => t.AccountType).IsRequired();
            builder.Property(t => t.TransHashSha2).IsRequired();
            builder.Property(t => t.TestRequest).IsRequired();
            builder.Property(t => t.CustomerProfileId).IsRequired();
            builder.Property(t => t.CustomerPaymentProfileId).IsRequired();
            builder.Property(t => t.SupplementalDataQualificationIndicator).IsRequired();
            builder.Property(t => t.NetworkTransId).IsRequired();
            builder.Property(t => t.RefId).IsRequired();
            builder.Property(t => t.AuthorizedAmount).IsRequired();
            builder.Property(t => t.Invoices).IsRequired();
            builder.Property(t => t.Claims).IsRequired();
            builder.Property(t => t.CreatedBy).IsRequired();
            builder.Property(t => t.CreatedOn).IsRequired();
        }
    }
}
