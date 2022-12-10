'use strict';

/**
 * cmd router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::cmd.cmd');
