using Microsoft.EntityFrameworkCore;

namespace CandidateRatingSystem.Models
{
    public class CandidateDBContext : DbContext
    {
        public CandidateDBContext(DbContextOptions<CandidateDBContext> options) : base(options)
        {
        }

        public DbSet<Candidate> Candidates { get; set; }
    }
}
