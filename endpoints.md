Endpoints

| Id  | Method   | Path                      | Description                                            |
| --- | -------- | ------------------------- | ------------------------------------------------------ |
| 1   | get      | /                         | Homepage                                               |
| 2   | get      | /card/day/details         | show info about the card of the day(random)            |
| 3   | get      | /card/list                | show card list (select name, number)                   |
| 4   | get      | /card/reading             | show 3 cards with keywords (optional long description) |
| 5   | post     | /card/list/edit           | edit cards (only admin)                                |
| 6   | post     | /card/list/delete         | delete cards (only admin)                              |
| 7   | post     | /login                    | login                                                  |
| 8   | post     | /signup                   | register new user                                      |
| 9   | get      | /profile/:id              | show user profile                                      |
| 10  | post     | /profile/:id/edit         | edit user’s profile                                    |
| 11  | get/post | /forum                    | read and send messages                                 |
| 12  | get      | /admin                    | homepage for admin to update/delete cards,             |
|     |          |                           | users, forum messages                                  |
| 13  | post     | /forum/:id/delete         | delete messages (user who wrote message or admin)      |
| 14  | post     | /profile/:id/edit/delete/ | delete user’s profile                                  |
| 15  | post     | /contactus                | message admin (suggestions, bugs, etc.)                |
