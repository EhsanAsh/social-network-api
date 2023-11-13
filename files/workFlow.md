![Ehsan@sh](./Favicon.ico)

# User Story

>AS A social media startup,
>*I WANT* an API for my social network that uses a NoSQL database,
>*SO THAT* my website can handle large amounts of unstructured data.

---

# Acceptance Criteria

### GIVEN a social network API,
- *WHEN I* enter the command to invoke the application,
*THEN* my server is started and the Mongoose models are synced to the MongoDB database.
- *WHEN I* open API GET routes in Insomnia for users and thoughts,
*THEN* the data for each of these routes is displayed in a formatted JSON.
- *WHEN I* test API POST, PUT, and DELETE routes in Insomnia,
*THEN* I am able to successfully create, update, and delete users and thoughts in my database.
- *WHEN I* test API POST and DELETE routes in Insomnia,
*THEN* I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list.

---

# Algorithm:

1. Initialize the Node.js project with Express.js and Mongoose.
2. Define Mongoose models for User, Thought, and Reaction according to the guidelines.
3. Implement API routes for handling CRUD operations on users and thoughts.
4. Test API endpoints using Insomnia to ensure they meet the acceptance criteria.

---

## Tasks:

1. Set up the Node.js environment with Express.js and Mongoose.
2. Create Mongoose schemas for User, Thought, and Reaction.
3. Implement virtuals for `friendCount` in User schema and `reactionCount` in Thought schema.
4. Develop API endpoints for User and Thought models.
5. Implement the logic for adding and removing friends and reactions.
6. Write middleware for deleting a user's associated thoughts when the user is deleted (BONUS).
7. Test all API routes using Insomnia.
8. Ensure error handling is robust and user-friendly.
9. Document the API endpoints with request and response examples.

---

## Pattern Recognition:

- CRUD operations are consistent across User and Thought models.
- Reactions are subdocuments within the Thought model, not standalone models.
- Friend relationships are managed within the User model as self-references

---

## PseudoCode:

```javascript
// Initialize Express app and Mongoose connection

// Define User Schema
const userSchema = new mongoose.Schema({
  // ... schema properties
});
// Define virtual for friendCount
// ...

// Define Thought Schema
const thoughtSchema = new mongoose.Schema({
  // ... schema properties
});
// Define virtual for reactionCount
// ...

// Define Reaction Schema (subdocument of Thought)
const reactionSchema = new mongoose.Schema({
  // ... schema properties
});

// API Routes
// ... (implement CRUD operations for /api/users and /api/thoughts)
// ... (implement friend and reaction addition and removal)

// Start server
// ...
