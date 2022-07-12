/* eslint-disable @typescript-eslint/no-unused-vars */
import _ from 'lodash';
import { validationResult } from 'express-validator';

import db from '../../models';
let model = 'Users';
class ApplicationController {
  errors: any;
  constructor(m) {
    model = m;
  }

  _create(req, res, options = {}, callback = null) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    req.body = _.pick(_.cloneDeep(req.body), req.pick || []);
    return db[model].create(req.body)
      .then(appuser => res.status(201).send({ success: true, data: appuser, message: options['message'] || 'Successfully Created' }))
      .catch(error => res.boom.badRequest(error));
  }

  _list(req, res, options = {}, callback = null) {
    return db[model].findAll({ include: [{ all: true }] }).then(data =>
      res.status(200).send({ success: true, data: data }))
      .catch(error => res.boom.badRequest(error));
  }

  _findOne(req, res, callback = null) {
    db[model].findOne(req.condition || {}).then(data => {
      if (typeof (callback) === 'function')
        callback(data);
      else
        res.status(200).send(data);
    }
    ).catch(error => res.status(400).json({ errors: error }));
  }

  private isCallback(cb) {
    return typeof (cb) === 'function';
  }
  private model() {
    return db[model];
  }
}

export default ApplicationController;
