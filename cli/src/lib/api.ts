import axios, { AxiosInstance } from 'axios';
import { SubmissionPayload, SubmissionResponse, SubmissionStatus } from '../types/index.js';
import { getValidAccessToken } from './auth.js';

/**
 * API client for communicating with the Interview Ready portal
 */
export class PortalAPIClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000, // 30 second timeout
    });
  }

  /**
   * Submits a solution to the portal
   */
  async submitSolution(payload: SubmissionPayload): Promise<SubmissionResponse> {
    try {
      const token = await getValidAccessToken();

      const response = await this.client.post<SubmissionResponse>(
        '/api/submissions/submit',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Server responded with error status
          const status = error.response.status;
          const message = error.response.data?.message || error.message;

          if (status === 401) {
            throw new Error('Authentication failed. Please run "npm run cli:login" again.');
          } else if (status === 409) {
            throw new Error(`Already submitted: ${message}`);
          } else if (status === 422) {
            throw new Error(`Validation error: ${message}`);
          } else {
            throw new Error(`Submission failed: ${message}`);
          }
        } else if (error.request) {
          // Request made but no response
          throw new Error('Failed to connect to portal. Check your internet connection.');
        }
      }

      throw new Error(`Submission failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Gets submission status/history for a user
   */
  async getSubmissionStatus(userId: string): Promise<SubmissionStatus[]> {
    try {
      const token = await getValidAccessToken();

      const response = await this.client.get<SubmissionStatus[]>(
        `/api/submissions/status`,
        {
          params: { user_id: userId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error('Authentication failed. Please run "npm run cli:login" again.');
        } else if (error.request) {
          throw new Error('Failed to connect to portal. Check your internet connection.');
        }
      }

      throw new Error(`Failed to get status: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Gets detailed information about a specific submission
   */
  async getSubmission(submissionId: string): Promise<any> {
    try {
      const token = await getValidAccessToken();

      const response = await this.client.get(
        `/api/submissions/${submissionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error('Authentication failed. Please run "npm run cli:login" again.');
        } else if (error.response?.status === 404) {
          throw new Error('Submission not found.');
        } else if (error.request) {
          throw new Error('Failed to connect to portal. Check your internet connection.');
        }
      }

      throw new Error(`Failed to get submission: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
