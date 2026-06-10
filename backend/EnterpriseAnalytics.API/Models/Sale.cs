namespace EnterpriseAnalytics.API.Models
{
    public class Sale
    {
        public int Id {get;set;}
        public string ProductName {get;set;} = string.Empty;
        public int Quantity {get;set;}
        public decimal TotalAmount {get; set;}
        public DateTime SaleDate {get; set;}
    }
}