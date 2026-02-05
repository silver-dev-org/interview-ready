export type Category = 'strings' | 'lists' | 'stacks' | 'trees' | 'recursion';

export interface AuthConfig {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user_id: string;
  email: string;
}

export interface Config {
  auth?: AuthConfig;
  portal_url: string;
  last_submission?: {
    category: Category;
    timestamp: string;
  };
}

export interface DeviceCodeResponse {
  device_code: string;
  user_code: string;
  verification_uri: string;
  expires_in: number;
  interval: number;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user_id: string;
  email: string;
}

export interface TestResult {
  success_token: string;
  passed_tests: string[];
  test_count: number;
}

export interface SolutionFile {
  problem_id: string;
  file_path: string;
  code: string;
  code_hash: string;
}

export interface SubmissionPayload {
  user_id: string;
  email: string;
  category: Category;
  success_token: string;
  passed_tests: string[];
  test_timestamp: string;
  solutions: SolutionFile[];
  cli_version: string;
  git_commit?: string;
}

export interface SubmissionResponse {
  submission_id: string;
  status: 'accepted' | 'rejected';
  message: string;
  view_url: string;
}

export interface SubmissionStatus {
  id: string;
  category: Category;
  passed_tests: number;
  total_tests: number;
  submitted_at: string;
  status: string;
}
