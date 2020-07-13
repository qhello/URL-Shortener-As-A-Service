# URL Shortener as a Service (USAAS)

Technical project by Quentin Hello, for Ambler.

As asked in the [requirements](https://github.com/qhello/URL-Shortener-As-A-Service/blob/master/REQUIREMENTS.md), please find below the artifacts & work timeline.

## Artifacts

API documentation: https://documenter.getpostman.com/view/507654/T17M767v

Working API (probably won't leave it forever!): https://usaas.quentinhello.com

## Work timeline

### Thursday, July 9th

- Morning: Created git repository, start coding first endpoints. **2 hours**

### Friday, July 10th

- Morning: Finalize & commit first 2 endpoints. **1 hour**
- Afternoon: Add JWT middleware, support signed user in post method, add getShortUrls endpoint. **2 hours**
- Evening: Add CI to deploy to AWS upon release creation, simplify code architecture to switch from "multi" to "single" package logic, as I'm not expecting to be able to do some frontend in the end. Add "todo" memos in code. **2 hours**

### Monday, July 13th

- Midnight: Support potential conflict on shortId generation, support lifetime parameter. **1 hour**
