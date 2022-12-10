'use strict';

/**
 * today service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::today.today');
