/**
 * This module defines the main routing logic for the API endpoints of the application. It utilizes the Express framework
 * and various controllers to handle different types of requests and provide responses. Additionally, it incorporates rate
 * limiting and authentication handling for enhanced security and control over incoming requests.
 *
 * The available endpoints include retrieving random facts, generating random waifus, creating random passwords, listing
 * tags, and applying various text transformations like owoify, uwuify, and uvuify. Furthermore, there are endpoints for
 * fetching random quotes and an extensive collection of animated GIFs to express a wide range of emotions and actions.
 *
 * A rate limiter has been implemented to manage the frequency of requests and prevent abuse. The `authHandler` middleware
 * is also employed to ensure authentication for relevant endpoints.
 *
 * Please refer to the documentation link provided in the '/api' endpoint for more details about the available endpoints.
 *
 * @module routes
 */
const { Router } = require('express')
const rateLimit = require('express-rate-limit')
const authHandler = require('./handlers/auth/index')
const randomFacts = require('./controllers/facts/randomFacts')
const getAllTags = require('./controllers/utils/listTags')
const getOwoify = require('./controllers/utils/owoify')
const getUwuify = require('./controllers/utils/uwuify')
const getUvuify = require('./controllers/utils/uvuify')
const randomWaifus = require('./controllers/waifus/randomWaifus')
const randomPasswords = require('./controllers/utils/randomPassword')
const randomQuotes = require('./controllers/quotes/randomQuotes')
const randomKick = require('./controllers/gifs/randomKick')
const randomKill = require('./controllers/gifs/randomKill')
const randomKissu = require('./controllers/gifs/randomKissu')
const randomMidfing = require('./controllers/gifs/randomMidfing')
const randomNuzzle = require('./controllers/gifs/randomNuzzle')
const randomPunch = require('./controllers/gifs/randomPunch')
const randomShoot = require('./controllers/gifs/randomShoot')
const randomSip = require('./controllers/gifs/randomSip')
const randomSleepy = require('./controllers/gifs/randomSleepy')
const randomSmile = require('./controllers/gifs/randomSmile')
const randomStab = require('./controllers/gifs/randomStab')
const randomStare = require('./controllers/gifs/randomStare')
const randomSuicide = require('./controllers/gifs/randomSuicide')
const randomTease = require('./controllers/gifs/randomTease')
const randomWag = require('./controllers/gifs/randomWag')
const randomBite = require('./controllers/gifs/randomBite')
const randomBlush = require('./controllers/gifs/randomBlush')
const randomBonk = require('./controllers/gifs/randomBonk')
const randomBored = require('./controllers/gifs/randomBored')
const randomBully = require('./controllers/gifs/randomBully')
const randomBye = require('./controllers/gifs/randomBye')
const randomChase = require('./controllers/gifs/randomChase')
const randomCheer = require('./controllers/gifs/randomCheer')
const randomDab = require('./controllers/gifs/randomDab')
const randomDie = require('./controllers/gifs/randomDie')
const randomDisgust = require('./controllers/gifs/randomDisgust')
const randomFeed = require('./controllers/gifs/randomFeed')
const randomHi = require('./controllers/gifs/randomHi')
const randomHold = require('./controllers/gifs/randomHold')
const randomHug = require('./controllers/gifs/randomHug')
const randomNope = require('./controllers/gifs/randomNope')
const randomPanic = require('./controllers/gifs/randomPanic')
const randomPat = require('./controllers/gifs/randomPat')
const randomPeck = require('./controllers/gifs/randomPeck')
const randomPoke = require('./controllers/gifs/randomPoke')
const randomPout = require('./controllers/gifs/randomPout')
const randomRun = require('./controllers/gifs/randomRun')
const randomSad = require('./controllers/gifs/randomSad')
const randomShrug = require('./controllers/gifs/randomShrug')
const randomSlap = require('./controllers/gifs/randomSlap')
const randomSmug = require('./controllers/gifs/randomSmug')
const randomThink = require('./controllers/gifs/randomThink')
const randomThumbsup = require('./controllers/gifs/randomThumbsup')
const randomTickle = require('./controllers/gifs/randomTickle')
const randomTriggered = require('./controllers/gifs/randomTriggered')
const randomWave = require('./controllers/gifs/randomWave')
const randomWink = require('./controllers/gifs/randomWink')
const randomYes = require('./controllers/gifs/randomYes')
const randomAngry = require('./controllers/gifs/randomAngry')
const randomCringe = require('./controllers/gifs/randomCringe')
const randomCry = require('./controllers/gifs/randomCry')
const randomCuddle = require('./controllers/gifs/randomCuddle')
const randomDance = require('./controllers/gifs/randomDance')
const randomFacepalm = require('./controllers/gifs/randomFacepalm')
const randomGlomp = require('./controllers/gifs/randomGlomp')
const randomHappy = require('./controllers/gifs/randomHappy')
const randomHighfive = require('./controllers/gifs/randomHighfive')
const randomLaugh = require('./controllers/gifs/randomLaugh')
const randomLick = require('./controllers/gifs/randomLick')
const randomLove = require('./controllers/gifs/randomLove')
const randomLurk = require('./controllers/gifs/randomLurk')
const randomNervous = require('./controllers/gifs/randomNervous')
const randomNom = require('./controllers/gifs/randomNom')
const randomBaka = require('./controllers/gifs/randomBaka')
const userEndpoint = require('./controllers/utils/user')

