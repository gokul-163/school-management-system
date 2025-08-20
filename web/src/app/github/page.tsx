'use client';
import Protected from '@/components/Protected';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import { FiGithub, FiStar, FiGitBranch, FiEye, FiCalendar, FiMapPin, FiLink, FiUsers } from 'react-icons/fi';

interface GitHubProfile {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string;
  blog: string;
  created_at: string;
  html_url: string;
}

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string;
  updated_at: string;
  fork: boolean;
}

export default function GitHubPage() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState('');

  const fetchGitHubData = async (username: string) => {
    if (!username.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Fetch profile
      const profileResponse = await fetch(`https://api.github.com/users/${username}`);
      if (!profileResponse.ok) {
        throw new Error('User not found or API rate limit exceeded');
      }
      const profileData = await profileResponse.json();
      setProfile(profileData);

      // Fetch repositories
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
      if (reposResponse.ok) {
        const reposData = await reposResponse.json();
        setRepositories(reposData);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch GitHub data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchGitHubData(username);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Protected>
      <Layout>
        <div className="p-6 max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">GitHub Profile</h1>

          {/* Search Form */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Search GitHub User</h2>
            <form onSubmit={handleSubmit} className="flex gap-4">
              <input
                type="text"
                placeholder="Enter GitHub username (e.g., your-username)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50 flex items-center gap-2"
              >
                <FiGithub />
                {loading ? 'Loading...' : 'Search'}
              </button>
            </form>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {loading && (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading GitHub data...</p>
              </div>
            </div>
          )}

          {profile && !loading && (
            <>
              {/* Profile Section */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex items-start gap-6">
                  <img
                    src={profile.avatar_url}
                    alt={profile.name || profile.login}
                    className="w-24 h-24 rounded-full border-4 border-gray-200"
                  />
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {profile.name || profile.login}
                    </h2>
                    {profile.login !== profile.name && (
                      <p className="text-gray-600 text-lg">@{profile.login}</p>
                    )}
                    {profile.bio && (
                      <p className="text-gray-700 mt-2">{profile.bio}</p>
                    )}
                    
                    <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
                      {profile.location && (
                        <div className="flex items-center gap-1">
                          <FiMapPin />
                          {profile.location}
                        </div>
                      )}
                      {profile.blog && (
                        <div className="flex items-center gap-1">
                          <FiLink />
                          <a href={profile.blog} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {profile.blog}
                          </a>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <FiCalendar />
                        Joined {formatDate(profile.created_at)}
                      </div>
                    </div>

                    <div className="flex gap-6 mt-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">{profile.public_repos}</div>
                        <div className="text-sm text-gray-600">Repositories</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">{profile.followers}</div>
                        <div className="text-sm text-gray-600">Followers</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">{profile.following}</div>
                        <div className="text-sm text-gray-600">Following</div>
                      </div>
                    </div>

                    <a
                      href={profile.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-4 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      <FiGithub />
                      View on GitHub
                    </a>
                  </div>
                </div>
              </div>

              {/* Repositories Section */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800">Recent Repositories</h2>
                </div>
                
                <div className="p-6">
                  {repositories.length > 0 ? (
                    <div className="grid gap-4">
                      {repositories.map((repo) => (
                        <div key={repo.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-gray-800">
                                  <a 
                                    href={repo.html_url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="hover:text-blue-600"
                                  >
                                    {repo.name}
                                  </a>
                                </h3>
                                {repo.fork && (
                                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                    Fork
                                  </span>
                                )}
                              </div>
                              {repo.description && (
                                <p className="text-gray-600 text-sm mb-3">{repo.description}</p>
                              )}
                              
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                {repo.language && (
                                  <span className="flex items-center gap-1">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                    {repo.language}
                                  </span>
                                )}
                                <span className="flex items-center gap-1">
                                  <FiStar />
                                  {repo.stargazers_count}
                                </span>
                                <span className="flex items-center gap-1">
                                  <FiGitBranch />
                                  {repo.forks_count}
                                </span>
                                <span className="flex items-center gap-1">
                                  <FiEye />
                                  {repo.watchers_count}
                                </span>
                                <span className="flex items-center gap-1">
                                  <FiCalendar />
                                  Updated {formatDate(repo.updated_at)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">No repositories found</p>
                  )}
                </div>
              </div>
            </>
          )}

          {!profile && !loading && !error && (
            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded">
              Enter a GitHub username above to view their profile and repositories.
            </div>
          )}
        </div>
      </Layout>
    </Protected>
  );
}
