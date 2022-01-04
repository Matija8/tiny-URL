# TinyURL

## Part 1

    1. What is a URL shortening system?

        URL shortening is used to create shorter aliases ("short links") for
        long URLs. Users are redirected🔄 to the original URL when they enter
        these short links into their browser.


    2. What's the main value? Who needs such a system and why?

        URL shorteners value:
            1) Make links that are easier to share.
               Short links save a lot of space when displayed, printed, messaged,
               or tweeted🐣. Users are less likely to mistype shorter URLs.
            2) They let businesses track marketing campaigns and other incoming traffic.
            3) Shorter links seem more trustworthy.

        Both businesses and the public have a use for this service, but
        businesses more so since the analytics they get from it can help them
        make important strategic decisions and increase revenue💸.


    3. Describe The main mechanism of work👨‍🏭 and system components.

        The main mechanism of work is an api server that has two routes:
           1) Get the long url corresponding to a short url
           2) Create a short url for a long url

        We can and should have more then one api server since this system will
        come under a heavy load. This info wasn't provided in the assignment,
        but can be deduced since this is a common system design interview
        question. Also it's the holidays and I didn't want to bother people with
        unnecessary emails🎉🎇. I'm also assuming we don't want to expire these
        links, but if we did we could add an expiration date field to our db
        collection and just check the expiration date when getting them and also
        run a daily cron job to see how many links have expired (or something
        like that) and delete those.

        The tiers of the architecture are:

            1) Client tier - Our angular app This scales easily since we can
            prerender the app and host it on a cdn (Amazon CloudFront, Google
            Cloud CDN...)

            1) Server tier - Our api
               This can also be pretty easily scaled since
               are api is stateless.

            2) Database tier - This is the tricky part. At a certain point
            vertical scaling becomes impractical, and later even impossible, so
            we need to think of a distributed solution. We can use sharding on
            the long urls as a sharding key, since the long urls should be
            unique and have a unique corresponding short url. We can traffic the
            requests to correct servers by using a load balancer

        We can also add a caching layer and a rate limiter.

    4. What do you think are the main challenges in implementing and running the
       system

        The main challenges are regarding scalability, availability and fault
        tolerance. Without considering scalability issues, the system is
        relatively easy to implement. Because of this you must have multiple
        database servers. This in turn means we now have to think about
        consistency of the data. How do you consistently create short urls and
        keep the {long url -> short url} function bijective? You would have to
        check before writing to the server atomically. Also if you have a lot of
        short urls in the database you might have a high number of collisions
        when generating short urls.


    5. Try to suggest some ideas for advanced features.

        - Allow users to make their own profiles to track the links they
          shortened and how much those links were used. Not only the admins.
        - Allow organizations to group urls by certain parameters,
            so they can later extract better analytics
            (grouping types of urls, comparing the groups...)
        - Permissions based on location of person accessing the link content
        - Analytics based on location of person accessing the link content

## Part 2

The system was implemented in Angular 13 for the client side and node.js for the
server side. A mongodb docker image was used for the database to enable easier
testing and later deployment.

### Tested on/Requirements:

- Node.js version 14
- npm version 8
- Docker version 20

### Instructions:

To run the app on linux/mac do:

- `cd` to this directory
- `./install_dependencies.sh`
- `./start-all.sh`

Client pages are [main](http://localhost:4200/) and
[admin](http://localhost:4200/admin). Since this website will be accessible to
the public we will be using prerendering to have better SEO. Admin page requires
no authentication/authorization as per problem spec.

## Resources used

- [Educative article](https://www.educative.io/courses/grokking-the-system-design-interview/m2ygV4E81AR)
- [Geeks for geeks article](https://www.geeksforgeeks.org/system-design-url-shortening-service/)
- [Medium article](https://medium.com/@sandeep4.verma/system-design-scalable-url-shortener-service-like-tinyurl-106f30f23a82)
- [System Design Interview - An insider's guide, Second Edition - Alex Xu](https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF)