const router = Router()

// Rate Limiter for Fact || Other endpoints
const Limiter = rateLimit({
  windowMs: 1000, // 1 second
  max: 2, // limit each IP to 5 requests per windowMs
  message: {
    status: 429,
    message: 'Too many requests, please try again later.',
  },
})

// Base
router.get('/', (req, res) => {
  /**
   * Endpoint to verify the basic functionality of the API. Returns a success message if the API is working as expected.
   */
  res.status(200).json({
    message: 'Working',
  })
})

// Base API
router.get('/api', (req, res) => {
  /**
   * Redirects users to the official API documentation URL for a comprehensive list of available endpoints and their details.
   */
  res.redirect('https://docs.waifu.it/list-of-endpoints')
})

// Fact Endpoints
router.get('/fact', Limiter, authHandler, randomFacts)
/**
 * Retrieves a random fact from a predefined collection of facts. Requires authentication and is rate-limited to prevent abuse.
 */

// Waifu Endpoint
router.get('/waifu', Limiter, authHandler, randomWaifus)
/**
 * Returns a randomly generated waifu character. Requires authentication and is rate-limited to manage the frequency of requests.
 */

// Utils Endpoint
router.get('/password', Limiter, authHandler, randomPasswords)
router.get('/alltags', Limiter, authHandler, getAllTags)
router.get('/owoify', Limiter, authHandler, getOwoify)
router.get('/uwuify', Limiter, authHandler, getUwuify)
router.get('/uvuify', Limiter, authHandler, getUvuify)
router.all('/user', Limiter, userEndpoint)
/**
 * Endpoint responsible for handling user-related operations, such as authenticating users through Discord,
 * generating access tokens, and creating new user profiles. The endpoint provides a way for the main website to
 * interact with Discord's authentication system and manage user accounts securely.
 *
 * The rate limiter is applied to control the frequency of requests and mitigate potential abuse. The `userEndpoint`
 * controller manages the underlying logic for user-related actions, including token generation and profile creation.
 *
 * Authentication and token-based authorization are crucial components of this endpoint, ensuring that only authorized
 * users can access and manipulate user-related data and functionalities.
 */

// Random Quote Endpoint
router.get('/quote', Limiter, authHandler, randomQuotes)
/**
 * Retrieves a random quote or saying from a collection of quotes. Requires authentication and is rate-limited to avoid misuse.
 */

