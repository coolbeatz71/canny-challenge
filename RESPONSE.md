**Customer 1:** When I open the application, my posts do not load and all I see is a 'server error'.

- Trying to detect the origin of the `server error`, I realized it was surely from the authenticateUser function. I had to replace each hardcoded errors message by the original error from the catch. I found that the decoded token was broken. There was a typo on the `name` property (nayme), than I used the `https://jwt.io/` to encode a new token using the secret code from `SingleSignOnKey`.

**Customer 2:** When I click on "Top" or "Old", the selector does not update with my new selection.

- That was the easiest: As the sort reducer was returning the wrong state. The redux state must always be immutable

**Customer 3:** When I sort by "Top", the number one post only has 81 votes when I know the post titled "Custom Statuses" has over 300 votes!

- The issue was caused by the fact that we were slicing the array before we sort it. We needed to first sort the original posts array and then slice to get the right pagination result.

**Customer 4:** When I page through posts, although the posts are changing, the vote count in the top left corner does not match the total count of votes of the displayed posts.

- the issue was caused by the fact that we were dispatching the recountVotes action over the initial state (the previous state). so every time we fetchPosts when navigating it was calculating the total votes from the previous page.

- The second problem is that we were dispatching recountVotes an many places on the components, sometimes without passing it the right params, I found that It was efficient to dispatch it only in one place: inside the fetchingPost() action.
