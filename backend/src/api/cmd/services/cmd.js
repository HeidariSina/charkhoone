'use strict';

/**
 * cmd service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::cmd.cmd');
