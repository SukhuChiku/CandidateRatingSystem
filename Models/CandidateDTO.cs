using System.ComponentModel.DataAnnotations;

namespace CandidateRatingSystem.Models
{
    public class CandidateDTO
    {
        public int Id { get; set; }
 
        public string FullName { get; set; }

        public string Mobile { get; set; }
        public string Email { get; set; }

        public int Age { get; set; }

        public string Address { get; set; }
    
        public int YearsOfExperience { get; set; }

        public string Degree { get; set; }

        public string GitHubLink { get; set; }
        public int RepoCount { get; set; }
    }
}
