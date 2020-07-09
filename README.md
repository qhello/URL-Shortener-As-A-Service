# URL Shortener As A Service

# 🎯 Goal

Build a robust service to generate a short URL from another URL (the target) with some fancy options.

# 📋 Features

### Creation

It must be possible to type a target URL and retrieve a generated short and persistent URL.

If the target URL has been processed previously with an infinite lifetime (see below), the same short URL should be returned.

Domain name length won't be taken into account to evaluate the shortener algorithm efficiency.

### Authentication

It must be possible to authenticate. But It should be possible to use the service as a guest, anonymously. Robust authentication isn't required. A simple declarative username is ok.

### Listing

The last 5 generated URLs for guest users must be returned. If the user is authenticated, his last 5 URLs are returned in a separated list.

### Lifetime

It must be possible to set a lifetime (in seconds) when creating a short URL. After this delay, this URL must be deleted and must not remain in the database.

# 🔐 Constraints

- Only javascript/typescript is permitted
- API services must be stateless to be scalable (ie. Lifetime can't be handled by a simple setTimeout)
- If you want to use a third-party service, discuss it with us

# 💾 Artifacts

The applicant must give 2 URLs to access to:

- The source code (stored in a **private** git repository)
  - Please give read access to: @chabou @nicobarray @baptistemarchand @rhavenz
  - The repo's README.md should contain:
    - A minimal documentation (or the link to a standalone documentation website)
    - A timeline of your work sessions: what has been done and when
- The URL of a running hosted api demo

# 🎁 Bonuses

- Use Typescript
- Use GraphQL
- Use a robust (JWT, Google OAuth, Auth0, Basic Auth, etc) authentication mechanism
- Provide an Atom/RSS feed endpoint
- Build a minimal front website/SPA to interact with this API
