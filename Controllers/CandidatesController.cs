using CandidateRatingSystem.Models;
using CandidateRatingSystem.Service;
using CandidateRatingSystem.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApplicantRatingSystem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CandidatesController : ControllerBase
    {
        private readonly CandidateDBContext _context;
        private readonly GitHubService _gitHubService;

        public CandidatesController(CandidateDBContext context, GitHubService gitHubService)
        {
            _context = context;
            _gitHubService = gitHubService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CandidateDTO>>> GetAllCandidates()
        {
            var candidates = await _context.Candidates.ToListAsync();
            var result = new List<CandidateDTO>();

            foreach (var c in candidates)
            {
                int repoCount = 0; //reset per candidate

                var githubUser = ExtractGithubUser(c.GithubLink);

                if (!string.IsNullOrEmpty(githubUser))
                {
                    repoCount = await _gitHubService.GetRepoCountAsync(githubUser);
                }

                result.Add(new CandidateDTO
                {
                    Id = c.Id,
                    FullName = c.FullName,
                    Mobile = c.Mobile,
                    Email = c.Email,
                    Age = c.Age,
                    Address = c.Address,
                    YearsOfExperience = c.YearsOfExperience,
                    Degree = c.Degree,
                    GitHubLink = c.GithubLink,
                    RepoCount = repoCount
                });
            }

            return Ok(result);
        }


    private string? ExtractGithubUser(string? link)
    {
        if (string.IsNullOrWhiteSpace(link))
            return null;

        // If user saved just the username (e.g. "jamesscholes")
        if (!link.StartsWith("http", StringComparison.OrdinalIgnoreCase))
            return link.Trim();

        if (!Uri.TryCreate(link, UriKind.Absolute, out var uri))
            return null;

        var segments = uri.AbsolutePath
            .Trim('/')
            .Split('/', StringSplitOptions.RemoveEmptyEntries);

        return segments.Length > 0 ? segments[0] : null;
    }


        [HttpGet("{id}")]
        public async Task<ActionResult<Candidate>> GetCandidate(int id)
        {
            var candidate = await _context.Candidates.FindAsync(id);
            if (candidate == null) return NotFound();
            return candidate;
        }

        //[HttpGet("githubDetails")]
        //public async Task<ActionResult<IEnumerable<CandidateWithGitHub>>> GetGithubRepos()
        //{
        //    var candidates = await _context.Candidates.ToListAsync();
        //    var result = new List<CandidateWithGitHub>();
        //    try
        //    {
               

        //        foreach (var c in candidates)
        //        {
        //            int repoCount = 0;
        //            if (!string.IsNullOrEmpty(c.GithubLink))
        //            {
        //                repoCount = await _gitHubService.GetRepoCountAsync
        //                    (c.GithubLink);
        //            }

        //            result.Add(new CandidateWithGitHub
        //            {
        //                Id = c.Id,
        //                Name = c.FullName,
        //                GitHubLink = c.GithubLink,
        //                RepoCount = repoCount
        //            });
        //        }
        //    }
        //    catch { 
        //        return StatusCode(500, "Error retrieving GitHub data.");
        //    }

        //    return result;
        //}


        [HttpPost]
        public async Task<ActionResult<Candidate>> PostCandidate(Candidate candidate)
        {

            _context.Candidates.Add(candidate);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCandidate), new { id = candidate.Id }, candidate);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutCandidate(int id, Candidate candidate)
        {
            if (id != candidate.Id)
                return BadRequest();

            // Load existing entity
            var dbCandidate = await _context.Candidates.FindAsync(id);
            if (dbCandidate == null)
                return NotFound();

            // Apply new values safely
            _context.Entry(dbCandidate).CurrentValues.SetValues(candidate);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {

                return Conflict("The record was updated or deleted by another process.");
            }

            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCandidate(int id)
        {
            var candidate = await _context.Candidates.FindAsync(id);
            if (candidate == null) return NotFound();

            _context.Candidates.Remove(candidate);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool candidateExists(int id) =>
            _context.Candidates.Any(e => e.Id == id);
    }

}
