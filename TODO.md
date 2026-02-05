# TODO: Next Steps for CLI Integration

## Immediate Tasks

### 1. Portal Team - Backend API Implementation
**Priority: HIGH**

Reference: `cli/PORTAL_API_REQUIREMENTS.md`

- [ ] Install Clerk backend SDK in portal project
- [ ] Create JWT validation middleware
- [ ] Implement `POST /api/submissions/submit` endpoint
- [ ] Implement `GET /api/submissions/status` endpoint
- [ ] Implement `GET /api/submissions/:id` endpoint
- [ ] Add input validation for all endpoints
- [ ] Add error handling and logging
- [ ] Add rate limiting (recommended)

**Estimated Time:** 4-6 hours

### 2. Portal Team - Database Setup
**Priority: HIGH**

Reference: `cli/PORTAL_API_REQUIREMENTS.md` (Database Schema section)

- [ ] Create `submissions` table in Supabase
- [ ] Create indexes for performance
- [ ] Set up Row Level Security (RLS) policies
- [ ] Configure backups
- [ ] Test database operations

**Estimated Time:** 2-3 hours

### 3. Portal Team - Frontend UI
**Priority: MEDIUM**

- [ ] Create device authorization page at `/device`
  - Display device code input field
  - Handle code submission to Clerk
  - Show success/error messages
- [ ] Create submissions list page
  - Display user's submissions
  - Filter by category
  - Show test results
- [ ] Create submission detail page
  - Display code submissions
  - Show test results
  - Display metadata (timestamp, git commit, etc.)
- [ ] Add navigation to submissions in user dashboard

**Estimated Time:** 6-8 hours

### 4. Configuration - Environment Setup
**Priority: HIGH**

- [ ] Create `.env` file in `cli/` directory
- [ ] Add Clerk publishable key
- [ ] Configure portal API URL
- [ ] Configure device auth endpoints
- [ ] Set token expiry (default: 2592000 seconds = 30 days)

**Template:**
```env
PORTAL_API_URL=https://app.silver.dev
CLERK_PUBLISHABLE_KEY=pk_live_...
DEVICE_AUTH_ENDPOINT=https://api.clerk.com/v1/oauth/device
TOKEN_ENDPOINT=https://api.clerk.com/v1/oauth/token
TOKEN_EXPIRY_SECONDS=2592000
```

**Estimated Time:** 30 minutes

### 5. Testing - End-to-End Validation
**Priority: HIGH**

Once portal API is implemented:

- [ ] Test login flow
  - Run `npm run cli:login`
  - Verify device code is displayed
  - Complete authorization in browser
  - Verify token is stored locally
- [ ] Test submission flow
  - Complete a category (e.g., strings)
  - Run `npm run cli:submit strings`
  - Verify submission appears in portal
- [ ] Test status command
  - Run `npm run cli:status`
  - Verify submissions are displayed correctly
- [ ] Test error scenarios
  - Modified test files (should reject)
  - Failed tests (should reject)
  - Network errors (should handle gracefully)
- [ ] Test token refresh
  - Wait for token to expire (or manually adjust)
  - Verify automatic refresh works

**Estimated Time:** 3-4 hours

## Nice-to-Have Enhancements

### 6. CLI Improvements
**Priority: LOW**

- [ ] Add `--verbose` flag for detailed logging
- [ ] Add `--dry-run` flag to test without submitting
- [ ] Add progress bars for file uploads
- [ ] Add submission confirmation prompt
- [ ] Cache test results to avoid re-running on network errors
- [ ] Add `--force` flag to allow resubmission

**Estimated Time:** 4-6 hours

### 7. Portal Features
**Priority: LOW**

- [ ] Email notifications on submission
- [ ] Leaderboard/statistics page
- [ ] Code comparison tool (compare solutions)
- [ ] Automated code review/feedback
- [ ] Export submissions to PDF
- [ ] Share submission links

**Estimated Time:** Variable (8-20 hours depending on features)

### 8. Documentation
**Priority: MEDIUM**

- [ ] Create video tutorial for candidates
- [ ] Add troubleshooting FAQ
- [ ] Document portal API for future integrations
- [ ] Create admin guide for portal team
- [ ] Add inline code comments where needed

**Estimated Time:** 4-6 hours

## Testing Checklist

### Portal API Testing
- [ ] Test with valid Clerk JWT token
- [ ] Test with expired token (should return 401)
- [ ] Test with invalid token (should return 401)
- [ ] Test duplicate submissions (decide on behavior)
- [ ] Test with invalid category
- [ ] Test with empty solutions array
- [ ] Test with malformed payload
- [ ] Load testing (100+ submissions)

### CLI Testing
- [ ] Test on macOS ✓ (already tested)
- [ ] Test on Linux
- [ ] Test on Windows
- [ ] Test with different git configurations
- [ ] Test with modified test files
- [ ] Test with network outages
- [ ] Test with slow internet connection

### Integration Testing
- [ ] Full workflow from clone to submission
- [ ] Multiple users submitting concurrently
- [ ] Token refresh during submission
- [ ] Handling of large code files (>1MB)

## Deployment

### CLI Distribution
- [ ] Add installation instructions to main README
- [ ] Create release notes
- [ ] Tag version in git (v1.0.0)
- [ ] Announce to candidates

### Portal Deployment
- [ ] Deploy API endpoints to production
- [ ] Run database migrations
- [ ] Update portal frontend
- [ ] Configure Clerk webhooks (if needed)
- [ ] Monitor error logs

## Success Criteria

The implementation is considered complete when:

1. ✅ Candidates can successfully authenticate via device flow
2. ✅ Candidates can submit solutions for all 5 categories
3. ✅ Portal displays submission history accurately
4. ✅ Test integrity verification prevents cheating
5. ✅ All error scenarios are handled gracefully
6. ✅ Documentation is clear and complete
7. ✅ No critical bugs in production

## Timeline Estimate

| Phase | Tasks | Time | Priority |
|-------|-------|------|----------|
| Backend API | Tasks 1-2 | 6-9 hours | HIGH |
| Configuration | Task 4 | 30 min | HIGH |
| Testing | Task 5 | 3-4 hours | HIGH |
| Frontend UI | Task 3 | 6-8 hours | MEDIUM |
| Documentation | Task 8 | 4-6 hours | MEDIUM |
| Enhancements | Tasks 6-7 | 12-26 hours | LOW |

**Critical Path:** Backend API → Configuration → Testing = **10-14 hours**

## Contact

For questions or issues during implementation:
- CLI Code: Review `cli/src/` directory
- API Spec: Review `cli/PORTAL_API_REQUIREMENTS.md`
- Quick Start: Review `CLI_QUICKSTART.md`
- Summary: Review `IMPLEMENTATION_SUMMARY.md`

## Notes

- CLI is **fully implemented** and ready to use once portal API is live
- All core features are working (tested locally)
- Portal API is the blocking dependency for end-to-end testing
- Clerk configuration must be set up before testing authentication
