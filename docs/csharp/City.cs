// Given the following Model (City.cs)
[Table("cities")]
class City : BaseModel
{
    [PrimaryKey("id")]
    public int Id { get; set; }

    [Column("name")]
    public string Name { get; set; }

    [Column("country_id")]
    public int CountryId { get; set; }

    //... etc.
}
