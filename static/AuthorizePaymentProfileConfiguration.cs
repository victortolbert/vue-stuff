namespace Exemplar.Data.Configuration
{
    using Exemplar.Domain;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    public class AuthorizePaymentProfileConfiguration : IEntityTypeConfiguration<AuthorizePaymentProfile>
    {
        public void Configure(EntityTypeBuilder<AuthorizePaymentProfile> builder)
        {
            builder.ToTable("AuthorizePaymentProfile", "dbo");
            builder.HasKey(o => o.Id);

            builder.Property(t => t.CustomerProfileId).IsRequired();
            builder.Property(t => t.CustomerPaymentProfileId).IsRequired();
            builder.Property(t => t.MerchantCustomerId).IsRequired();
            builder.Property(t => t.DefaultPaymentProfile).IsRequired();
            builder.Property(t => t.CreatedBy).IsRequired();
            builder.Property(t => t.CreatedOn).HasColumnType("datetime").IsRequired();
        }
    }
}
