'use strict';

/**
 * mainstate service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::mainstate.mainstate');
