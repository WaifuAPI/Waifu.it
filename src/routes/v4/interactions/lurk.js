import { Router } from 'express';
import getRandomLurk from '../../../controllers/v4/interactions/lurk.js';
import createRateLimiter from '../../../middlewares/rateLimit.js';
import authorize from '../../../middlewares/authorize.js';
import incrementData from '../../../middlewares/database/add.js';
import updateData from '../../../middlewares/database/update.js';
import deleteData from '../../../middlewares/database/delete.js';

const router = Router();

router
  .route('/')
  /**
   * @api {get} v4/lurk Get a Random Lurk
   * @apiDescription Retrieve a random lurk.
   * @apiName GetRandomLurk
   * @apiGroup Lurk
   * @apiPermission user
   *
   * @apiHeader {String} Authorization User's access token.
   *
   * @apiSuccess {Object[]} users List of users.
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data.
   * @apiError (Forbidden 403) Forbidden Only users can access the data.
   * @apiError (Too Many Requests 429) TooManyRequests The client has exceeded the allowed number of requests within the time window.
   * @apiError (Internal Server Error 500) InternalServerError An error occurred while processing the rate limit.
   *
   * @function createRateLimit
   * @description Creates a rate limiter middleware to control the frequency of requests.
   * @returns {function} Express middleware function that handles rate limiting.
   *
   */
  .get(authorize(config.roles.USER), createRateLimiter(), getRandomLurk)
  /**
   * @api {post} v4/lurk Increment Lurk Data
   * @apiDescription Increment data related to lurks (only accessible by database moderators).
   * @apiName IncrementLurkData
   * @apiGroup Lurk
   * @apiPermission database_moderator
   *
   * @apiHeader {String} Authorization Database Moderator's access token.
   *
   * @apiSuccess {Object} result Result of the data incrementation.
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated database moderator can access the data.
   * @apiError (Forbidden 403) Forbidden Only users can access the data.
   * @apiError (Too Many Requests 429) TooManyRequests The client has exceeded the allowed number of requests within the time window.
   * @apiError (Internal Server Error 500) InternalServerError An error occurred while processing the rate limit.
   *
   * @function createRateLimit
   * @description Creates a rate limiter middleware to control the frequency of requests.
   * @returns {function} Express middleware function that handles rate limiting.
   *
   */
  .post(authorize(config.roles.DB_MOD), createRateLimiter(), incrementData('Lurk'));

router
  .route('/:id')
  /**
   * @api {patch} v4/lurk/:id Update Lurk Data
   * @apiDescription Update data related to lurks with a specific ID (only accessible by database moderators).
   * @apiName UpdateLurkData
   * @apiGroup Lurk
   * @apiPermission database_moderator
   *
   * @apiHeader {String} Authorization database moderator access token.
   *
   * @apiSuccess {Object} result Result of the data update.
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated database moderator can access the data.
   * @apiError (Forbidden 403) Forbidden Only users can access the data.
   * @apiError (Too Many Requests 429) TooManyRequests The client has exceeded the allowed number of requests within the time window.
   * @apiError (Internal Server Error 500) InternalServerError An error occurred while processing the rate limit.
   *
   * @function createRateLimit
   * @description Creates a rate limiter middleware to control the frequency of requests.
   * @returns {function} Express middleware function that handles rate limiting.
   */
  .patch(authorize(config.roles.DB_MOD), createRateLimiter(), updateData('Lurk'))
  /**
   * @api {delete} v4/lurk/:id Delete Lurk Data
   * @apiDescription Delete data related to lurk with a specific ID (only accessible by admins).
   * @apiName DeleteLurkData
   * @apiGroup Lurk
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization Admin's access token.
   *
   * @apiSuccess {Object} result Result of the data deletion.
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated admins can access the data.
   * @apiError (Forbidden 403) Forbidden Only users can access the data.
   * @apiError (Too Many Requests 429) TooManyRequests The client has exceeded the allowed number of requests within the time window.
   * @apiError (Internal Server Error 500) InternalServerError An error occurred while processing the rate limit.
   *
   * @function createRateLimit
   * @description Creates a rate limiter middleware to control the frequency of requests.
   * @returns {function} Express middleware function that handles rate limiting.
   */
  .delete(authorize(config.roles.ADMIN), createRateLimiter(), deleteData('Lurk'));
// Export the router
export default router;