// Random Gifs Endpoints
router.get('/kick', Limiter, authHandler, randomKick)
router.get('/kill', Limiter, authHandler, randomKill)
router.get('/kiss', Limiter, authHandler, randomKissu)
router.get('/midfing', Limiter, authHandler, randomMidfing)
router.get('/nuzzle', Limiter, authHandler, randomNuzzle)
router.get('/punch', Limiter, authHandler, randomPunch)
router.get('/shoot', Limiter, authHandler, randomShoot)
router.get('/sip', Limiter, authHandler, randomSip)
router.get('/sleepy', Limiter, authHandler, randomSleepy)
router.get('/smile', Limiter, authHandler, randomSmile)
router.get('/stab', Limiter, authHandler, randomStab)
router.get('/stare', Limiter, authHandler, randomStare)
router.get('/suicide', Limiter, authHandler, randomSuicide)
router.get('/tease', Limiter, authHandler, randomTease)
router.get('/wag', Limiter, authHandler, randomWag)
router.get('/bite', Limiter, authHandler, randomBite)
router.get('/blush', Limiter, authHandler, randomBlush)
router.get('/bonk', Limiter, authHandler, randomBonk)
router.get('/bored', Limiter, authHandler, randomBored)
router.get('/bully', Limiter, authHandler, randomBully)
router.get('/bye', Limiter, authHandler, randomBye)
router.get('/chase', Limiter, authHandler, randomChase)
router.get('/cheer', Limiter, authHandler, randomCheer)
router.get('/dab', Limiter, authHandler, randomDab)
router.get('/die', Limiter, authHandler, randomDie)
router.get('/disgust', Limiter, authHandler, randomDisgust)
router.get('/feed', Limiter, authHandler, randomFeed)
router.get('/hi', Limiter, authHandler, randomHi)
router.get('/hold', Limiter, authHandler, randomHold)
router.get('/hug', Limiter, authHandler, randomHug)
router.get('/Nope', Limiter, authHandler, randomNope)
router.get('/panic', Limiter, authHandler, randomPanic)
router.get('/pat', Limiter, authHandler, randomPat)
router.get('/peck', Limiter, authHandler, randomPeck)
router.get('/poke', Limiter, authHandler, randomPoke)
router.get('/punch', Limiter, authHandler, randomPunch)
router.get('/pout', Limiter, authHandler, randomPout)
router.get('/run', Limiter, authHandler, randomRun)
router.get('/sad', Limiter, authHandler, randomSad)
router.get('/shrug', Limiter, authHandler, randomShrug)
router.get('/slap', Limiter, authHandler, randomSlap)
router.get('/smug', Limiter, authHandler, randomSmug)
router.get('/think', Limiter, authHandler, randomThink)
router.get('/thumbsup', Limiter, authHandler, randomThumbsup)
router.get('/tickle', Limiter, authHandler, randomTickle)
router.get('/triggered', Limiter, authHandler, randomTriggered)
router.get('/wave', Limiter, authHandler, randomWave)
router.get('/wink', Limiter, authHandler, randomWink)
router.get('/yes', Limiter, authHandler, randomYes)
router.get('/angry', Limiter, authHandler, randomAngry)
router.get('/cringe', Limiter, authHandler, randomCringe)
router.get('/cry', Limiter, authHandler, randomCry)
router.get('/cuddle', Limiter, authHandler, randomCuddle)
router.get('/dance', Limiter, authHandler, randomDance)
router.get('/facepalm', Limiter, authHandler, randomFacepalm)
router.get('/glomp', Limiter, authHandler, randomGlomp)
router.get('/happy', Limiter, authHandler, randomHappy)
router.get('/highfive', Limiter, authHandler, randomHighfive)
router.get('/hug', Limiter, authHandler, randomHug)
router.get('/laugh', Limiter, authHandler, randomLaugh)
router.get('/lick', Limiter, authHandler, randomLick)
router.get('/love', Limiter, authHandler, randomLove)
router.get('/lurk', Limiter, authHandler, randomLurk)
router.get('/nervous', Limiter, authHandler, randomNervous)
router.get('/nom', Limiter, authHandler, randomNom)
router.get('/baka', Limiter, authHandler, randomBaka)

// Note: The comments for the remaining endpoints (utils and GIFs) follow a similar structure of explaining the purpose,
// authentication requirement, and rate-limiting aspect of each endpoint.

module.exports = router
