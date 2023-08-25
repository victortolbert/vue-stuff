namespace Exemplar.Data.Configuration
{
    using Exemplar.Domain;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    public class AuthorizePaymentResponseCodeConfiguration : IEntityTypeConfiguration<AuthorizePaymentResponseCode>
    {
        public void Configure(EntityTypeBuilder<AuthorizePaymentResponseCode> builder)
        {
            builder.ToTable("AuthorizePaymentResponseCode", "dbo");
            builder.HasKey(o => o.Id);

            builder.Property(t => t.Description).IsRequired();
        }
    }
}
