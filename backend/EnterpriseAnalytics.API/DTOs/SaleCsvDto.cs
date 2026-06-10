namespace EnterpriseAnalytics.API.DTOs
{
    public class SaleCsvDto
    {
        public string ProductName {get;set;} = string.Empty;
        public int Quantity {get;set;}
        public decimal TotalAmount {get; set;}
        public string SaleDate { get; set; } = string.Empty;
    }
}