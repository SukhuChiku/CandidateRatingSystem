namespace CandidateRatingSystem.Service
{
    public class GitHubService
    {
        private readonly HttpClient _http;

        public GitHubService(HttpClient http)
        {
            _http = http;
        }

        public async Task<int> GetRepoCountAsync(string username)
        {
            var url = $"https://api.github.com/users/{username}";
            var response = await _http.GetAsync(url);

            if (!response.IsSuccessStatusCode)
                return 0;

            var json = await response.Content.ReadFromJsonAsync<GitHubUserResponse>();

            return json?.public_repos ?? 0;
        }
    }

    public class GitHubUserResponse
    {
        public int public_repos { get; set; }
    }
}
