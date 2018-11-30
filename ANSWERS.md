<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?

Sessions is a way of persisting authentication across server calls. When a user logs in to a site, we need some way for the server to remember that user. Browsing a web site consists of many distinct api calls, each of which needs to be authenticated, otherwise we open ourselves up to the possbility of malicious parties being able to access routes we don't want them to. Having the user reenter their password every call would be terrible UX and having the browser simply store the user's password could be less secure and would be inefficient for the server. Thus, we have sessions, which consist of giving the user a cookie (basically an access tokey) that they can send with every call which is effecient for the server, more secure for the client, and which allow the server to log people out remotely.

2. What does bcrypt do to help us store passwords in a secure manner.

Bcrypt hashes passwords, which means that it creates an string which is not the password, and from which the password cannot be easily derived, but which can always be recreated given the correct password. This makes it possible to store a way of verifying passwords without actually storing the passwords.

3. What does bcrypt do to slow down attackers?

If a hacker gains access to the server, if the passwords were stored in plain text it would be trivial for them to use that to log into everyones' accounts and steal all sorts of information, etc, etc, etc. But hashing the passwords (for example with bcrypt), means that instead of simply having the passwords, attackers will be forced to "crack" the password by guessing many, many combinations. For a good password this can take a very long time.

4. What are the three parts of the JSON Web Token?

The header, the payload, and the signature.
