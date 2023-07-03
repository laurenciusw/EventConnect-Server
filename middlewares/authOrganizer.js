const { verifyToken } = require('../helpers/jwt');
const {Organizer} = require('../models')

async function authenticationOrganizer(req, res, next) {
  let {access_token} = req.headers;

  try {
    if (!access_token) {
      throw { name: "invalidToken" };
    }

    let payload = verifyToken(access_token);

    let organizer = await Organizer.findByPk(payload.id);
    if (!organizer) {
      throw { name: "invalidToken" };
    }

    req.user = {
      OrganizerId: organizer.id,
      email: organizer.email,
      name: organizer.organizerName,
    };

    next();

  } catch (error) {
    next(error);
  }
}

module.exports = authenticationOrganizer