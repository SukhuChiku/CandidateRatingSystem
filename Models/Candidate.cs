using System.ComponentModel.DataAnnotations;

namespace CandidateRatingSystem.Models
{
    public class Candidate
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string FullName { get; set; }

        [Required]
        [MaxLength(16)]
        public string Mobile { get; set; }

        [Required]
        [MaxLength(100)]
        public string Email { get; set; }

        [Required]
        public int Age { get; set; }

        [Required]
        [MaxLength(100)]
        public string Address { get; set; }
        [Required]
        public int YearsOfExperience { get; set; }

        [Required]
        [MaxLength(20)]
        public string Degree { get; set; }

        [Required]
        [MaxLength(120)]
        public string GithubLink { get; set; }
    }
}
