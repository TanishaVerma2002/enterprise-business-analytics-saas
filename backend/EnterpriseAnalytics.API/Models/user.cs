namespace EnterpriseAnalytics.API.Models
{
    public class User
    {
        public int ID  {get; set;}
        public string Name  {get; set;} = string.Empty;
        public string email {get; set;} = string.Empty;
        public string PasswordHash {get; set;} = string.Empty;
        public string Role {get; set;} = "Viewer";
    }
}