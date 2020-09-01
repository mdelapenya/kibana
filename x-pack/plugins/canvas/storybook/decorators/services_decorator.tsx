/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React from 'react';

import { ServicesProvider } from '../../public/services';

export const servicesContextDecorator = (story: Function) => (
  <ServicesProvider>{story()}</ServicesProvider>
);
