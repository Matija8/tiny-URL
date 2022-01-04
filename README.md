# TinyURL

## Part 1

    1. What is a URL shortening system?

        URL shortening is used to create shorter aliases ("short links") for
        long URLs. Users are redirected to the original URL when they enter
        these short links into their browser.


    2. What's the main value? Who needs such a system and why?

        URL shorteners:
            1) Make links that are easier to share.
               Short links save a lot of space when displayed, printed, messaged,
               or tweeted.
            2) They let businesses track marketing campaigns and other incoming traffic.
            3) Users are less likely to mistype shorter URLs.


    3. Describe The main mechanism of work and system components.

        The main mechanism of work is... TODO


    4. What do you think are the main challenges in implementing and running the
       system

        The main challenges are regarding scalability. Without considering
        scalability issues, the system is relatively easy to implement.
        TODO


    5. Try to suggest some ideas for advanced features.

        TODO
        - Allow users to make their own profiles to track the links they
          shortened and how much those links were used. Not only the admins.
        - Allow organizations to group urls by certain parameters,
            so they can later extract better analytics
            (grouping types of urls, comparing the groups...)

## Part 2

The system was implemented in Angular 13 for the client side and node.js for the
server side. A mongodb docker image was used for the database to enable easier
testing and later deployment.

### Tested on/Requirements:

- Node.js version 14
- npm version 8
- Docker version 20

Client pages are [main](http://localhost:4200/) and [admin](http://localhost:4200/admin). Since this website will be accessible to the
public we will be using prerendering to have better SEO. Admin page requires no
authentication/authorization as per problem spec.

## Resources used

- [Educative article](https://www.educative.io/courses/grokking-the-system-design-interview/m2ygV4E81AR)
- [Geeks for geeks article](https://www.geeksforgeeks.org/system-design-url-shortening-service/)
- [Medium article](https://medium.com/@sandeep4.verma/system-design-scalable-url-shortener-service-like-tinyurl-106f30f23a82)
- [System Design Interview - An insider's guide, Second Edition - Alex Xu](https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF)
