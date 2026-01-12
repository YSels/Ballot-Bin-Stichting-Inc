namespace BallotBinMVC.Models
{
    public class TableAfvaldetectie
    {
        public string Id { get; set; } = null!;
        public DateTime Tijd { get; set; }
        public string AfvalTeller { get; set; } = null!;
        public string PrullenbakStatus { get; set; } = null!;
        public string UserId { get; set; } = null!;
    }
}
