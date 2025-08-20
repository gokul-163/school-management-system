'use client';
import { useState, useEffect } from 'react';
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

interface GitHubWidgetProps {
  username?: string;
  showRepositories?: boolean;
  maxRepos?: number;
}

export default function GitHubWidget({ 
  username = 'your-username', 
  showRepositories = true, 
  maxRepos = 5 
}: GitHubWidgetProps) {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (username && username !== 'your-username') {
      fetchGitHubData(username);
    }
  }, [username]);

  const fetchGitHubData = async (username: string) => {
    if (!username.trim() || username === 'your-username') return;
    
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

      // Fetch repositories if enabled
      if (showRepositories) {
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=${maxRepos}`);
        if (reposResponse.ok) {
          const reposData = await reposResponse.json();
          setRepositories(reposData);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch GitHub data');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (username === 'your-username') {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
        Please update the username prop in GitHubWidget component to display your GitHub profile.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600 text-sm">Loading GitHub data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Profile Section */}
      <div className="flex items-start gap-4 mb-6">
        <img
          src={profile.avatar_url}
          alt={profile.name || profile.login}
          className="w-16 h-16 rounded-full border-2 border-gray-200"
        />
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-800">
            {profile.name || profile.login}
          </h3>
          {profile.login !== profile.name && (
            <p className="text-gray-600 text-sm">@{profile.login}</p>
          )}
          {profile.bio && (
            <p className="text-gray-700 text-sm mt-1 line-clamp-2">{profile.bio}</p>
          )}
          
          <div className="flex gap-4 mt-3 text-xs text-gray-600">
            {profile.location && (
              <div className="flex items-center gap-1">
                <FiMapPin />
                {profile.location}
              </div>
            )}
            <div className="flex items-center gap-1">
              <FiUsers />
              {profile.followers} followers
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-xl font-bold text-gray-800">{profile.public_repos}</div>
          <div className="text-xs text-gray-600">Repos</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-gray-800">{profile.followers}</div>
          <div className="text-xs text-gray-600">Followers</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-gray-800">{profile.following}</div>
          <div className="text-xs text-gray-600">Following</div>
        </div>
      </div>

      {/* Repositories */}
      {showRepositories && repositories.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Recent Repositories</h4>
          <div className="space-y-3">
            {repositories.slice(0, maxRepos).map((repo) => (
              <div key={repo.id} className="border border-gray-200 rounded p-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-800 text-sm">
                      <a 
                        href={repo.html_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-blue-600"
                      >
                        {repo.name}
                      </a>
                    </h5>
                    {repo.description && (
                      <p className="text-gray-600 text-xs mt-1 line-clamp-1">{repo.description}</p>
                    )}
                    
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                      {repo.language && (
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
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
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View Profile Link */}
      <a
        href={profile.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 mt-4 bg-gray-900 text-white px-3 py-2 rounded text-sm hover:bg-gray-800 transition-colors"
      >
        <FiGithub />
        View Profile
      </a>
    </div>
  );
}
