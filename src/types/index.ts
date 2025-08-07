export interface CandidateProfile {
  jobTitle: string;
  skills: string;
  experience?: string;
  location?: string;
}

export interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  matchScore: number;
  position: number;
}

export interface SerpApiResult {
  organic_results?: Array<{
    title: string;
    link: string;
    snippet: string;
    position: number;
  }>;
}

export interface ApiKeyValidation {
  isValid: boolean;
  error?: string;
}

export interface ApiError {
  code: string;
  message: string;
  statusCode?: number;
  retryAfter?: number; // For rate limiting
}

export interface RateLimitInfo {
  remaining: number;
  resetTime: number;
  limit: number;
}

export interface SearchOptions {
  maxResults?: number;
  timeout?: number;
  retryAttempts?: number;
}
