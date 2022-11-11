## /users 

  ### Create an Account
  ```
  POST - /users
  Request Parameters
  {"user": {"email": "abc@123.com", "password": "super-secret", "display_name": "Superman"}}
  Response
  {"id": 1, "display_name": "Superman"}
  NOTE: The Authorization response header will contain the JWT Bearer token for the newly created user.
  ```

  ### Sign In
  ```
  POST - /users/sign_in
  Request Parameters
  {"user": {"email": "abc@123.com", "password": "super-secret"}}
  Response
  {"id": 1, "display_name": "Superman"}
  NOTE: The Authorization response header will contain the JWT Bearer token for the newly created user.
  ```
  
## /posts

  ### Posts Index - Paginated
  ```
  GET - /posts
  Request Parameters
  /posts?page=1
  Response
  {"posts": [], "meta": {"current_page": 1, "per_page": 30, "total_entries": 0}}
  ```

  ### Post Details
  ```
  GET - /posts/post_id
  Request Parameters
  /posts/1
  Response
  {"post": {"id": 1, "title": "A new post", "body": "Something very interesting!", "created_at": "2021-11-09T16:04:51.895Z", "updated_at": "2021-11-09T16:04:51.895Z", "comment_count": 1, "user": {"id": 1, "display_name": "Superman"}}}
  ```
  
  ### Post Comments - Paginated
  ```
  GET - /posts/post_id/comments
  Request Parameters
  /posts/1/comments?page=1
  Response
  {"comments": [{"id": 1, "content": "A comment on the first post!", "created_at": "2021-11-09T17:04:51.895Z", "updated_at": "2021-11-09T17:04:51.895Z", "user": {"id": 1, "display_name": "Superman"}}], "meta": {"current_page": 1, "per_page": 30, "total_entries": 1} }
  ```

  ### Create a Post - Protected
  ```
  POST - /posts
  Request Headers
  Authorization: Bearer 123abc......
  Request Parameters
  {"post": {"title": "My post from React", "body": "Lorem ipsum..."}}

  Response
  {"post": {"id": 2, "title": "My post from React", "body": "Lorem ipsum...", "created_at": "2021-11-09T16:04:51.895Z", "updated_at": "2021-11-09T16:04:51.895Z", "user": {"id": 1, "display_name": "Superman"}}}
  ```

  ### Edit an Existing Post - Protected
  ```
  PATCH - /posts/post_id
  Request Headers
  Authorization: Bearer 123abc......
  Request Parameters
  {"post": {"title": "My Edited Post", "body": "Some new content!"}}

  Response
  {"post": {"id": 2, "title": "My Edited Post", "body": "Some new content!", "created_at": "2021-11-09T16:04:51.895Z", "updated_at": "2021-11-09T16:09:13.895Z", "user": {"id": 1, "display_name": "Superman"}}}
  ```

  ### Delete a Post - Protected
  ```
  DELETE - /posts/post_id
  Request Headers
  Authorization: Bearer 123abc......
  Response
  HTTP 204
  ```
  
## /comments

  ### Create a Comment - Protected
  ```
  POST - /comments
  Request Headers
  Authorization: Bearer 123abc......
  Request Parameters
  {"comment": {"post_id": 1, "content": "My interesting thought on your post..."}}

  Response
  {"comment": {"id": 6, "content": "My interesting thought on your post...", "created_at": "2021-11-09T16:04:51.895Z", "updated_at": "2021-11-09T16:04:51.895Z", "user": {"id": 1, "display_name": "Superman"}}}
  ```

  ### Edit an Existing Comment - Protected
  ```
  PATCH - /comment/comment_id
  Request Headers
  Authorization: Bearer 123abc......
  Request Parameters
  {"comment": {"contents": "My comment edited"}}

  Response
  {"comment": {"id": 6, "content": "My comment edited", "created_at": "2021-11-09T16:04:51.895Z", "updated_at": "2021-11-09T16:07:45.895Z", "user": {"id": 1, "display_name": "Superman"}}}
  ```

  ### Delete a Comment - Protected
  ```
  DELETE - /comments/comment_id
  Request Headers
  Authorization: Bearer 123abc......
  Response
  HTTP 204
  ```
